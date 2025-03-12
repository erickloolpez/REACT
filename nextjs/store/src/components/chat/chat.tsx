'use client';

import { useChat } from 'ai/react';

export const Chat = (props: { agent: string }) => {
  const { messages, input, handleSubmit, handleInputChange, status } =
    useChat({
      initialMessages: [
        {
          id: '1',
          role: 'system',
          content: props.agent
        }
      ]
    });

  return (
    <div>

      {
        messages
          .filter(m => m.role !== 'system')
          .map(message => (
            <div key={message.id}>
              <div>{message.role}</div>
              <div>{message.content}</div>
            </div>
          ))
      }

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="Send a message..."
          onChange={handleInputChange}
          disabled={status !== 'ready'}
        />
      </form>
    </div>
  );
}