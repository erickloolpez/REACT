import CarouselItem from '@/components/(home)/CarouselItem'
import BannerShape from '@/components/BannerShape'
import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import { carrusel, icons, images } from '@/constants'
import { useGlobalContext } from '@/context/GlobalProvider'
import axios from 'axios'
import { router } from 'expo-router'
import { Castle, LogOut, Origami, User, XIcon } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, Image, ImageBackground, Pressable, Text, TouchableOpacity, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import Animated, { clamp, runOnJS, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width } = Dimensions.get('screen')
const _itemSize = width * .24
const _spacing = 12
const _itemTotalSize = _itemSize + _spacing

const Home = () => {
  const { stories, user, pickAndUpload, setUser } = useGlobalContext()
  const [copyOfUser, setCopyOfUser] = useState(user || { username: '', email: '' })

  const scrollX = useSharedValue(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const dataWithAddButton = [...stories, { type: 'ADD_BUTTON' }]
  const [openModal, setOpenModal] = useState(false)
  const [customHeight, setCustomHeight] = useState(false)

  const onScroll = useAnimatedScrollHandler(e => {
    scrollX.value = clamp(e.contentOffset.x / _itemTotalSize, 0, dataWithAddButton.length - 1)
    const newActiveIndex = Math.round(scrollX.value)

    if (newActiveIndex !== activeIndex) {
      runOnJS(setActiveIndex)(newActiveIndex)
    }
  })

  const scale = useSharedValue(1)
  useEffect(() => {
    if (activeIndex === dataWithAddButton.length - 1) {
      scale.value = withRepeat(
        withTiming(1.2, { duration: 650 }),
        -1,
        true
      );
    } else {
      scale.value = withTiming(1, { duration: 200 });
    }
  }, [activeIndex]);

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });


  const hasChanges = () => {
    if (!copyOfUser || !user) return false;
    return copyOfUser.username !== user.username
  };

  const getChangedFields = (original, modified) => {
    const changes = {};
    for (const key in modified) {
      if (modified[key] !== original[key]) {
        changes[key] = modified[key];
      }
    }
    return changes;
  };

  const saveYourChanges = () => {
    const changes = getChangedFields(user, copyOfUser);
    if (Object.keys(changes).length === 0) {
      console.log('No hay cambios para guardar');
      return;
    }

    console.log('Cambios detectados: 🔃', changes);
    axios.put(`http://192.168.100.10:3003/users/${user.user_id}`, changes)
      .then(response => {
        console.log('Cambios guardados del Usuario ✅');
        Alert.alert('Éxito', 'Cambios guardados correctamente');
        setUser(response.data);
      })
      .catch(err => {
        console.error('Error guardando cambios:', err);
      });
  };


  useEffect(() => {
    console.log('Refetch en Home 🏠')
    if (user) {
      setCopyOfUser(user);
    }
  }, [user])

  return (
    <ImageBackground source={images.bgHome} className="flex-1">
      <SafeAreaView className="flex-1">
        <View style={{ flex: 1 }}>
          <View className="absolute w-14 h-14 bg-[#2e669f] rounded-full items-center justify-center top-16 right-4">
            <LogOut size={28} color="#fff" onPress={() => { }} />
          </View>

          <Pressable
            onPress={() => setOpenModal(true)}
            className=""
          >
            <BannerShape
              width={250}
              height={80}
              fillColor="#f0c000" // Un amarillo
              strokeColor="#1e609e" // Un azul
              strokeWidth={6}
              cornerRadius={10}
              vNotchDepth={30}
            />
            <View className="w-[220px] flex-row h-10 bg-red-600 rounded-r-lg justify-between items-center px-5">
              <View className="flex-1 items-center justify-center">
                <Text className="font-Waku text-xl text-white">{copyOfUser.username}</Text>
              </View>
              <View className="flex-row w-12">
                <Origami size={18} color="#fff" />
                <Text className="ml-2 text-white">4</Text>
              </View>
            </View>
          </Pressable>
          <View className="flex-1 items-center justify-center mt-12  ">
            {
              activeIndex > stories.length - 1 ? (
                <View className="w-3/4 h-40 items-center justify-center">
                  <Animated.View style={stylez}>
                    <TouchableOpacity
                      onPress={pickAndUpload}
                      // onPress={() => router.push('/(n8n)/history')}
                      className="mt-4 bg-white px-4 py-2 rounded-lg"
                    >
                      <Text className="text-center font-BlockHead">Crear historia</Text>
                    </TouchableOpacity>
                  </Animated.View>
                </View>
              ) :
                (
                  <View className="w-full h-[300px]">
                    <View className="flex-1 flex-row items-center justify-center ">
                      <View className="w-3/6 ml-2 items-center justify-around p-3 bg-[#ffd700] rounded-lg border border-[#003366] border-l-8">
                        <View className="h-10 bg-[#003366] self-end items-center p-2 rounded-l-md">
                          <Text className="text-white font-BlockHead">{dataWithAddButton[activeIndex]?.title}</Text>
                        </View>
                        <View className="w-16 h-16 rounded-full items-center justify-center overflow-hidden mt-2">
                          <Animated.Image key={`image-${activeIndex}`} source={carrusel[activeIndex]} className="w-full h-full object-contain" />
                        </View>
                        <View className="flex-row flex-wrap gap-x-2 gap-y-3 w-full mb-4 mt-2">
                          <View className="flex-row rounded-full bg-white p-2 items-center border border-black">
                            <User size={20} color="black" />
                            <Text className="ml-2">{dataWithAddButton[activeIndex]?.character}</Text>
                          </View>
                          <View className="flex-row rounded-full bg-white p-2 items-center border border-black">
                            <Castle size={20} color="black" />
                            <Text className="ml-2 wrap">
                              {dataWithAddButton[activeIndex]?.place.length > 19
                                ? dataWithAddButton[activeIndex]?.place.slice(0, 16) + '...'
                                : dataWithAddButton[activeIndex]?.place}
                            </Text>
                          </View>
                        </View>
                        <View className="mb-4">
                          <Text numberOfLines={2}>
                            {dataWithAddButton[activeIndex]?.story_text || 'No hay descripción disponible.'}
                          </Text>
                        </View>
                        <CustomButton
                          title="Revisar"
                          textVariant="default"
                          onPress={() => router.push(`/(n8n)/${activeIndex}`)}
                        />

                      </View>
                    </View>
                  </View>
                )
            }
          </View>
          <View className="flex-1 pt-10">
            <Animated.FlatList
              style={{
                height: 5,
                paddingBottom: _itemSize - 100,
              }}
              contentContainerStyle={{
                gap: _spacing,
                paddingHorizontal: (width - _itemSize) / 2,
              }}
              data={dataWithAddButton}
              keyExtractor={(_, index) => String(index)}
              renderItem={({ item, index }) => {
                if (item.type === 'ADD_BUTTON') {
                  return <CarouselItem imageUri={item.type} index={index} scrollX={scrollX} _itemSize={_itemSize} />
                }

                return <CarouselItem imageUri={carrusel[index]} index={index} scrollX={scrollX} _itemSize={_itemSize} />
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
              scrollEventThrottle={1000 / 60}
              snapToInterval={_itemTotalSize}
              decelerationRate={"fast"}
            />
          </View>
        </View>

        <ReactNativeModal
          isVisible={openModal}
          backdropTransitionOutTiming={1}
          onModalHide={() => {
            // if (verification.state === 'success') setShowSuccessModal(true)
          }
          }
          style={{ marginBottom: customHeight ? 240 : 0 }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <View className="w-full h-10  items-end justify-center">
              <Pressable
                onPress={() => {
                  setCustomHeight(false)
                  setOpenModal(false)
                }
                }
                className="w-8 h-8 bg-red-400 rounded-lg justify-center items-center ">
                <XIcon size={15} color="#fff" />
              </Pressable>
            </View>
            <View className="w-full h-auto">
              <View className={`bg-blue-400 rounded-full w-30 h-30 items-center justify-center overflow-hidden self-center border-2 border-black`}>
                <Image source={icons.catIcon} className="w-20 h-20" resizeMode="contain" />
              </View>
              <Text className="text-2xl font-BlockHead mb-2 ">Perfil</Text>
            </View>
            <Text className="font-Waku mb-5 mt-2">Actualiza tu nombre de usuario o correo</Text>
            <InputField
              label="Username"
              value={copyOfUser?.username || ''}
              onChangeText={(text) => setCopyOfUser({ ...copyOfUser, username: text })}
              placeholder="Escribe tu nombre de usuario"
              placeholderTextColor="#8c8c8c"
              onFocus={() => setCustomHeight(true)}
              onSubmitEditing={() => setCustomHeight(false)}
            // icon={icons.lock}
            // value={verification.code}
            // onChangeText={(code) => setVerification({ ...verification, code })}
            />

            {/* {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
              {verification.error}
              </Text>
              )} */}
            {
              hasChanges() && (
                <CustomButton
                  title="Guardar Cambios"
                  textVariant="default"
                  onPress={saveYourChanges}
                  className="mt-5 bg-success-500"
                />
              )
            }


          </View>
        </ReactNativeModal>

      </SafeAreaView >
    </ImageBackground>
  )
}

export default Home