import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import useAuth from '../../hooks/useAuth'
import {useNavigation} from '@react-navigation/native'

export default function UserData() {
  const navigator = useNavigation()
  const { auth, logout } = useAuth()
  return (
    <View style={styles.content}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Bienvenido,</Text>
        <Text style={styles.title}>{auth.username}</Text>
      </View>
      <View style={{width: '100%', height:'15%', display:'flex',flexDirection:'row', justifyContent:'center'}}>
        <TouchableOpacity style={{width:'25%', height:'100%', borderRadius:50, overflow:'hidden', borderWidth:1}}>
          <Image style={{width:'100%', height:'100%', objectFit:'cover'}} source={require('../../../assets/images/usuario.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.dataContent}>
        <ItemMenu title="Nombre" text={auth.username} />
        <ItemMenu title="Username" text={auth.username} />
        <ItemMenu title="Email" text={auth.email} />
        <ItemMenu title="Total de Reportes" text={`${auth?auth.reportes.length:'0'} reportes`} />
      </View>

      <TouchableOpacity
        style={{width:'100%', height:'24%', display:'flex', alignItems:'center',justifyContent: 'center' }}
        onPress={()=>{
          navigator.navigate('login')
          logout()
        }}
      >
        <View style={{width:'40%', height:'34%', backgroundColor: '#ff7676',display: 'flex',flexDirection:'row', justifyContent: 'center', alignItems: 'center', borderRadius:4}} >
        <Text style={{color:'white', fontWeight:600}}>DESCONECTARSE</Text>
        </View>
      </TouchableOpacity>

    </View>
  )
}

function ItemMenu(props) {
  const { title, text } = props;

  return (
    <View style={styles.itemMenu}>
      <Text style={styles.itemMenuTitle}>{title}:</Text>
      <Text style={{fontSize:16}}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width:'100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  titleBlock: {
    width: '90%',
    height: '10%',
    marginBottom: 10,
    marginleft: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  dataContent: {
    width: '74%',
    height:'40%',
    marginTop: 20,
    marginBottom: 20,
  },
  itemMenu: {
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#CFCFCF",
  },
  itemMenuTitle: {
    fontSize:16,
    color:'gray',
    fontWeight: 600,
    paddingRight: 10,
    width: 120,
  },
  btnLogoun: {
    paddingTop: 20,
  },
});