import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from '../database';

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            text: '',
            isSearchPressed: true,
            word: '',
            lexicalCategory: '',
            definition: ''
        }
    }

    getWord = (text) => {
        var text = text.toLowerCase();
        try {
            var word = dictionary[text]["word"]
            var lexicalCategory = dictionary[text]["lexicalCategory"]
            var definition = dictionary[text]["definition"]

            this.setState({
                "word": word,
                "definition": definition,
                "lexicalCategory": lexicalCategory
        })
        }
        catch(err) {
            alert("Sorry, this word is not available right now. We are working on improvements for the future.")
            this.setState({
                text: text,
                isSearchPressed: false
            })
        }
    }
    

    render() {
      return (
        <View>
            <ScrollView>
            <Header backgroundColor = {"#5C0032"} centerComponent = {{text: 'Pocket Dictionary', style: {color: 'white', fontSize: 28}}}/>

            <Image  style = {styles.imageIcon} source={{ uri: 'https://www.shareicon.net/data/128x128/2016/06/21/611136_dictionary_128x128.png', }}/>

            <TextInput style = {styles.inputBox} onChangeText = {text => {
                this.setState({
                    text: text,
                    isSearchPressed: false,
                    word: "Loading...",
                    lexicalCategory: '',
                    definition: ''
                })
            }}/>

            <TouchableOpacity style = {styles.searchButton} onPress = {() => {
                this.setState({isSearchPressed: true});
                this.getWord(this.state.text)
            }}><Text style = {{textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: "white"}}>Search</Text></TouchableOpacity>

            <View>
                <Text style = {{fontSize: 20, marginLeft: 50}}>
                    {
                        this.state.isSearchPressed && this.state.word === "Loading..."
                        ? this.state.word
                        :<Text> </Text>
                    }
                </Text>
                {
                    this.state.word !== "Loading..."?
                    <View>
                        <View>
                            <Text style = {styles.details1}>
                                Word: {" "}
                            </Text>
                            <Text style = {{fontSize: 20, marginLeft: 100, marginRight: 20, marginTop: -28}}>
                                {this.state.word}
                            </Text>
                        </View>

                        <View>
                            <Text style = {styles.details2}>
                                Type: {" "}
                            </Text>
                            <Text style = {{fontSize: 20, marginLeft: 100, marginRight: 20, marginTop: -28}}>
                                {this.state.lexicalCategory}
                            </Text>
                        </View>

                        <View>
                            <Text style = {styles.details3}>
                                Definition: {" "}
                            </Text>
                            <Text style = {{fontSize: 20, marginLeft: 20, marginRight: 20}}>
                                {this.state.definition}
                            </Text>
                        </View>
                    </View>
                    :<Text> </Text>
                }
            </View>
            </ScrollView>
        </View>
      );
    }
}

const styles = StyleSheet.create({

    inputBox: {
        marginTop: 80,
        width: '80%',
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        borderWidth: 4,
        borderStyle: 'dashed',
        justifyContent: 'center',
        backgroundColor: "lightpink",
        fontSize: 20,
        borderColor: "#5C0032"
    },

    searchButton: {
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        borderWidth: 3,
        borderRadius: 20,
        marginTop: 50,
        justifyContent: 'center',
        width: 150,
        height: 50,
        backgroundColor: "#E1449A",
        borderColor: "#5C0032"
    },

    details1: {
        marginTop: 30,
        color: "#DB017A",
        fontWeight: 'bold',
        justifyContent: 'center',
        fontSize: 20,
        marginLeft: 20,
        marginRight: 20
    },

    details2: {
        marginTop: 30,
        color: "#5C1C3F",
        fontWeight: 'bold',
        justifyContent: 'center',
        fontSize: 20,
        marginLeft: 20,
        marginRight: 20
    },

    details3: {
        marginTop: 30,
        color: "#A8005D",
        fontWeight: 'bold',
        justifyContent: 'center',
        fontSize: 20,
        marginLeft: 20,
        marginRight: 20
    },
    imageIcon:{
      width: 100,
      height: 100,
      alignSelf: 'center',
      marginTop: 30
    }
})