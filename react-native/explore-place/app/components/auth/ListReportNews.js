import { View, Text, Image, Animated, PanResponder, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ListReportNews({ placeList }) {
  let position = new Animated.ValueXY()
  const [currentIndex, setCurrentIndex] = useState(0)

  const screenWidth = Dimensions.get('window').width
  const cardWidth = screenWidth * 0.8



  let rotate = position.x.interpolate({
    inputRange: [-cardWidth / 2, 0, cardWidth / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  })

  let rotateAndTranslate = {
    transform: [{
      rotate: rotate
    },
    ...position.getTranslateTransform()
    ]
  }

  let nextCardOpacity = position.x.interpolate({
    inputRange: [-cardWidth / 2, 0, cardWidth / 2],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp'
  })
  let nextCardScale = position.x.interpolate({
    inputRange: [-cardWidth / 2, 0, cardWidth / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp'
  })

  let panRes = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({ x: gestureState.dx, y: gestureState.dy, useNativeDriver: false })
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 120) {
        Animated.spring(position, {
          toValue: { x: cardWidth + 100, y: gestureState.dy },
          useNativeDriver: true
        }).start(() => {
          let nextIndex = currentIndex + 1

          // Si nextIndex es igual a la longitud de placeList, restablece currentIndex a 0
          // De lo contrario, setea currentIndex a nextIndex
          if (nextIndex == placeList.length) {
            setCurrentIndex(0)
          } else {
            setCurrentIndex(nextIndex)
          }

          position.setValue({ x: 0, y: 0, useNativeDriver: false })
          // setCurrentIndex(currentIndex+1)
          // position.setValue({x:0, y:0,useNativeDriver:false})
        })
      } else if (gestureState.dx < -120) {
        Animated.spring(position, {
          toValue: { x: -cardWidth - 100, y: gestureState.dy },
          useNativeDriver: true
        }).start(() => {
          let nextIndex = currentIndex + 1

          if (nextIndex == placeList.length) {
            setCurrentIndex(0)
          } else {
            setCurrentIndex(nextIndex)
          }

          position.setValue({ x: 0, y: 0, useNativeDriver: false })
          // setCurrentIndex(currentIndex + 1)
          // position.setValue({ x: 0, y: 0, useNativeDriver: false })
        })
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          friction: 4,
          useNativeDriver: true
        }).start()
      }
    }

  })

  return (
    <View style={{ width: '80%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'relative', }}>
      {placeList.map((place, index) => {
        if (index < currentIndex) {
          return null
        } else if (index == currentIndex) {
          return (
            <Animated.View {...panRes.panHandlers} style={[{ width: '90%', height: '85%', position: 'absolute' }, rotateAndTranslate]} key={index}>
              <View style={{ width: '100%', height: '100%', backgroundColor: 'white', borderRadius: 20, borderWidth: 1, display: 'flex', zIndex: 2 }}>
                <View style={{ width: '100%', height: '14%', borderBottomWidth: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 30 }}>
                  <View style={{ width: '63%', backgroundColor: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: 40, height: 40, borderWidth: 1, borderRadius:50 }}>
                      <Image source={require('./../../../assets/images/avatar.png')} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                      <Text>Ahmad Syarif</Text>
                      <Text style={{ fontSize: 12, color: '#6A6B6D' }}>4 horas atras</Text>
                    </View>
                  </View>
                  <Feather name="more-vertical" size={24} color="black" />
                </View>
                <View style={{ width: '100%', height: '76%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ width: '90%', height: '40%', marginBottom: 20 }}>
                    <Text numberOfLines={8}>{place.descripcion}</Text>

                  </View>
                  <View style={{ width: '90%', height: '40%' }}>
                    <Image source={{ uri: place.imagen }} style={{ width: '100%', height: '100%', objectFit: 'fill', borderRadius: 8, borderWidth: 1 }} />
                  </View>
                </View>
                <View style={{ width: '100%', height: '10%', display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                  <View style={{ width: '20%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <AntDesign name="like2" size={24} color="black" />
                    <Text>10</Text>
                  </View>
                  <View style={{ width: '50%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginLeft: 4 }}>
                    <MaterialCommunityIcons name="comment-processing-outline" size={24} color="black" />
                    <Text>10 Comentarios</Text>
                  </View>
                </View>
              </View>
              <View style={{ width: '106%', height: '100%', backgroundColor: 'white', borderRadius: 20, borderWidth: 1, position: 'absolute', top: 12, left: -8 }} />
            </Animated.View>
          )
        } else {
          return (
            <Animated.View style={[{ width: '90%', height: '75%', position: 'absolute' }, { opacity: nextCardOpacity, transform: [{ scale: nextCardScale }] }]} key={index}>
              <View style={{ width: '100%', height: '100%', backgroundColor: 'white', borderRadius: 20, borderWidth: 1, display: 'flex', zIndex: 2 }}>
                <View style={{ width: '100%', height: '14%', borderBottomWidth: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 30 }}>
                  <View style={{ width: '63%', backgroundColor: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ width: 40, height: 40, borderWidth: 1,  }}>
                      <Image source={require('./../../../assets/images/avatar.png')} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                      <Text>Ahmad Syarif</Text>
                      <Text style={{ fontSize: 12, color: '#6A6B6D' }}>4 horas atras</Text>
                    </View>
                  </View>
                  <Feather name="more-vertical" size={24} color="black" />
                </View>
                <View style={{ width: '100%', height: '76%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ width: '90%', height: '40%', marginBottom: 20 }}>
                    <Text numberOfLines={8}>{place.descripcion}</Text>

                  </View>
                  <View style={{ width: '90%', height: '40%' }}>
                    <Image source={{ uri: place.imagen }} style={{ width: '100%', height: '100%', objectFit: 'fill', borderRadius: 8, borderWidth: 1 }} />
                  </View>
                </View>
                <View style={{ width: '100%', height: '10%', display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                  <View style={{ width: '20%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <AntDesign name="like2" size={24} color="black" />
                    <Text>10</Text>
                  </View>
                  <View style={{ width: '50%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginLeft: 4 }}>
                    <MaterialCommunityIcons name="comment-processing-outline" size={24} color="black" />
                    <Text>10 Comentarios</Text>
                  </View>
                </View>
              </View>
              <View style={{ width: '106%', height: '100%', backgroundColor: 'white', borderRadius: 20, borderWidth: 1, position: 'absolute', top: 12, left: -8 }} />
            </Animated.View>

          )

        }
      }).reverse()}
    </View>
  )
}