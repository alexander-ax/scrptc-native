import * as React from 'react';
import { StyleSheet, View, StatusBar, ScrollView, ToastAndroid, Keyboard } from 'react-native'
import { Title, configureFonts, DefaultTheme, Provider as PaperProvider, Subheading, TextInput, Divider, Paragraph, Card, Button, ProgressBar, FAB, Headline, Caption } from 'react-native-paper';
import Header from './Header';
import LottieView from 'lottie-react-native'
import { Audio } from 'expo-av'
import * as Animatable from 'react-native-animatable';

export default function DictionaryScreen() {
    const [_viewToggler, _setViewToggler] = React.useState(true);
    const [_hasData, _setHasData] = React.useState(false);
    const [_isLoading, _setLoading] = React.useState(false);
    const [_word, _setWord] = React.useState("");
    const [_data, _setdata] = React.useState([]);
    const [_data_meaning, _setdata_meaning] = React.useState([]);
    const [_data_phonetic, _setdata_phonetic] = React.useState([]);
    const [_data_synonyms, _setdata_synonyms] = React.useState([]);
    const [_isPlaying, setPlaying] = React.useState(false);


    const GetData = () => {
        Keyboard.dismiss();
        _setLoading(true);
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${_word}`)
            .then((response) => response.json())
            .then((json) => {
                if (json.title == "No Definitions Found") {
                    _setViewToggler(true);
                    _setHasData(false)
                    _setLoading(false);
                    ToastAndroid.show("Looks like we don't have that. Try another word", ToastAndroid.SHORT)
                } else {
                    _setLoading(false);
                    _setHasData(true)
                    _setdata(json);
                    _setdata_phonetic(json[0].phonetics)
                    _setViewToggler(false);

                }
            }).catch(err => {
                _setHasData(false)
                _setLoading(false);
                ToastAndroid.show("Looks like we don't have that. Try another word", ToastAndroid.SHORT)
            })
    }

    const theme = {
        ...DefaultTheme,
        roundness: 10,
        colors: {
            ...DefaultTheme.colors,
            primary: '#89b0ae',
            accent: '#bee3db',
        },
    };

    const titleEntrance = {
        0: {
            opacity: 0,
            left: 10
        },
        1: {
            opacity: 1,
            left: 0
        }
    }
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
            bottom: -80
        },
        1: {
            opacity: 1,
            bottom: -60
        }
    }

    const LoadingAnim = () => {
        if (_isLoading) {
            return (
                <Animatable.View animation={cardEntrance} duration={500} easing="ease-out-expo">
                    <LottieView style={{ width: 200, height: 200 }} autoPlay loop source={require('../assets/lottie_bookLoading.json')} />
                    <Paragraph style={{ textAlign: 'center', marginTop: -50 }}>Searching</Paragraph>
                </Animatable.View>
            )
        }
    }
    const LoadSynonyms = e => {
        try {
            _data[0].meanings.map(e => {
                e.definitions[0].synonyms.map((word, index) => {
                    console.log(index, word)
                    return (
                        <View key={`p_${Math.ceil(Math.random() * 1000)}`}>
                            <Paragraph>{word}</Paragraph>

                        </View>
                    )
                })

            })
        } catch (error) {

        }
    }

    const RenderDisplay = () => {
        if (_hasData) {
            return (
                <Card style={{ padding: 20, margin: 10, marginTop: 0, }} >
                    <Animatable.View duration={500} animation={cardEntrance}>

                        <FAB
                            small
                            icon='close'
                            style={{ position: 'absolute', right: 0, zIndex: 3 }}
                            onPress={() => {
                                _setViewToggler(true);
                                _setWord("")
                            }} />
                        <Animatable.Text easing='ease-out-expo' style={{ marginBottom: 20 }} duration={500} animation={titleEntrance}>

                            <Headline >Search Result</Headline>
                        </Animatable.Text>

                        <Animatable.Text animation={titleEntrance} easing='ease-out-expo' duration={500}>
                            <Title>Word</Title>
                        </Animatable.Text>
                        <Paragraph style={{ marginLeft: 20 }}>{_data[0].word}</Paragraph>

                        <Divider style={{ margin: 10, marginVertical: 20 }} />

                        <Title>Phonetic</Title>
                        {
                            _data_phonetic.map((e, index) => {
                                return (
                                    <Animatable.View animation={titleEntrance} duration={500} delay={100 + (index * 300)} easing="ease-out-expo" key={`p_${Math.ceil(Math.random() * 1000)}`} style={{ marginLeft: 20, marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                                        <FAB icon='volume-high' small onPress={() => {
                                            PlayPhonetic(e.audio)
                                        }} />
                                        <Paragraph style={{ marginLeft: 10 }}>{e.text}</Paragraph>
                                    </Animatable.View>
                                )
                            })
                        }


                        <Divider style={{ margin: 10, marginVertical: 20 }} />

                        <Animatable.Text animation={titleEntrance} easing='ease-out-expo' duration={500}>
                            <Title>Definitions</Title>
                        </Animatable.Text>
                        {
                            _data[0].meanings.map((e, index) => {
                                return (
                                    <Animatable.View animation={titleEntrance} duration={500} delay={100 + (index * 300)} easing="ease-out-expo" key={`m_${Math.ceil(Math.random() * 1000)}`} style={{ marginLeft: 20, }}>
                                        <Caption style={{}}>{e.partOfSpeech.toUpperCase()}</Caption>
                                        <Paragraph style={{ marginLeft: 20 }}>{e.definitions[0].definition}</Paragraph>
                                        <Paragraph style={{ marginLeft: 40, color: '#5EC2F5' }}>{e.definitions[0].example}</Paragraph>
                                        <Divider style={{ margin: 10 }} />
                                    </Animatable.View>
                                )
                            })
                        }

                        <Animatable.Text animation={titleEntrance} easing='ease-out-expo' duration={500}>
                            <Title>Synonyms</Title>
                        </Animatable.Text>
                        {LoadSynonyms()}

                    </Animatable.View>
                </Card>
            )
        }
    }

    const SearchDisplay = () => {
        try {
            if (_viewToggler) {
                return (
                    <Animatable.View animation={cardEntrance} duration={500} easing="ease-out-expo" style={{ flex: 1, padding: 20 }}>
                        <Subheading>Use our on-point dictionary</Subheading>

                        <Divider style={{ marginVertical: 25 }} />

                        <TextInput
                            mode='outlined'
                            label='Search for a word'
                            value={_word}
                            clearTextOnFocus={true}
                            right={
                                <TextInput.Icon name='magnify' color='#89b0ae' onPress={GetData} />
                            }
                            onSubmitEditing={GetData}
                            onChangeText={e => { _setWord(e); }}
                        />

                        <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {LoadingAnim()}
                        </View>
                        {/* <ProgressBar indeterminate visible={_isLoading} style={{ margin: 20 }} /> */}

                    </Animatable.View>

                )
            } else {
                return (
                    <ScrollView style={{ marginTop: 10, marginBottom: 50 }}>
                        {RenderDisplay()}
                    </ScrollView>
                )

            }
        } catch {

        }

    }



    const PlayPhonetic = async (source) => {
        if (!_isPlaying) {
            let thissound = new Audio.Sound();
            try {
                ToastAndroid.show("Phonetic Loading", ToastAndroid.SHORT)
                setPlaying(true)
                await thissound.loadAsync(
                    { uri: source }
                );
                await thissound.playAsync();
                setPlaying(false)

            } catch (error) {
                console.log(error)
            }

        }
    }


    return (
        <PaperProvider theme={theme}>
            <Header title="Dictionary" color='#2C8395' />
            {SearchDisplay()}
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
                }} source={require('../assets/lottie_wave1.json')} autoPlay loop />

            </View>
            <Animatable.View animation={sunEntrance} duration={200} delay={200} easing='ease-out-expo' style={{ position: 'absolute', bottom: 0, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <LottieView style={{ height: 250, width: '100%', transform: [{ rotate: '-10deg' }] }} source={require('../assets/lottie_book.json')} autoPlay loop />
            </Animatable.View>
        </PaperProvider>
    )



}

const styles = StyleSheet.create({

})