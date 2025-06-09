import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
// Importa tu RAG (ejemplo conceptual)
import { searchRAG } from '@/utils/rag'; // Tu función de búsqueda RAG

export async function POST(req: Request) {
  const { messages } = await req.json();
  let systemMessage = ''

  // Obtener el último mensaje del usuario
  const lastUserMessage = messages[messages.length - 1];

  if (lastUserMessage?.role === 'user') {
    // Buscar información relevante en tu RAG
    const ragContext = await searchRAG(lastUserMessage.content);

    console.log('Contexto RAG encontrado:', ragContext);

    // Enriquecer el mensaje con el contexto del RAG
    systemMessage = `
Contexto del RAG:
${ragContext}

Pregunta del usuario:
${lastUserMessage.content}

Por favor, responde basándote en el contexto del RAG solo en ese contexto, caso contrario di que no hay informacion.`;

  }

  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages,
    system: systemMessage,
  });

  return result.toDataStreamResponse({
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Encoding': 'none',
    },
  });
}