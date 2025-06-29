import { carrusel } from "@/constants";
import { Marquee } from "@animatereactnative/marquee";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import { Dimensions, Image, Text, View } from "react-native";

const { width } = Dimensions.get('window')
const _itemSize = width * 0.4
const _spacing = 8
const _bgColor = '#0c0820'

function chunkArray(arr: string[], size: number) {
  const chunked_arr = []
  let index = 0
  while (index < arr.length) {
    chunked_arr.push(arr.slice(index, index + size))
    index += size
  }
  return chunked_arr
}

export default function Presentation({ isLastSlide, swiperRef }: { isLastSlide: boolean, swiperRef: React.RefObject<any> }) {
  const pictures = useMemo(() => chunkArray(carrusel, Math.floor(carrusel.length / 3)),
    []
  )
  return (
    <View className="flex-1">
      <View
        style={{ flex: 1, overflow: "hidden" }}
      >
        <View style={{
          flex: 1,
          gap: _spacing,
          transform: [{
            rotate: '-4deg'
          }]
        }}>
          {pictures.map((column, columnIndex) => (
            <Marquee
              speed={0.5}
              spacing={_spacing}
              key={`marquee-${columnIndex}`}
              reverse={columnIndex % 2 !== 0}
            >
              <View style={{ flexDirection: 'row', gap: _spacing }}>
                {column.map((image, index) => (
                  <Image key={`image-for-column-${columnIndex}-${index}`} source={image} style={{ width: _itemSize, aspectRatio: 1, borderRadius: _spacing }} />
                ))}
              </View>
            </Marquee>
          ))}
        </View>
      </View>
      <LinearGradient
        colors={['#00000000', _bgColor, _bgColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.7, 1]}
        pointerEvents='none'
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: "50%"
        }}
      />
      <View style={{ flex: 0.2, marginBottom: 30, justifyContent: 'center', alignItems: 'center', padding: _spacing, gap: _spacing }}>
        <Text className="font-BlockHead" style={{ color: "#fff", fontSize: 20, marginTop: _spacing, textAlign: 'center' }}>
          Desbloquea tu {" "}
          <Text style={{ fontWeight: 'bold' }}>Creativad</Text>{'\n'}
          <Text style={{ fontWeight: 'bold' }}>y Potencial</Text>{" "}con la IA
        </Text>
      </View>

    </View>

  )
}

