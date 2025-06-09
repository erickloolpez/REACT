// utils/rag.ts
import { Pinecone } from '@pinecone-database/pinecone';

// Inicializa Pinecone (asegúrate de tener tus variables de entorno configuradas)
const pinecone = new Pinecone({
  apiKey: 'API_KEY_PINECONE',
});

const index = pinecone.Index('ragplatzi');

export async function searchRAG(query: string): Promise<string> {
  try {
    // Busca en Pinecone
    const results = await index.query({
      vector: await generateEmbedding(query), // Necesitas una función para generar embeddings
      topK: 10, // Número de resultados a devolver
      includeMetadata: true, // Incluir metadatos para obtener el contenido original
    });

    const context = results.matches[0];
    const text = context?.metadata?.text;

    if (!text) {
      return 'No se encontró información relevante.';
    }

    // Convierte cualquier tipo a string
    if (Array.isArray(text)) {
      return text.join('\n');
    }
    return String(text);
  } catch (error) {
    console.error('Error searching Pinecone:', error);
    return 'No se pudo obtener información del contexto.';
  }
}

// Función para generar embeddings (ejemplo con OpenAI)
async function generateEmbedding(text: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer API_KEY`,
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text,
    }),
  });

  const data = await response.json();
  return data.data[0].embedding;
}