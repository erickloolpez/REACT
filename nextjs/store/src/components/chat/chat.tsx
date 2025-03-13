'use client';

import { useChat } from 'ai/react';
import styles from './Chat.module.sass'

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
    <main className={styles.Chat}>
      <h1 className={styles.Chat__title}>Ask anything, but everything</h1>
      <form onSubmit={handleSubmit} className={styles.Chat__form}>
        <input
          className={styles.Chat__input}
          value={input}
          placeholder="Send a message..."
          onChange={handleInputChange}
          disabled={status !== 'ready'}
        />
        <button type="submit" className={styles.Chat__button}>
          Send
        </button>
      </form>
      <section className={styles.Chat__messages}>
        {
          messages
            .filter(m => m.role !== 'system')
            .map(m => (
              <span key={m.id} className={styles.Chat__message}>
                <div className={styles.Chat__message__icon}>
                  {m.role === "assistant" ? "🤖" : "😊"}
                </div>
                <div>
                  {m.content}
                </div>
              </span>
            ))
        }
      </section>


    </main>
  );
}