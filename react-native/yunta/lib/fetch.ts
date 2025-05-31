import { ChatResponse, Message } from "@/types/chat";
import { useCallback, useEffect, useState } from "react";

export const fetchAPI = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const chatAPI = {
  // Función principal para enviar mensajes al API
  // Acepta un array de mensajes y una función opcional para manejar chunks de respuesta
  sendMessage: async (messages: Message[], onChunk: (chunk: ChatResponse) => void): Promise<ChatResponse> => {
    // Si hay función de callback, configura streaming de datos
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api'}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    // Configuración para lectura de stream de datos
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let accumulatedMessage = ''; // Almacena el mensaje completo

    if (!reader) throw new Error('Failed to get response reader');

    // Bucle principal para procesar el stream de datos
    while (true) {
      // Lee chunks de datos del stream
      const { done, value } = await reader.read();
      if (done) break;

      // Decodifica y procesa cada chunk
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      // Procesa cada línea del chunk
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonStr = line.slice(6);
          try {
            const data = JSON.parse(jsonStr);
            console.log('Parsed SSE data:', data);

            // Maneja diferentes estados de la respuesta
            if (data.status === 'streaming' && data.content) {
              // Acumula el contenido del mensaje y notifica
              accumulatedMessage += data.content;
              onChunk({ content: accumulatedMessage, status: 'streaming' });
            } else if (data.status === 'generating_image') {
              // Notifica cuando comienza la generación de imagen
              onChunk({ content: 'Generando imagen...', status: 'generating_image' });
            } else if (data.status === 'done') {
              // Finaliza el streaming y retorna el mensaje completo
              onChunk({ content: accumulatedMessage, status: 'done' });
              return { content: accumulatedMessage, status: 'done' };
            }
          } catch (e) {
            console.error('Failed to parse SSE chunk:', e);
          }
        }
      }
    }

    // Retorna el mensaje acumulado si el stream termina
    return { content: accumulatedMessage, status: 'done' };
  },
};


export const useFetch = <T>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchAPI(url, options);
      setData(result.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};