'use strict';
var React = require('react-native');
import { StyleSheet } from 'react-native';

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

export default styles;