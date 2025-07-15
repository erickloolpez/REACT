import { createClient } from '@supabase/supabase-js';

// Reemplaza con tus claves reales de Supabase
const supabaseUrl = 'https://rdvzzstzncjtebbuutls.supabase.co';
const supabaseKey = process.env.SUPABASE_API_KEY || 'your-supabase-api-key-here';
const supabase = createClient(supabaseUrl, supabaseKey);

// Generar embedding con OpenAI
async function generateEmbedding(text: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text,
    }),
  });

  const data = await response.json();
  return data.data[0].embedding;
}

// Buscar contexto en Supabase usando la extensión pgvector
export async function searchRAG(query: string): Promise<string> {
  try {
    const embedding = await generateEmbedding(query);

    const { data, error } = await supabase.rpc('match_documents', {
      query_embedding: embedding,
      match_count: 10,
      filter: {}, // puede agregar filtros por metadata si quiere
    });

    if (error) {
      console.error('Error en RPC match_documents:', error);
      return 'Error consultando Supabase.';
    }

    if (!data || data.length === 0) {
      return 'No se encontró información relevante.';
    }

    const texts = data.map((match: any) => match.content || match.text).filter(Boolean);
    return texts.length > 0 ? texts.join('\n---\n') : 'No se encontró información relevante.';
  } catch (error) {
    console.error('Error buscando en Supabase:', error);
    return 'No se pudo obtener información del contexto.';
  }
}
