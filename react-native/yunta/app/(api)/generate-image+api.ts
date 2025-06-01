import { openai } from '@ai-sdk/openai';
import { experimental_generateImage } from 'ai';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = experimental_generateImage({
    model: openai.image('dall-e-3'),
    prompt,
    n: 1,
    size: '1024x1024',
  });

  return new Response(`data:image/png;base64,${(await result).image.base64}`, {
    headers: {
      'Content-Type': 'image/png',
    },
  }
  );
}