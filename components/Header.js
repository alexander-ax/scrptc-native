import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Title } from 'react-native-paper';

export default function Header(props) {
    return (
        <View style={[styles.header, { backgroundColor: props.color }]}>
            <Title style={{ color: '#fff' }}> {props.title} </Title>
        </View>
    );

};
const styles = StyleSheet.create({
    header: {
        height: 50,
        width: '100%',
        marginTop: StatusBar.currentHeight,
        backgroundColor: '#AFCCCB',
        justifyContent: 'center',
        paddingHorizontal: 10
    }
})