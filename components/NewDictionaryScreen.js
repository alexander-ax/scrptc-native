import * as React from 'react';
import { Animated, Dimensions, Easing, View } from 'react-native'
import Header from './Header';
import LottieView from 'lottie-react-native'
import { Divider, Paragraph, Subheading, TextInput, Provider as PaperProvider, DefaultTheme, Button, FAB } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const ActiveScreen = React.createContext(false)

const theme = {
    ...DefaultTheme,
    roundess: 10,
    colors: {
        ...DefaultTheme.colors,
        primary: '#89b0ae',
        accent: '#bee3db',
    },
}

const SearchDisplay = () => {
    return (
        <Animatable.View
            animation={{
                0: {
                    opacity: 0,
                    top: 10
                },
                1: {
                    opacity: 1,
                    top: 0
                },
            }}
            transition=''
            duration={500}
            easing="ease-out-expo"
            style={{ width: '50%' }}
        >
            <View style={[
                {
                    width: '100%',
                    height: '100%',
                    paddingHorizontal: 20,
                    marginTop: 20,
                }
            ]}>

                <Subheading>Use our on-point dictionary</Subheading>
                <Divider style={{ marginVertical: 15 }} />

                <TextInput
                    mode='outlined'
                    label='Search for a word'
                />
                <Button style={{
                    width: '100%',
                    top: global.active ? 30 : 0
                }} mode='outlined' onPress={() => { ActiveScreen ? false : true; }}>Search for the word</Button>
            </View>

        </Animatable.View>
    )
}
const ResultDisplay = () => {
    return (
        <Animatable.View
            animation={{
                0: {
                    opacity: 0,
                    top: 10
                },
                1: {
                    opacity: 1,
                    top: 0
                },
            }}
            duration={500}
            easing="ease-out-expo"
            style={{ width: '50%' }}
        >
            <View style={[
                {
                    width: '100%',
                    height: '100%',
                    paddingHorizontal: 20,
                    marginTop: 20,
                }
            ]}>

                <Subheading>Result</Subheading>
                <Divider style={{ marginVertical: 15 }} />

                <TextInput
                    mode='outlined'
                    label='Search for a word'
                />

                <Button style={{
                    width: '100%',
                }} mode='outlined' onPress={() => dictionaryActive ? true : false}>Search for the word</Button>
            </View>

        </Animatable.View>
    )
}




export default function NewDictionaryScreen() {

    return (

        <PaperProvider theme={theme} >
            <Header title="Dictionary" color='#2C8395' />
            <View style={{
                height: '100%',
                width: Dimensions.get('window').width * 2,
                paddingBottom: 100,
                flex: 1,
                left: ActiveScreen ? 0 : 0 - Dimensions.get('window').width,
                flexDirection: 'row',
                alignItems: 'center',
            }}>

                <SearchDisplay />
                <ResultDisplay />

            </View>

            <View style={{
                position: 'absolute',
                width: '101%',
                bottom: -5,
                left: 0,
                transform: [{ rotateZ: '180deg' }],
            }}>
                <LottieView style={{
                    width: '100%',
                }} source={require('../assets/lottie_wave1.json')} autoPlay loop />

            </View>
        </PaperProvider>
    )
}