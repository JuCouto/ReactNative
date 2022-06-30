import React from 'react';
import {Card, Text} from 'react-native-elements';
import {StyleSheet} from 'react-native';
import { ProdutoType } from '../models/ProdutoType';

const CardProduto = (props: ProdutoType) => {
  const dadosDoProduto = props.dados;
  console.log(dadosDoProduto);
  return (
    <Card containerStyle={styles.card_style}>
      <Card.Image
        style={styles.imgCards}
        source={{uri:dadosDoProduto.imagemProduto}}
      />
      <Card.Divider />
      <Card.Title style={styles.titulo_cards}>
        {dadosDoProduto.nomeProduto}
      </Card.Title>
      <Text style={styles.descricao_cards}>{dadosDoProduto.descricaoProduto}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card_style: {
    backgroundColor: '#faf5f8',
    padding: 0,
    marginBottom: 20,
    width: 125,
    borderRadius: 5,
    borderWidth: 0,
  },
  imgCards: {
    width: 125,
    height: 150,
    borderWidth: 3,
    borderColor: '#bd0b5e',
    borderRadius: 5,
  },

  titulo_cards: {
    fontSize: 18,
    color: '#bd0b5e',
  },
  descricao_cards:{
    fontSize: 18,
    color: '#f84297',
    textAlign:"center"
  }
});

export default CardProduto;
