import * as React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native'
import { Title, configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Header from './Header';

export default function WordOfTheDayScreen() {
    return (
        <PaperProvider >
            <View style={{ flex: 1, }}>
                <Header
                    color="#001F3D"
                    title="Word of the day" />

            </View>
        </PaperProvider >
    )
}

const styles = StyleSheet.create({

})