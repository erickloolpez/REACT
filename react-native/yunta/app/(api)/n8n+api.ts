export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Lógica adicional (validación, transformación, etc.)
    // const transformedData = {
    //   ...data,
    //   // ...transformaciones
    // };

    const n8nResponse = await fetch('https://n8n.srv831273.hstgr.cloud/webhook-test/21862cfa-8f34-46b5-ad67-2a20b7b86c96', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!n8nResponse.ok) {
      throw new Error(`Error al llamar al webhook de n8n: ${n8nResponse.status}`);
    }

    const n8nResult = await n8nResponse.json();

    return new Response(JSON.stringify({ data: n8nResult }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al llamar al webhook:', error);
    return Response.json({ error: 'Error al llamar al webhook' }, { status: 500 });
  }
}