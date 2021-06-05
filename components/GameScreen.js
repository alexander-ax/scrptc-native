import * as React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native'
import { Title, configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import Header from './Header';

export default function GameScreen() {

    const checkForAccount = () => {

    }

    return (
        <PaperProvider >
            <View style={{ flex: 1, }}>
                <Header title="Minigame" color='#1477B2' />
            </View>

            <View style={{
                position: 'absolute',
                width: '110%',
                bottom: -10,
                left: -15,
                transform: [{ rotateZ: '180deg' }],
            }}>
                <LottieView style={{
                    width: '100%',
                }} source={require('../assets/lottie_wave_4.json')} autoPlay loop />

            </View>
        </PaperProvider >
    )
}

const styles = StyleSheet.create({

})