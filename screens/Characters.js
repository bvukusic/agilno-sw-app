import { setStatusBarStyle, StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    searchBox: {
        fontSize: 20,
        fontWeight: '300',
        padding: 20,
        width: '70%',
        borderBottomWidth: 1,
        marginBottom: 40,
        marginTop: 160,
    },
    results: {
        flex: 1,
        width: '100%',
    },
    heading: {
        fontSize: 18,
        fontWeight: '700',
        padding: 20,
        backgroundColor: 'transparent'
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
        backgroundColor: 'rgba(255,255,255,0.4)'
    },
    visit: {
        margin: 4,
        paddingHorizontal: 6,
        textAlign: "center",
        color: '#111',
        fontSize: 22
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
});
