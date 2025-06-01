from flask import request, Response
import openai
import json
from openai import OpenAI

def generateImage(prompt: str, quality: str = "standard") -> str:
    """
    Genera una imagen utilizando el modelo DALL-E 3 de OpenAI.
    """
    try:
        response = openai.images.generate(
            model="dall-e-3",
            prompt=prompt,
            quality=quality,
            n=1,
        )
        
        print("Imagen generada correctamente")
        return response.data[0].url
        
    except Exception as e:
        print(f"Generación de imagen fallida: {str(e)}")
        raise

def chat():
    try:
        data = request.get_json()

        if not data:
            return Response(
                json.dumps({'error': 'No JSON data provided', 'status': 'error'}),
                status=400,
                mimetype='application/json'
            )

        if 'messages' not in data:
            return Response(
                json.dumps({'error': 'Missing messages field', 'status': 'error'}),
                status=400,
                mimetype='application/json'
            )

        if not isinstance(data['messages'], list):
            return Response(
                json.dumps({'error': 'Messages must be a list', 'status': 'error'}),
                status=400,
                mimetype='application/json'
            )

        formatted_messages = [
            {
                "role": "system",
                "content": "Eres un asistente llamado PlatziVision. Responde a las preguntas de los usuarios sobre Platzi con claridad. Puedes generar imágenes en DALL-E 3. También puedes analizar imágenes que el usuario te envía."
            }
        ]

        for message in data['messages']:
            if 'image_data' in message:
                # Procesamiento de la imagen
                content_parts = [{"type": "text", "text": message['content']}]

                for image_data_base64 in message['image_data']:
                    content_parts.append({
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/png;base64,{image_data_base64}"
                        }
                    })

                formatted_messages.append({
                    "role": message["role"],
                    "content": content_parts,
                })
            else:
                formatted_messages.append({
                    "role": message["role"],
                    "content": message["content"],
                })
        
        client = OpenAI()

        tools = [
            {
                "type": "function",
                "function": {
                    "name": "generateImage",
                    "description": "Cuando el usuario lo solicite, genera una imagen",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "prompt": {
                                "type": "string",
                                "description": "El prompt que generará la imagen"
                            },
                            "quality": {
                                "type": "string",
                                "description": "Calidad de la imagen. Puede ser 'hd' o 'standard'"
                            }
                        }
                    }
                }
            }
        ]

        def generate():
            accumulated_args = ""
            response = None
            current_tool_call_id = None

            while True:
                if response is None:
                    response = client.chat.completions.create(
                        model="gpt-4o-mini",
                        messages=formatted_messages,
                        stream=True,
                        tools=tools
                    )

                for chunk in response:
                    if chunk.choices[0].delta.content:
                        yield f"data: {json.dumps({'content': chunk.choices[0].delta.content, 'status': 'streaming'})}\n\n"

                    if chunk.choices[0].finish_reason == "stop":
                        yield f"data: {json.dumps({'status': 'done'})}\n\n"
                        break

                    if chunk.choices[0].delta.tool_calls:
                        tool_call = chunk.choices[0].delta.tool_calls[0]

                        if tool_call.id and tool_call.function.name:
                            current_tool_call_id = tool_call.id
                        
                        if hasattr(tool_call.function, 'arguments') and tool_call.function.arguments:
                            accumulated_args += tool_call.function.arguments
                            print(f"Argumentos generados: {tool_call.function.arguments}")

                        if accumulated_args.strip().endswith('}'):
                            try:
                                print("Iniciando la llamada a la función")
                                function_args = json.loads(accumulated_args)

                                if 'prompt' in function_args:
                                    yield f"data: {json.dumps({'status': 'generating_image'})}\n\n"

                                    image_url = generateImage(
                                        prompt=function_args["prompt"],
                                        quality=function_args.get("quality", "standard")
                                    )

                                    formatted_messages.append({
                                        "role": "assistant",
                                        "content": None,
                                        "tool_calls": [{
                                            "id": current_tool_call_id,
                                            "function": {
                                                "name": "generateImage",
                                                "arguments": accumulated_args
                                            },
                                            "type": "function"
                                        }]
                                    })

                                    formatted_messages.append({
                                        "role": "tool",
                                        "tool_call_id": current_tool_call_id,
                                        "content": image_url
                                    })

                                    response = None
                                    accumulated_args = ""
                                    break
                            except json.JSONDecodeError:
                                pass
                            except Exception as e:
                                print(f"Error en tool call: {e}")
                                pass

        return Response(generate(), mimetype="text/event-stream")

    except Exception as e:
        print(f"Chat request failed: {str(e)}")
        import traceback
        traceback.print_exc()

        return Response(
            json.dumps({
                'error': str(e),
                'status': 'error'
            }),
            status=500,
            mimetype='application/json'
        )