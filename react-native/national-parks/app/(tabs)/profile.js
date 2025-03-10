import { View, Text, Image, TouchableOpacity, ScrollView, Pressable, FlatList, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { useCallback, useEffect, useState, useRef, useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleXmark, faComments, faGem, faHeart, faPenToSquare, faRightFromBracket, faSquareCheck, faXmark, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import CountryFlag from 'react-native-country-flag'
import { LinearGradient } from 'expo-linear-gradient'
import MasonryList from '@react-native-seoul/masonry-list';
import { interpolate, LinearTransition, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { MotiView } from 'moti'
import Modal from 'react-native-modal'
import { router, useFocusEffect } from 'expo-router'
import Animated, { withTiming } from 'react-native-reanimated'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { BottomSheetModal, BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet'

import { images, parks } from '../../constants'
import { getAllFavoritesByUser, getAllReviewsByUser, getScore, signOut } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import Review from '../../components/Comment'
import useAppwrite from '../../lib/useAppwrite'
import ModalFeedBack from '../../components/modalFeedback'



const Profile = () => {
  const { setUser, setIsLogged, user } = useGlobalContext()
  const { data: reviews, refetch: refetchReviews } = useAppwrite(() => getAllReviewsByUser(user.$id))
  const { data: score, refetch: refetchScore } = useAppwrite(() => getScore(user.$id))
  const { data: favorites, refetch } = useAppwrite(() => getAllFavoritesByUser(user.$id))
  const bottomSheetModalRef = useRef(null)
  const handlePresentModalPress = () => bottomSheetModalRef.current?.present()
  const [reviewSelected, setReviewSelected] = useState(null)

  const onRefresh = async () => {
    try {
      await refetch();
      await refetchReviews();
      await refetchScore();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      onRefresh()
    }, [])
  )
  const { width, height } = Dimensions.get('window')
  const _slideWidth = width * 0.88
  const _slideHeight = height * 0.47
  const _spacing = 18


  const yourFavorites = parks.filter((park) =>
    favorites.some((favorite) => favorite.parks.nombre === park.name)
  )

  // console.log('FAVORITE', favorites)
  // console.log("PLACES", yourFavorites)


  const [index, setIndex] = useState(0)

  const logout = async () => {
    router.replace('/sign-in')
    await signOut()
    setUser(null)
    setIsLogged(false)
  }

  const InnerTabs = ({ title, id }) => {
    return (
      <MotiView
        key={`commentaries`}
        className="ml-2"
        layout={LinearTransition.springify().damping(80).stiffness(200)}
        animate={{
          borderRadius: 8,
          overflow: 'hidden',
          backgroundColor: id === index ? "#cf613c" : "green",
        }}
      >
        <Pressable onPress={() => {
          setIndex(id)
        }

        } style={{
        }}
          className="flex-row items-center  "
        >
          <View
            className="flex-row items-center justify-center ml-1 mr-4  rounded-lg p-2 "
          >
            {
              title === "Favoritos" && <FontAwesomeIcon icon={faHeart} color='#fbeecc' size={32} />
            }
            {
              title === "Reseñas" && <FontAwesomeIcon icon={faComments} color='#fbeecc' size={32} />
            }
            <Text className="ml-2 text-primary">{title}</Text>
          </View>
        </Pressable>

      </MotiView>
    )
  }

  return (
    <LinearGradient className="absolute w-full h-full" colors={['#5A3F37', '#2C7744']}>
      <SafeAreaView className="h-full " edges={['top']}>
        <ScrollView>
          <View className="w-full h-[50vh] items-center justify-around py-2 relative ">
            <Pressable
              className="w-full h-[10%] items-end justify-center "
              onPress={logout}
            >
              <View className=" w-10 h-10 mr-2 rounded-lg items-center justify-center ">
                <FontAwesomeIcon icon={faRightFromBracket} color='#ef4444' size={32} />
              </View>
            </Pressable>

            <View className="w-full h-[60%] items-center justify-center ">
              <View className="w-28 h-28  rounded-full overflow-hidden ">
                <Image source={{ uri: user.avatar }} resizeMode="cover" className="w-full h-full" />
              </View>

              <View className="h-10 rounded-lg items-center justify-center mt-4">
                <Text className="text-white font-semibold text-2xl">{user.username}</Text>
              </View>

              {/* <View className="">
                  <CountryFlag isoCode="de" size={25} />
                </View> */}
            </View>

            <View className="w-[90%] h-[23%] flex-row items-center bg-primary rounded-xl">
              {/* <View className="w-[33.3%] h-full  items-center justify-center ">
                <FontAwesomeIcon icon={faGem} color='#93c5fd' size={32} />
                <Text className="ml-2 text-[#925131] font-bold ">{score.puntaje} puntos</Text>
              </View> */}
              <View className="w-1/2 h-full  items-center justify-center ">
                {/* <FontAwesomeIcon icon={faHeart} color='#f97316' size={32} /> */}
                <Text className="ml-2 text-[#925131] font-bold text-2xl">{favorites.length}</Text>
                <Text className="ml-2 text-[#925131] font-bold">favoritos</Text>
              </View>
              <View className="w-1/2 h-full  items-center justify-center ">
                {/* <FontAwesomeIcon icon={faComments} color='#232533' size={32} /> */}
                <Text className="ml-2 text-[#925131] font-bold text-2xl">{reviews.length}</Text>
                <Text className="ml-2 text-[#925131] font-bold">reseñas</Text>
              </View>
            </View>
          </View>

          <View className="w-full mt-4">
            <View className="flex-row">
              <InnerTabs title='Favoritos' id={0} />
              <InnerTabs title='Reseñas' id={1} />
            </View>

            {
              index === 0 && (
                yourFavorites.length !== 0 ? (
                  <View className="w-full mt-3 ">
                    <MasonryList
                      data={yourFavorites}
                      keyExtractor={(item) => item.name}
                      numColumns={3} // Puedes ajustar este valor según el diseño
                      renderItem={({ item, i }) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              router.push(`/modals/${item.name}`)
                            }}
                            style={{ width: '100%', margin: 5, overflow: 'hidden' }}
                          >
                            <Image
                              source={item.image}
                              resizeMode="cover"
                              style={{ width: '96%', height: 0.6 * 150 + 100, borderRadius: 10 }} // Altura aleatoria para diseño estilo Pinterest
                            />
                            <Text className="text-white font-semibold">{item.name}</Text>
                          </TouchableOpacity>

                        )
                      }}
                    />

                  </View>
                ) : (
                  <View className="w-full h-[25vh] relative  items-end justify-center">
                    <View className="w-[60%] h-44">
                      <Image source={images.addFavorite} resizeMode="cover" className="w-full h-full" />
                    </View>
                    <Pressable
                      className="absolute top-8 left-2 w-40 bg-blue-200 rounded-t-2xl rounded-bl-2xl p-2"
                      onPress={() => {
                        router.replace('/home')
                      }}
                    >
                      <Text>Busca tu parques favoritos en el home</Text>
                    </Pressable>
                  </View>
                )

              )
            }
            {
              index !== 0 && (
                reviews.length !== 0 ? (
                  <View className="items-center pt-4">
                    <FlatList
                      data={reviews}
                      keyExtractor={(comment, index) => comment.$id}
                      renderItem={({ item: comment, index }) => (
                        <Pressable onPress={() => {
                          setReviewSelected(comment)
                          handlePresentModalPress()
                        }}>
                          <Review key={`comment-${index}-${comment.users.username}`} width={_slideWidth} height={144} text={comment.text} name={comment.users.username} rating={comment.rating} date={comment.$updatedAt} avatar={comment.users.avatar} />
                        </Pressable>
                      )}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      decelerationRate={"fast"}
                      snapToInterval={_slideWidth + _spacing}
                      contentContainerStyle={{
                        gap: _spacing,
                        paddingHorizontal: (width - _slideWidth) / 2,
                        alignItems: "center",
                      }}

                      scrollEventThrottle={100 / 60}
                    />
                  </View>

                ) : (
                  <View className="w-full h-[25vh] relative items-start justify-center">
                    <View className="w-[60%] h-44 mt-8">
                      <Image source={images.addReviews} resizeMode="contain" className="w-full h-full" />
                    </View>
                    <Pressable
                      className="absolute top-8 right-8 w-40 bg-blue-200 rounded-t-2xl rounded-br-2xl p-2"
                      onPress={() => {
                        router.replace('/home')
                      }}
                    >
                      <Text>Escribe una reseña en el parque que visitaste</Text>
                    </Pressable>
                  </View>
                )
              )
            }
          </View>

          <ModalFeedBack bottomSheetModalRef={bottomSheetModalRef} comment={reviewSelected} refetch={refetchReviews} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient >
  )
}

export default Profile