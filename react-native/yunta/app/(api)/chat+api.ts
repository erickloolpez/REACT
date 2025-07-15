import { searchRAG } from '@/utils/rag'; // Tu función de búsqueda RAG
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';

export const searchRAGTool = tool({
  name: 'CRM presentation',
  description: 'Busca información relevante en la base de datos de conocimiento.',
  parameters: z.object({
    query: z.string().describe('La consulta del usuario para buscar en RAG'),
  }),
  execute: async ({ query }) => {
    // Aquí llamas a tu función searchRAG
    const result = await searchRAG(query);
    return { context: result };
  },
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages: [
      {
        role: 'system',
        content: 'Responde de forma breve y concisa, máximo 4 oraciones.',
      },
      ...messages,
    ],
    tools: [searchRAGTool],
    toolChoice: 'auto',
    maxSteps: 5,
  });

  return result.toDataStreamResponse({
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Encoding': 'none',
    },
  });
}