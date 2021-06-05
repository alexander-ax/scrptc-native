import * as React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native'
import { Provider as PaperProvider, Subheading, Paragraph, Title, Headline } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import Header from './Header';
import * as Animatable from 'react-native-animatable'


export default function WordOfTheDayScreen() {
    // const [_word, _setWord] = React.useState()
    // const [_meaning, _setMeaning] = React.useState()
    // React.useEffect(() => {
    //     fetch('https://random-words-api.vercel.app/word')
    //         .then(response => response.json())
    //         .then(data => {
    //             _setWord(data)
    //         })
    // }, [])

    // const DisplayData = async e => {
    //     _word.map(e => {
    //         return (
    //             <View style={{ width: '100%', marginTop: 50, justifyContent: 'center' }}>
    //                 <Title>{(e[0].word).toString()}</Title>
    //                 <Paragraph>{(e[0].definition).toString()}</Paragraph>
    //             </View>

    //         )
    //     })
    // }

    return (
        <PaperProvider >
            <View style={{ flex: 1, }}>
                <Header
                    color="#001F3D"
                    title="Word of the day" />

                {/* Body */}
                <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, paddingBottom: 140 }}>
                    <Headline style={{ opacity: 0.5 }}>We had this word for this time</Headline>
                    <DisplayData />
                </View>
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
                }} source={require('../assets/lottie_wave_3.json')} autoPlay loop />

            </View>
        </PaperProvider >
    )
}

const styles = StyleSheet.create({

})