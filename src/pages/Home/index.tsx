import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import {Card, Text} from 'react-native-elements';
import AxiosInstance from '../../api/AxiosInstance';

type CategoriaType ={
    idCategoria: number;
    nomeCategoria: string;
    nomeImagem: string;
}

const Home = ({route, navigation}) => {  
    const { token } = route.params;  
   // console.log('Token: ' + token);
   const [categoria, setCategoria] = useState<CategoriaType[]>([]);

   useEffect(() => {
    getDadosCategoria();
   }, []);

   const getDadosCategoria = async () => {
    AxiosInstance.get(
        `/categoria`,
        { headers: {"Authorization" : `Bearer ${token}`}}
    ).then( result =>{
        console.log('Dados das categorias: ' + JSON.stringify(result.data));
        setCategoria(result.data);
    }).catch((error) =>{
        console.log("Erro ao carregar a lista de categorias - " + JSON.stringify(error))
    });
   }

  return (
    <ScrollView style={styles.container} >
      <ScrollView style={styles.scroll_categorias} horizontal={true}>
        {
            categoria.map((k, i) => (
        <TouchableOpacity key={i}
          onPress={() => console.log('Categoria ${k.nomeCategoria} foi clicada')}
          style={styles.botao_categoria}>
          <View style={styles.view_itens_categoria}>
            <Text style={styles.texto_nome_categoria}>{k.nomeCategoria}</Text>
          </View>
        </TouchableOpacity>
        ))
        }
      </ScrollView>
      <Text>{'Recentes'}</Text>
      <ScrollView  horizontal={true}>
        <Card style={styles.containerCards}>
          <Card.Image style={styles.imgCards} source={require('../../assets/img/cachorro-pug-1588098472110_v2_1x1.jpg')} />
          <Card.Divider />
          <Card.Title>Título</Card.Title>
          <Text>Descrição</Text>
        </Card>
        <Card>
          <Card.Image style={styles.imgCards}source={require('../../assets/img/cachorro-pug-1588098472110_v2_1x1.jpg')} />
          <Card.Divider />
          <Card.Title>Título</Card.Title>
          <Text>Descrição</Text>
        </Card>
        <Card>
          <Card.Image style={styles.imgCards} source={require('../../assets/img/cachorro-pug-1588098472110_v2_1x1.jpg')} />
          <Card.Divider />
          <Card.Title>Título</Card.Title>
          <Text>Descrição</Text>
        </Card>
        <Card>
          <Card.Image style={styles.imgCards} source={require('../../assets/img/cachorro-pug-1588098472110_v2_1x1.jpg')} />
          <Card.Divider />
          <Card.Title>Título</Card.Title>
          <Text>Descrição</Text>
        </Card>
        <Card>
          <Card.Image containerStyle={styles.imgCards} source={require('../../assets/img/cachorro-pug-1588098472110_v2_1x1.jpg')} />
          <Card.Divider />
          <Card.Title>Título</Card.Title>
          <Text>Descrição</Text>
        </Card>
      </ScrollView>
      <Card style={styles.lastCard}>
        <Card.Image  source={require('../../assets/img/images.jpg')} />
        <Card.Divider />
        <Card.Title>Dog</Card.Title>
        <Text>Feliz</Text>
      </Card>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9a4c4',
    padding: 30,
  },
  scroll_categorias: {
    backgroundColor: '#f84297',
    flexGrow: 0,
  },
  view_itens_categoria: {
    width: 100,
    height: 100,
    backgroundColor: '#bd0b5e',
    justifyContent: 'center',
  },
  botao_categoria: {
    alignItems: 'center',
    padding: 10,
  },
  texto_nome_categoria: {
    color: 'white',
    textAlign: 'center',
  },
  imgCards:{
    width: 100,
    height: 150,
    borderWidth: 3,
    borderColor:'#bd0b5e',
    borderRadius: 5,
  },
  lastCard:{
   marginBotton:20,
   borderRadius: 5,
  }
});

export default Home;