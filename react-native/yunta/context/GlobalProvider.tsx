import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

const GlobalContext = createContext<any>({})
export const useGlobalContext = () => useContext(GlobalContext)

interface GlobalProviderProps {
  children: ReactNode
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [user, setUser] = useState(null)
  const [lastId, setLastId] = useState('');
  const [yourWords, setYourWords] = useState([])
  const [yourDictionary, setYourDictionary] = useState(0);
  const [yourStories, setYourStories] = useState([]);
  const [stories, setStories] = useState([])

  useEffect(() => {
    const callDB = async () => {
      const [wordsResponse, storiesResponse, userResponse] = await Promise.all([
        axios.get('http://192.168.100.10:3003/associations').catch(err => {
          console.error('Error fetching words in Global Provider:', err);
          return { data: [] }; // fallback o manejo alternativo
        }),
        axios.get(`http://192.168.100.10:3003/story-details/user/1`).catch(err => {
          console.error('Error fetching story in Global Provider:', err);
          return { data: [] };
        }),
        axios.get(`http://192.168.100.10:3003/users/1`).catch(err => {
          console.error('Error fetching User in Global Provider:', err);
          return { data: [] };
        }),
      ]);

      const wordsArray = wordsResponse.data.map(item => item.word);
      const justStory = storiesResponse.data.map(item => item.title)
      const justName = userResponse.data.username;
      setYourWords(wordsResponse.data);
      setStories(storiesResponse.data);
      setUser(userResponse.data);
      console.log('Words fetched Global Provider:', wordsArray);
      console.log('Story fetched Global Provider:', justStory);
      console.log('User fetched Global Provider:', justName);

    }

    callDB();
  }, []);


  const deleteWord = (name: string) => {
    setYourWords((prev) => prev.filter((d) => d.name !== name));

  }

  const addWord = (newWord: { name: string; relation: string; stories: { title: string }[] }) => {
    setYourWords((prev) => [...prev, newWord]);
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
      router.push('/(n8n)/8');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <GlobalContext.Provider value={{
      yourWords,
      setYourWords,
      addWord,
      deleteWord,
      pickAndUpload,
      lastId,
      setLastId,
      yourDictionary,
      setYourDictionary,
      yourStories,
      setYourStories,
      stories,
      setStories,
      user,
      setUser
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider