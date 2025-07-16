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

interface N8nData {
  upload: any | null;
  summary: any | null;
  history: any | null;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [user, setUser] = useState(null)
  const [lastId, setLastId] = useState('');
  const [yourWords, setYourWords] = useState([])
  const [yourDictionary, setYourDictionary] = useState(0);
  const [yourStories, setYourStories] = useState([]);
  const [stories, setStories] = useState([])
  const [cachedStories, setCachedStories] = useState([])
  const [questions, setQuestions] = useState([]);
  const [wordToDelete, setWordToDelete] = useState<{ association_id?: number, word?: string } | null>(null);
  const [n8nData, setN8nData] = useState<N8nData>({
    upload: null,
    summary: null,
    history: null,
  });

  useEffect(() => {
    const callDB = async () => {
      const [wordsResponse, storiesResponse] = await Promise.all([
        axios.get('http://192.168.100.10:3003/associations').catch(err => {
          console.error('Error fetching words in Global Provider:', err);
          return { data: [] }; // fallback o manejo alternativo
        }),
        // axios.get(`http://192.168.100.10:3003/story-details/user/1`).catch(err => {
        //   console.error('Error fetching story in Global Provider:', err);
        //   return { data: [] };
        // }),
        axios.get(`http://192.168.100.10:3003/users/1`).catch(err => {
          console.error('Error fetching User in Global Provider:', err);
          return { data: [] };
        }),
      ]);

      const wordsArray = wordsResponse.data.map(item => item.word);
      const justStory = storiesResponse.data.map(item => item.title)
      // const justName = userResponse.data.username;
      setYourWords(wordsResponse.data);
      setStories(storiesResponse.data);
      // setUser(userResponse.data);
      console.log('Words 🔠 fetched Global Provider:', wordsArray);
      console.log('Story 📖 fetched Global Provider:', justStory);
      // console.log('User 👤 fetched Global Provider:', justName);

    }

    callDB();
  }, []);

  const updateStories = async () => {
    try {
      const [wordsResponse, storiesResponse] = await Promise.all([
        axios.get('http://192.168.100.10:3003/associations').catch(err => {
          console.error('Error fetching words in Global Provider:', err);
          return { data: [] }; // fallback o manejo alternativo
        }),
        axios.get(`http://192.168.100.10:3003/story-details/user/1`).catch(err => {
          console.error('Error fetching story in Global Provider:', err);
          return { data: [] };
        }),
      ]);

      setYourWords(wordsResponse.data);
      setStories(storiesResponse.data);
    } catch (error) {
      console.error('Error updating stories in Global Provider:', error);
    }
  }

  const deleteStory = async (storyId: number) => {
    console.log('Eliminando historia con ID:', storyId);
    try {
      const response = await axios.delete(`http://192.168.100.10:3003/story-details/${storyId}`)
      console.log('Historia eliminada con éxito:', response.data);
      setStories((prev) => prev.filter((story) => story.story_details_id !== storyId));
      return { story_details_id: response.data.story_details_id }; // Devuelve el ID de la historia eliminada
    } catch (err) {
      console.error('❌ Error eliminando historia:', err);
      return null;
    }
  }

  const sendStoryId = async (storyId: number) => {
    console.log('Enviando ID de historia:', storyId);
    try {
      const response = await axios.post('https://n8n.srv831273.hstgr.cloud/webhook/95b5ffea-58a3-426f-b0d9-56bffb035c8b', {
        story_details_id: storyId,
      });

      console.log('✅ Preguntas listas:', response.data);
      return response.data; // Devuelve las preguntas generadas
    } catch (err) {
      console.error('❌ Error al crear preguntas', err);
    }
  }

  const updateWords = async () => {
    try {
      const response = await axios.get('http://192.168.100.10:3003/associations/');
      const wordsArray = response.data.map(item => item.word);
      setYourWords(response.data);
      console.log('Words updated Global Provider:', wordsArray);
    } catch (error) {
      console.error('Error updating words in Global Provider:', error);
    }
  }

  const deleteWord = async () => {
    console.log('Eliminando palabra:', wordToDelete);
    try {
      await axios.delete(
        `http://192.168.100.10:3003/associations/${wordToDelete?.association_id}`
      );

      // 1. Quitarla del contexto global
      setYourWords((prev) =>
        prev.filter((w) => w.association_id !== wordToDelete?.association_id)
      );

      console.log(`🗑️  Palabra "${wordToDelete?.word}" eliminada con éxito`);
      return { association_id: wordToDelete?.association_id, word: wordToDelete?.word };           // 2. Devuélvala para la UI
    } catch (err) {
      console.error('❌ Error eliminando palabra:', err);
      Alert.alert('Error', 'No se pudo eliminar la palabra');
      return null;
    }
  };

  const addWord = async (newWord: { word: string; relation: string }) => {
    console.log('Agregando nueva palabra:', newWord);
    try {
      const response = await axios.post('http://192.168.100.10:3003/associations', {
        user_id: user?.user_id,
        word: newWord.word,
        relation: newWord.relation
      });

      // Suponiendo que el backend devuelve el nuevo objeto completo
      setYourWords((prev) => [...prev, response.data]);
      console.log('✅ Palabra agregada con éxito:', response.data);
      return response.data
    } catch (err) {
      console.error('❌ Error al agregar palabra:', err);
      Alert.alert('Error', 'No se pudo agregar la palabra');
    }
  };

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

      router.push('/(n8n)/history');

      const response = await axios.post('http://192.168.100.10:3003/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Respuesta upload ⬆️', response.data);
      setN8nData((prev: any) => ({
        ...prev,
        upload: response.data,
      }));

      const responseSummary = await axios.post('https://n8n.srv831273.hstgr.cloud/webhook/e6f62379-14f5-4de0-a7e6-79f97c5bc954', {
        metadata_id: response.data.data[0].metadata.file_id,
        pageContent: response.data.data[0].data
      })

      console.log('Respuesta summary 📝', responseSummary.data);
      setN8nData((prev: any) => ({
        ...prev,
        summary: responseSummary.data.answer,
      }));


      // Actualización CORRECTA - conserva otros datos y solo actualiza upload
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
      setUser,
      updateWords,
      cachedStories,
      setCachedStories,
      wordToDelete,
      setWordToDelete,
      n8nData,
      setN8nData,
      updateStories,
      deleteStory,
      sendStoryId
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider