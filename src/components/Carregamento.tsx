import React from "react";
import { Modal, View, ActivityIndicator,Text, StyleSheet } from "react-native";

export default function Loading({visible}) {
    return (
        <Modal transparent visible={visible}>
            <View style={ styles.carregando}>
                <ActivityIndicator
                    size="large"
                    color={'#f5b0d0'}
                    animating={true}
                />
                <Text style={ styles.texto}> Carregando </Text>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
  carregando: {
    flex: 1,
    justifyContent: "center",
    marginBottom: -450,
    alignItems: 'stretch',
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  texto:{
    color:'#f5b0d0',
    justifyContent: "space-around",
    textAlign:"center"
  }
});