import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import { createContext, ReactNode, useContext, useState } from 'react';
import { Alert } from 'react-native';

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
  const [lastId, setLastId] = useState('');
  const [words, setWords] = useState(weekDays)

  const deleteWord = (name: string) => {
    setWords((prev) => prev.filter((d) => d.name !== name));

  }

  const addWord = (newWord: { name: string; relation: string; stories: { title: string }[] }) => {
    setWords((prev) => [...prev, newWord]);
  }

  const pickAndUpload = async () => {
    console.log('Iniciando DocumentPicker...');
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Puedes filtrar por tipo si quieres
        copyToCacheDirectory: false,
      });

      console.log('Resultado de DocumentPicker:', result);

      // Condicional corregido
      if (result.canceled && !result.assets) {
        return Alert.alert('Error', 'No se seleccionó ningún archivo');
      }
      const fileUri = result.assets[0].uri;
      const filename = result.assets[0].name;
      const mimeType = result.assets[0].mimeType;

      const formData = new FormData();
      formData.append('file', {
        uri: fileUri,
        name: filename,
        type: mimeType,
      });

      const response = await fetch('http://192.168.100.10:3003/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();
      console.log('Archivo subido:', data);
      setLastId(data.publicUrl.split('/').pop() || '');
      router.push('/n8n');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <GlobalContext.Provider value={{
      words,
      setWords,
      addWord,
      deleteWord,
      pickAndUpload,
      lastId,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider