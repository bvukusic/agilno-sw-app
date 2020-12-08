'use strict';
var React = require('react-native');
import { StyleSheet } from 'react-native';

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
    tabsInner: {
      flexDirection: 'row', 
      justifyContent: 'center'
    },
    tabInner: {
      textTransform: 'uppercase', 
      fontSize: 44, 
      fontWeight: '700', 
      color: '#fff'
    },
    tabOuter: {
      paddingHorizontal: 6, 
      marginHorizontal: 4 
    }
});
  

export default styles;