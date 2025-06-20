import { createContext, ReactNode, useContext, useState } from 'react'

const GlobalContext = createContext<any>({})
export const useGlobalContext = () => useContext(GlobalContext)

interface GlobalProviderProps {
  children: ReactNode
}

const weekDays = [
  { name: 'Aveces', relation: 'Es una vaquita en el parque', stories: [{ title: 'History 1' }, { title: 'History 2' }, { title: 'History 3' }] },
  { name: 'Burro', relation: 'Es un perro en la playa', stories: [{ title: 'History 1' }, { title: 'History 2' }, { title: 'History 3' }] },
  { name: 'Cat', relation: 'Es un gato en la montaña', stories: [{ title: 'History 1' }, { title: 'History 2' }, { title: 'History 3' }] },
  { name: 'Diego', relation: 'Es un pez en el río', stories: [{ title: 'History 1' }, { title: 'History 2' }, { title: 'History 3' }] },
  { name: 'Daniela', relation: 'Es un pez en el río', stories: [{ title: 'History 1' }, { title: 'History 2' }, { title: 'History 3' }] },
  { name: 'Erick', relation: 'Es un pájaro en el cielo', stories: [{ title: 'History 1' }, { title: 'History 2' }, { title: 'History 3' }] },
  { name: 'Farid', relation: 'Es un conejo en el bosque', stories: [{ title: 'History 1' }, { title: 'History 2' }, { title: 'History 3' }] },
  { name: 'Joshue', relation: 'Es un elefante en la selva', stories: [{ title: 'History 1' }, { title: 'History 2' }, { title: 'History 3' }] },
]

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [words, setWords] = useState(weekDays)

  const deleteWord = (name: string) => {
    setWords((prev) => prev.filter((d) => d.name !== name));

  }

  return (
    <GlobalContext.Provider value={{
      setWords,
      deleteWord,
      words
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider