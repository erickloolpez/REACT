import { google } from 'googleapis';
import { Readable } from 'stream';

export async function POST(request: Request) {
  try {
    const { filename, mimeType, fileBase64 } = await request.json();
    console.log('filename', filename);

    // Autenticación con Google
    const auth = new google.auth.GoogleAuth({
      keyFile: './secret.json',
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });
    const drive = google.drive({ version: 'v3', auth });

    // Crear un buffer con el archivo
    const buffer = Buffer.from(fileBase64, 'base64');

    // Convertir el buffer a un stream usando Readable.from()
    const stream = Readable.from(buffer);

    // Subir a Google Drive
    const res = await drive.files.create({
      requestBody: {
        name: filename,
        mimeType: mimeType,
        parents: ['1pJTW7xxN0AzVoJaut0r2Ab6eivFveEZp']
      },
      media: {
        mimeType: mimeType,
        body: stream,
      },
      fields: 'id',
    });

    console.log('Archivo subido a Drive con ID:', res.data.parents);

    return new Response(JSON.stringify({ fileId: res.data.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al subir a Drive:', error);
    return Response.json({ error: 'Error al subir a Drive' }, { status: 500 });
  }
}