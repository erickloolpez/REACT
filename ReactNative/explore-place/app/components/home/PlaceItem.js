import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

export default function PlaceItem({ place }) {

  const barStyles = (state) => {
    if (state == 'pendiente') {
      return {
        width: `8%`,
        backgroundColor: '#7EBA94'
      }
    } else if (state == 'proceso') {
      return {
        width: `50%`,
        backgroundColor: '#7EBA94'
      }
    } else {
      return {
        width: `100%`,
        backgroundColor: '#7EBA94'
      }
    }
  }
  const iconStyles = (state, index) => {
    if (state == 'pendiente' && index == 0) {
      return {
        backgroundColor: '#7EBA94'
      }
    } else if (state == 'proceso' && (index == 1 || index == 0)) {
      return {
        backgroundColor: '#7EBA94'
      }
    } else if (state == 'completado' && index <= 2) {
      return {
        backgroundColor: '#7EBA94'
      }
    } else {
      return {
        backgroundColor: 'white'
      }
    }
  }

  return (
    <View style={{
      width: '90%',
      height: 110,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center ',
      justifyContent: 'space-around',
      marginBottom: 10,
      marginTop: 8,
    }}>
      <Image
        source={{uri:place.imagen}}
        style={{
          width: '40%',
          height: '100%',
          borderRadius: 8,
        }}
      />
      <View style={{
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'col',
        justifyContent: 'space-around',
        marginLeft: 24,
      }}>
        <Text style={{
          fontSize: 13,
          marginBottom:12,
        }}>{place.nombre}</Text>
        <View style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={styles.bgBar}>
            <View style={[styles.bar, barStyles(place.estado)]} />
            <View style={[styles.icon, { left: -1, top: -10 }, iconStyles(place.estado, 0)]}>
              <Image source={require('../../../assets/images/Check.png')} />
            </View>
            <View style={[styles.icon, { right: '43%', top: -10 }, iconStyles(place.estado, 1)]}>
              <Image source={require('../../../assets/images/Check.png')} />
            </View>
            <View style={[styles.icon, { right: -1, top: -10 }, iconStyles(place.estado, 2)]}>
              <Image source={require('../../../assets/images/Check.png')} />
            </View>
          </View>
        </View>
        <View style={{display:'flex',flexDirection: 'row',justifyContent: 'space-between', marginTop:8}}>
          <Text style={{fontSize:8}} >Pendiente</Text>
          <Text style={{fontSize:8}}>Proceso</Text>
          <Text style={{fontSize:8}}>Completado</Text>
        </View>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <Text style={{
            fontSize: 13,
            marginRight: 8,
          }}>{place.peticiones}</Text>
          <MaterialIcons name="groups" size={18} color="black" />
        </View>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'col',
    alignItems: 'center',
  },
  imgContainer: {
    padding: 5,
    borderWidth: 2,
    borderRadius: 10,
  },
  img: {
    width: 10,
    height: 10,
  },
  bgBar: {
    backgroundColor: '#dedede',
    width: '100%',
    height: 5,
    borderRadius: 20,
    position: 'relative',
    borderWidth: 1,
  },
  bar: {
    height: '100%',
    borderRadius: 20,
  },
  icon: {
    position: 'absolute',
    zIndex: 2,
    borderRadius: 50,
    borderWidth: 2

  }
})