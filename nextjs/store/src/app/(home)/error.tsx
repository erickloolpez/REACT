"use client"

interface ErrorProps {
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <div>
      <h1>404 Not found :( </h1>
      <p>Ha ocurrido un error</p>
      <button onClick={reset}>Intentalo de nuevo</button>
    </div>
  )
}