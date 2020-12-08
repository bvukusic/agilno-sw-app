import { setStatusBarStyle, StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CharactersStyles';


const Item = ({ title }) => (
    <TouchableOpacity onPress={() => { }}>
        <View style={styles.itemContainer}>
            <Text style={styles.visit}>{title}</Text>
        </View>
    </TouchableOpacity >
);

export default function Characters() {
    const apiUrl = "http://swapi.dev/api/people/?format=json"
    const [state, setState] = useState({
        s: "",
        results: [],
        selected: {}
    });

    React.useEffect(() => {
        search();
      }, []);

    const renderItem = ({ item }) => (
        <Item title={item.name} />
    );

    const search = () => {
        axios(apiUrl + "&search=" + state.s).then(({ data }) => {
            let results = data.results;
            setState(prevState => {
                return { ...prevState, results: results }
            })
        })
    }

    return (
        <ImageBackground style={styles.imgBackground}
            resizeMode='cover'
            source={require('../characterBk.jpg')}>
            <View style={styles.container}>
                <TextInput
                    style={styles.searchBox}
                    onChangeText={text => setState(prevState => {
                        return { ...prevState, s: text }
                    })}
                    onSubmitEditing={search}
                    value={state.s}
                    placeholder={"Enter a character..."} 
                    placeholderTextColor="black"/>
                <FlatList
                    style={styles.results}
                    data={state.results}
                    keyExtractor={(item) => item.name}
                    // showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    keyboardShouldPersistTaps='always'
                    contentContainerStyle={{ justifyContent: 'center', }}
                />
                <StatusBar style="auto" />
            </View>
        </ImageBackground>
    );
}
