import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import useAuth from '../../hooks/useAuth'

export default function UserData() {
  const { auth, logout } = useAuth()
  return (
    <View style={styles.content}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Bienvenido,</Text>
        <Text style={styles.title}>{`${auth.nombre} ${auth.nombre}`}</Text>
      </View>

      <View style={styles.dataContent}>
        <ItemMenu title="Nombre" text={`${auth.nombre} ${auth.nombre}`} />
        <ItemMenu title="Username" text={auth.nombre} />
        <ItemMenu title="Email" text={auth.correo} />
        <ItemMenu title="Total de Reportes" text={`0 reportes`} />
      </View>

      <Button title="Desconectarse" onPress={logout} style={styles.btnLogoun} />
    </View>
  )
}

function ItemMenu(props) {
  const { title, text } = props;

  return (
    <View style={styles.itemMenu}>
      <Text style={styles.itemMenuTitle}>{title}:</Text>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleBlock: {
    marginBottom: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  dataContent: {
    marginBottom: 20,
  },
  itemMenu: {
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#CFCFCF",
  },
  itemMenuTitle: {
    fontWeight: "bold",
    paddingRight: 10,
    width: 120,
  },
  btnLogoun: {
    paddingTop: 20,
  },
});