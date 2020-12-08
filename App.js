import { setStatusBarStyle, StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Animated, Dimensions, Image, findNodeHandle } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Characters from './screens/Characters';
import Movies from './screens/Movies';

const { width, height } = Dimensions.get('screen');

const images = {
  characters:
    'https://i.imgur.com/E814sBN.jpg',
  movies:
    'https://i.imgur.com/0zNKjMh.jpg',
};

const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef()
}));

//Move to its own component
const Indicator = React.memo(({ data, measures, scrollX }) => {
  const inputRange = data.map((_, index) => (index * width));
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: data.map((_, index) => measures[index]?.x || 0)
  });
  const itemWidth = scrollX.interpolate({
    inputRange,
    outputRange: data.map((_, index) => measures[index]?.width || 0)
  });

  return <Animated.View style={{ height: 3, width: itemWidth, backgroundColor: '#fff', zIndex: 999, position: 'absolute', bottom: -6, transform: [{ translateX: translateX }] }} />
})

//Move to its own component
const Tab = React.forwardRef(({ item }, ref) => {
  return <View style={ styles.tabOuter } ref={ref}>
    <Text style={{ textTransform: 'uppercase', fontSize: 44 / data.length, fontWeight: '700', color: '#fff' }}>{item.title}</Text>
  </View>
})

//Move to its own component
const Tabs = ({ data, scrollX }) => {
  const [measures, setMeasures] = React.useState([])
  const tabContainerRef = React.useRef();

  React.useEffect(() => {
    let measures = [];
    data.forEach((item, index) => {
      item.ref.current.measureLayout(findNodeHandle(tabContainerRef.current), (x, y, width, height) => {
        measures.push({ x,y,width,height})
        // Last item was measured. Set the state with all measures
        if (measures.length === data.length) {
          setMeasures(measures);
        }
      })
    })
  }, [])

  return <View style={ styles.tabsOuter }>
    <View style={styles.tabsInner} ref={tabContainerRef}>
      {data.map((item, index) => {
        return <Tab key={item.key} item={item} ref={item.ref} />
      })}
    </View>
    {measures.length === data.length && <Indicator measures={measures} data={data} scrollX={scrollX} />}
  </View>
}

export default function App() {
  const scrollX = React.useRef(new Animated.Value(9)).current;
  
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        data={data}
        keyExtractor={item => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        bounces={false}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={{ width, height }}>
            <Image
              source={{ uri: item.image }}
              style={{ flex: 1, resizeMode: 'cover' }}
            />
            <View style={styles.listsContainer}>
              {(item.title == 'movies') ? <Movies /> : <Characters />}
            </View>
            <View style={[StyleSheet.absoluteFillObject, styles.darken]} />
          </View>
        )}
      />
      <Tabs scrollX={scrollX} data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listsContainer: {
    height: '100%',
    zIndex: 998,
    backgroundColor: 'rgba(1,1,1,0)'
  },
  darken: {
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  tabsOuter: {
    justifyContent: 'center', 
    position: 'absolute', 
    top: 100, width, 
    left: 0 
  },
  tabsInner: {
    flexDirection: 'row', 
    justifyContent: 'center'
  },
  tabInner: {

  },
  tabOuter: {
    paddingHorizontal: 6, 
    marginHorizontal: 4 
  }
});
