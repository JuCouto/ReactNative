import { NavigationRouteContext } from "@react-navigation/native";
import React, {useState, useEffect, useContext} from "react";
import { StatusBar, View, TextInput, FlatList } from "react-native";
import { Text} from 'react-native-elements';
import { ScrollView } from "react-native-gesture-handler";
import AxiosInstance from "../api/AxiosInstance";
import { AutenticacaoContext } from "../context/AutenticacaoContext";
import { usePesquisar } from "../context/PesquisaContext";
import { CategoriaType } from "../models/CategoriaType";


export default function BarraPesquisa(props) {
    const [pesquisa, setPesquisa] = useState('');
    const [categoria, setCategoria] = useState<CategoriaType[]>([]);
    const {usuario} = useContext(AutenticacaoContext);
    const pesquisar = usePesquisar();

    const selecionaPesquisa =(categoria:any)=>{
        pesquisar.Buscar(categoria);
        props.navigation.navigate('ProdutoCategoria')
        console.log("Categoria clicada" , pesquisar.pesquisa);
    } 
    useEffect(() => {
        getDadosCategoria();
      }, []);
    
      const getDadosCategoria = async () => {
        AxiosInstance.get(`/categoria`, {
          headers: {Authorization: `Bearer ${usuario.token}`},
        })
          .then(result => {
            // console.log('Dados das categorias:' + JSON.stringify(result.data));
            setCategoria(result.data);
          })
          .catch(error => {
            console.log(
              'Erro ao carregar a lista de categoria - ' + JSON.stringify(error),
            );
          });
      };

    return(
        <View style={{flex: 1, alignItems: "center", marginTop: 20}}>
        <StatusBar barStyle="light-content"/>
        <TextInput placeholder="Pesquisar..." 
        onChangeText={setPesquisa}
        />

       <ScrollView>
        {categoria.filter((val) => {
            if(pesquisa.length <= 3){
                return;
                
            }else if(val.nomeCategoria.toLowerCase().includes(pesquisa.toLowerCase())){
                return val
            }

        }).map((categoria, indice) => (
            <Text onPress={(e)=> selecionaPesquisa(categoria)} key={indice}>{categoria.nomeCategoria}</Text>
        ))}
       </ScrollView>
        </View>
    )
}