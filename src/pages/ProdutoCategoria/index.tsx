import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import AxiosInstance from "../../api/AxiosInstance";
import CardProduto from "../../components/cardProduto";
import { AutenticacaoContext } from "../../context/AutenticacaoContext";
import { PesquisaProvider } from "../../context/PesquisaContext";
import { ProdutoType } from "../../models/ProdutoType";
import { usePesquisar } from "../../context/PesquisaContext";

const ProdutoCategoria = () => {
    const [produto, setProduto] = useState<ProdutoType[]>([]);
    const {usuario} = useContext(AutenticacaoContext);
    const pesquisar = usePesquisar();
    const [vazio, setVazio] = useState(false);

    useEffect(() => {
        getDadosProduto();
      }, []);

    const getDadosProduto = async () => {
        // setLoading(true)
        AxiosInstance.get(`/produto`, {
          headers: {Authorization: `Bearer ${usuario.token}`},
        })
        .then(result => {
            const ListaProduto = result.data;
            let ListaTemporaria: any = [];
            ListaProduto.filter(produto => {
              if (produto.nomeCategoria === pesquisar.pesquisa.nomeCategoria) {
                ListaTemporaria.push(produto);
                setProduto(ListaTemporaria);
                setVazio(false)
              }else{
                setVazio(true)
              }
            });
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
            <View style={styles.container}>
                
              {!vazio &&(
                <View>
                    <Text>Produto Categoria</Text>
               <FlatList 
                data={produto}
                keyExtractor={(item, index) => String(item.idProduto)}
                renderItem={({ item }) => <ListProduto  produto={item} />}
                horizontal={true}
                //onEndReached={getDadosProduto}
                //onEndReachedThreshold={0.1}
                //ListFooterComponent={ <FooterList load={loading}/>}
                />
                </View>
                )}
                {vazio &&(
                  <View>
                    <Text>
                      {'Nenhum Produto encotrado'}
                    </Text>
                  </View>
                )}
            </View>
          );
        }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9a4c4',
        padding: 16,
        alignItems: 'stretch',
        justifyContent: 'center',
      }
})

export default ProdutoCategoria;