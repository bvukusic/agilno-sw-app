import React from 'react';
import { setStatusBarStyle, StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { useState } from 'react';
import axios from 'axios';

const Item = ({ title }) => (
    <TouchableOpacity onPress={() => { }}>
        <View style={styles.itemContainer}>
            <Text style={styles.visit}>{title}</Text>
        </View>
    </TouchableOpacity >
);

export default function Movies() {
    const apiUrl = "http://swapi.dev/api/films/?format=json"
    const [state, setState] = useState({
        s: "",
        results: [],
        selected: {}
    });

    const renderItem = ({ item }) => (
        <Item title={item.title} />
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
            source={require('../moviesBk.jpg')}>
            <View style={styles.container}>
                <TextInput
                    style={styles.searchBox}
                    onChangeText={text => setState(prevState => {
                        return { ...prevState, s: text }
                    })}
                    onSubmitEditing={search}
                    value={state.s}
                    placeholder={"Enter a title..."} 
                    placeholderTextColor="black"/>

                <FlatList
                    style={styles.results}
                    data={state.results}
                    keyExtractor={(item) => item.episode_id}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    keyboardShouldPersistTaps='always'
                    contentContainerStyle={{ justifyContent: 'center', }}
                />
                <StatusBar style="auto" />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    searchBox: {
        fontSize: 20,
        fontWeight: '300',
        padding: 20,
        width: '70%',
        borderBottomWidth: 1,
        marginBottom: 40,
        marginTop: 160,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 30
    },
    results: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(1,1,1,0)'
    },
    heading: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
        padding: 20,
        backgroundColor: 'rgba(1,1,1,0)'
    },
    itemContainer: {
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        height: 55,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        marginHorizontal: 25,
        backgroundColor: 'rgba(255,255,255,0.7)'

    },
    visit: {
        margin: 4,
        paddingHorizontal: 6,
        textAlign: "center",
        color: '#111',
        fontSize: 22,
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
});
