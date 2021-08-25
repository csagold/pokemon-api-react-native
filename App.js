import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import axios from 'axios';
import async from "async";
import {getAllPokemon,getPokemon} from "./services/pokemon";

export default function App() {

    const [pokemon, setPokemon] = useState('Ditto')
    const [pokemonData, setPokemonData] = useState([])
    const [loading, setLoading] = useState(true)
    const initialUrl = 'https://pokeapi.co/api/v2/pokemon?limit=50'

    useEffect(() => {
        async function fetchData() {
            let response = await getAllPokemon(initialUrl)
            // map through response
            // console.log(response)

            let pokemon = await loadingPokemon(response.results)
            setLoading(false)
        }
fetchData()
    }, [])

    const loadingPokemon = async (data) => {
        let _pokemonData = await Promise.all(
            data.map(async pokemon => {
                // RETURNS POKEMON
                // let pokemonRecords = await getPokemon(pokemon.url)
                // RETURNS ABILITIES??
                let pokemonRecord = await getPokemon(pokemon.url)
                return pokemonRecord
            }))

        setPokemonData(_pokemonData)
    }

    console.log(pokemonData)
    // const getPokemon = async () => {
    //     const toArray = []
    //     try {
    //         const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
    //         const res = await axios.get(url)
    //         console.log(res)
    //
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    // useEffect(() => {
    //     getPokemon()
    // },[])

    // const handleChange = (text) => {
    //     console.log(text)
    //     setPokemon(text)
    // }
    //
    // const handlePress = (e) => {
    //     e.preventDefault()
    //     getPokemon()
    // }

    return (
        // <View style={styles.container}>
        //     <TouchableHighlight onPress={handlePress}>
        //         <TextInput
        //             value={pokemon}
        //             onChangeText={handleChange} placeholder="Enter Pokemon name.">
        //
        //         </TextInput>
        //     </TouchableHighlight>
        // </View>

        <View>
            { loading ? <Text>Loading...</Text> : (
                <Text>Data is fetched!</Text>
            )}
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});



// import React, { Component } from 'react';
// import { View, Text, SafeAreaView, StyleSheet, FlatList, Image } from 'react-native';
// import axios from 'axios';
// const urlImage = 'https://pokeres.bastionbot.org/images/pokemon/';
//
// export default class App2 extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: []
//         };
//     }
//
//     componentDidMount() {
//         this.getListPokemon();
//     }
//
//     getListPokemon = async () => {
//         try {
//             const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50');
//             console.log('RES:', res);
//             if (res) {
//                 this.setState({
//                     data: res.data.results
//                 })
//             }
//         } catch (error) {
//             console.log('error:', error);
//         }
//     }
//
//     renderItem = ({ item, index }) => {
//         let url = item.url;
//         const idPokemon = url.split('https://pokeapi.co/api/v2/pokemon/');
//         const link = urlImage + idPokemon[1].substring(0, idPokemon[1].length - 1) + ".png";
//         console.log('link', link)
//         return <View style={styles.item}>
//             <Image
//                 style={styles.image}
//                 resizeMode="contain"
//                 source={{ uri: link }}
//             />
//             <Text style={styles.text}>{item.name}</Text>
//         </View>
//     }
//
//     render() {
//         const { data } = this.state;
//         return (
//             <SafeAreaView style={styles.container}>
//                 <FlatList
//                     numColumns={2}
//                     style={styles.container}
//                     data={data}
//                     renderItem={this.renderItem}
//                     keyExtractor={item => `key-${item.name}`}
//                 />
//             </SafeAreaView>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     item: {
//         padding:4,
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'white',
//         marginTop: 8,
//         marginHorizontal: 5,
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//
//         elevation: 5,
//     },
//     image: {
//         width: 100,
//         height: 100
//     },
//     text: {
//         color: 'orange',
//         fontWeight:'bold'
//     }
// })
