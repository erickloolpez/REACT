import { View, Text, Image, TouchableOpacity, ScrollView, Pressable, FlatList,Dimensions } from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faComments, faGem, faHeart, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import CountryFlag from 'react-native-country-flag'
import { LinearGradient } from 'expo-linear-gradient'
import MasonryList from '@react-native-seoul/masonry-list';

import { images, parks } from '../../constants'
import { getAllFavoritesByUser, getAllReviewsByUser, signOut } from '../../lib/appwrite'
import { router, useFocusEffect } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import { LinearTransition } from 'react-native-reanimated'
import { MotiView } from 'moti'
import Review from '../../components/Comment'
import useAppwrite from '../../lib/useAppwrite'


const Profile = () => {
  const { setUser, setIsLogged, user } = useGlobalContext()
  const { data: reviews } = useAppwrite(() => getAllReviewsByUser(user.$id))
  const { data: favorites, refetch } = useAppwrite(() => getAllFavoritesByUser(user.$id))

  const onRefresh = async () => {
    await refetch()
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

  const listParks = ["Llanganates", "Podocarpus", "Galapagos", "Machalilla", "El cajas", "Cayambe Coca", "Sangay", "Sumaco", "Yasuni", "Yacuri", "Cotopaxi"]

  const yourFavorites = parks.filter((park) =>
    favorites.some((favorite) => favorite.parks.nombre === park.name)
  )

  // console.log('FAVORITE', favorites)
  // console.log("PLACES", yourFavorites)


  const [index, setIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [isSelected, setIsSelected] = useState(0)
  const activeColor = "#fff"
  const inactiveColor = "#ggg"
  const activeBackgroundColor = "#cf613c"
  const inactiveBackgroundColor = "#17301a"

  const logout = async () => {
    await signOut()
    setUser(null)
    setIsLogged(false)

    router.replace('/sign-in')
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
            {/* <LinearGradient className="absolute w-full h-[40%] rounded-lg " colors={['#CCCCB2', '#757519']} /> */}
            <Pressable
              className="w-full h-[10%] items-end justify-center "
              onPress={logout}
            >
              <View className=" w-10 h-10 mr-2 rounded-lg items-center justify-center ">
                <FontAwesomeIcon icon={faRightFromBracket} color='#ef4444' size={32} />
              </View>
            </Pressable>

            <View className="w-full h-[60%] items-center justify-center">
              <View className="w-28 h-28  rounded-full overflow-hidden ">
                <Image source={images.avatar} resizeMode="cover" className="w-full h-full" />
              </View>

              <View className="items-center">
                <View className="h-10 rounded-lg items-center justify-center">
                  <Text className="text-white font-semibold text-xl">Monica Perez</Text>
                </View>

                <View className="">
                  <CountryFlag isoCode="de" size={25} />
                </View>
              </View>
            </View>

            <View className="w-[90%] h-[23%] flex-row items-center bg-primary rounded-xl">
              <View className="w-[33.3%] h-full  items-center justify-center ">
                <FontAwesomeIcon icon={faGem} color='#93c5fd' size={32} />
                <Text className="ml-2 text-[#925131] font-bold ">{user.puntaje} puntos</Text>
              </View>
              <View className="w-[33.3%] h-full  items-center justify-center ">
                {/* <FontAwesomeIcon icon={faHeart} color='#f97316' size={32} /> */}
                <Text className="ml-2 text-[#925131] font-bold text-2xl">{favorites.length}</Text>
                <Text className="ml-2 text-[#925131] font-bold">favoritos</Text>
              </View>
              <View className="w-[33.3%] h-full  items-center justify-center ">
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
                <View className="w-full mt-3 ">
                  <MasonryList
                    data={yourFavorites}
                    keyExtractor={(item) => item.name}
                    numColumns={4} // Puedes ajustar este valor según el diseño
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          router.push(`/modals/${item.name}`)
                        }}
                        style={{ width: '100%', margin: 5, overflow: 'hidden' }}
                      >
                        <Image
                          source={item.image}
                          resizeMode="cover"
                          style={{ width: '96%', height: Math.random() * 150 + 100, borderRadius: 10 }} // Altura aleatoria para diseño estilo Pinterest
                        />
                        <Text className="text-white font-semibold">{item.name}</Text>
                      </TouchableOpacity>
                    )}
                  />

                </View>
              )
            }
            {
              index !== 0 && (
                <View className="items-center pt-4">
                  <FlatList
                    data={reviews}
                    keyExtractor={(comment, index) => comment.$id}
                    renderItem={({ item: comment, index }) => (
                      <Review key={`comment-${index}-${comment.users.username}`} width={_slideWidth} height={144} text={comment.text} name={comment.users.username} />
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
              )
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient >
  )
}

export default Profile