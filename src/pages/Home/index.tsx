import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Card, Text} from 'react-native-elements';
import AxiosInstance from '../../api/AxiosInstance';
import {Axios} from 'axios';
import {AutenticacaoContext} from '../../context/AutenticacaoContext';
import CardProduto from '../../components/cardProduto';
import {CategoriaType} from '../../models/CategoriaType';
import {ProdutoType} from '../../models/ProdutoType';
import {ActivityIndicator} from 'react-native';
import BarraPesquisa from '../../components/BarraPesquisa';

const Home = ({navigation}) => {
  // const { token } = route.params;
  // console.log('Token: ' + token);
  const {usuario} = useContext(AutenticacaoContext);
  console.log('Usuario: ' + JSON.stringify(usuario));
  const [categoria, setCategoria] = useState<CategoriaType[]>([]);
  const [produto, setProduto] = useState<ProdutoType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDadosCategoria();
    getDadosProduto();
  }, []);

  const getDadosCategoria = async () => {
    // setLoading(true);
    AxiosInstance.get(`/categoria`, {
      headers: {Authorization: `Bearer ${usuario.token}`},
    })
      .then(result => {
        // console.log('Dados das categorias:' + JSON.stringify(result.data));
        setCategoria(result.data);
        // setLoading(false);
      })
      .catch(error => {
        console.log(
          'Erro ao carregar a lista de categoria - ' + JSON.stringify(error),
        );
      });
  };

  function ListCategoria({categoria}) {
    return (
      <View style={styles.view_itens_categoria}>
        <Text style={styles.texto_nome_categoria}>
          {categoria.nomeCategoria}
        </Text>
      </View>
    );
  }

  //controla o círculo do flat categoria
  // function FooterList({load}) {
  //   if (!load) return null;
  //   return (
  //     <View style={styles.loading}>
  //       <ActivityIndicator size={25} color="#bd0b5e" />
  //     </View>
  //   );
  // }

  const getDadosProduto = async () => {
    // setLoading(true)
    AxiosInstance.get(`/produto`, {
      headers: {Authorization: `Bearer ${usuario.token}`},
    })
      .then(result => {
        //console.log('Dados dos produtos: ' + JSON.stringify(result.data));
        setProduto(result.data);
        // setLoading(false)
      })
      .catch(error => {
        console.log(
          'Erro ao carregar a lista de produtos - ' + JSON.stringify(error),
        );
      });
  };

  function ListProduto({produto}){
    return (
      <CardProduto dados={produto}/>
    );
  }

  return (
   
    <ScrollView style={styles.container}>
       <BarraPesquisa navigation={navigation}/>
      <View>
        <FlatList
          data={categoria}
          keyExtractor={(item, index) => String(item.idCategoria)}
          renderItem={({item}) => <ListCategoria categoria={item} />}
          horizontal={true}
          // onEndReached={getDadosCategoria}
          // onEndReachedThreshold={0.1}
          // ListFooterComponent={<FooterList load={loading} />}
        />
        <Text style={styles.titulo_secao}>{'Produtos'}</Text>
        <FlatList
          data={produto}
          keyExtractor={(item, index) => String(item.idProduto)}
          renderItem={({item}) => <ListProduto produto={item} />}
          horizontal={true}
          // onEndReached={getProduto}
          // onEndReachedThreshold={0.1}
          // ListFooterComponent={<FooterList load={loading} />}
        />
        <Text style={styles.titulo_secao}>{'Destaque'}</Text>
        <Text></Text>
        <Card containerStyle={styles.card_grande}>
          <Card.Image
            style={styles.imagens_cards}
            source={require('../../assets/img/labrador.jpg')}
          />
          <Card.Divider />
          <Card.Title style={styles.titulo_cardGrande}>Cachorro</Card.Title>
          <Text style={styles.descricao_card}>Feliz!</Text>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9a4c4',
    padding: 16,
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
  titulo_secao: {
    marginLeft: 15,
    fontSize: 25,
    color: '#bd0b5e',
    marginTop: 25,
  },
  card_grande: {
    backgroundColor: 'pink',
    padding: 0,
    marginBottom: 20,
    borderRadius: 5,
    borderWidth: 0,
  },
  imagens_cards: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: 120,
    height: 180,
    borderWidth: 3,
    borderColor: '#bd0b5e',
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 105,
    marginTop: 20,
    marginBottom: 10,
  },
  botao_categoria: {
    alignItems: 'center',
    padding: 10,
  },
  texto_nome_categoria: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17.5,
  },
  titulo_cardGrande: {
    fontSize: 25,
    color: '#f84598',
  },
  descricao_card: {
    textAlign: 'center',
    fontSize: 20,
    color: '#f84598',
    marginBottom: 15,
  },
});

export default Home;
