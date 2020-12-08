import { setStatusBarStyle, StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
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

export default function App() {
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
      console.log(state);
    })
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        onChangeText={text => setState(prevState => {
          return { ...prevState, s: text }
        })}
        onSubmitEditing={search}
        value={state.s}
        placeholder={"Enter a character..."} />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDE7DC'
  },
  searchBox: {
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '90%',
    borderBottomWidth: 1,
    marginBottom: 40,
    marginTop: 50
  },
  results: {
    flex: 1,
    width: '100%',
  },
  heading: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    padding: 20,
    backgroundColor: '#445565'
  },
  itemContainer: {
    backgroundColor: "#DCD2CC",
    borderTopLeftRadius:  20,
    borderBottomRightRadius:  20,
    height: 55,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginHorizontal: 5
  },
  visit: {
    margin: 4,
    paddingHorizontal: 6,
    textAlign: "center",
    color: '#746C70',
    fontSize: 22
  }
});
