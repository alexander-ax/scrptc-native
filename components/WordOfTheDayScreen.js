import * as React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native'
import { Provider as PaperProvider, Subheading, Paragraph, Title, Headline, Card } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable'


const cardEntrance = {
    0: {
        opacity: 0,
        top: 20
    },
    1: {
        opacity: 1,
        top: 0
    }
}
const sunEntrance = {
    0: {
        opacity: 0,
        bottom: -20
    },
    1: {
        opacity: 1,
        bottom: 0
    }
}

export default function WordOfTheDayScreen() {
    const [randomWord, setRandomWord] = React.useState()
    const [getDefinition, setDefinition] = React.useState()
    const [isViable, setViable] = React.useState(false)
    const [thisDate, setDate] = React.useState(new Date().getDate())
    const [thisData, setData] = React.useState([])
    const [savedWord, setsavedword] = React.useState("")
    const [savedDef, setsaveddef] = React.useState("")

    React.useEffect(() => {
        if (!isViable) {
            fetch("https://random-words-api.vercel.app/word")
                .then(res => res.json())
                .then(data => {
                    setData(data)
                    console.log(thisDate)
                        (async e => {
                            let getDate = await AsyncStorage.getItem('@Date')
                            let getWord = await AsyncStorage.getItem('@Word')
                            let getDef = await AsyncStorage.getItem('@Definition')

                            if (!getWord || !getDef || getDate != thisDate) {
                                AsyncStorage.setItem("@Date", thisDate.toString())
                                AsyncStorage.setItem("@Word", thisData[0].word)
                                AsyncStorage.setItem("@Definition", thisData[0].definition)
                            }
                        })

                    setViable(true)
                })
                .catch(err => {
                    (async e => {
                        let getWord = await AsyncStorage.getItem('@Word')
                        let getDef = await AsyncStorage.getItem('@Definition')

                        setsavedword(getWord)
                        setsaveddef(getDef)
                    })()
                    setRandomWord(savedWord)
                    setDefinition(savedDef)
                    setViable(true)
                })
        }
        (async function () {
            let getWord = await AsyncStorage.getItem('@Word')
            let getDef = await AsyncStorage.getItem('@Definition')
            // console.log(getWord)
            setRandomWord(getWord)
            setDefinition(getDef)


        })()
    })


    const DisplayData = e => {


        return (
            <View style={{ alignContent: 'center' }}>
                <Card style={{ padding: 15, margin: 10, alignContent: 'center' }}>
                    <Title style={{ marginBottom: 10 }}>{randomWord}</Title>
                    <Paragraph>{getDefinition}</Paragraph>
                </Card>
            </View>
        )
    }

    return (
        <PaperProvider>
            <View style={{ flex: 1, height: '100%', }}>
                <Header
                    color="#001F3D"
                    title="Word of the day" />

                {/* Body */}
                <Animatable.View animation={cardEntrance} duration={200} style={{ marginTop: '50%', paddingHorizontal: 20, paddingBottom: 140, justifyContent: 'center' }}>

                    <Headline style={{ opacity: 0.5 }}>We had this word for this time</Headline>
                    <DisplayData />
                </Animatable.View>
            </View>

            <View style={{
                position: 'absolute',
                width: '110%',
                bottom: -10,
                left: -15,
                zIndex: 2,
                transform: [{ rotateZ: '180deg' }],
            }}>
                <LottieView style={{
                    width: '100%',
                }} source={require('../assets/lottie_wave_3.json')} autoPlay loop />

            </View>
            <Animatable.View animation={sunEntrance} duration={200} delay={200} style={{ position: 'absolute', bottom: 0, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <LottieView style={{ height: 150, width: '100%', }} source={require('../assets/lottie_wordOfTheDay.json')} autoPlay loop />
            </Animatable.View>
        </PaperProvider >
    )
}

const styles = StyleSheet.create({

})