import * as React from 'react';
import { StyleSheet, View, StatusBar, ScrollView, ToastAndroid, Keyboard, Animated } from 'react-native'
import { Title, configureFonts, DefaultTheme, Provider as PaperProvider, Subheading, TextInput, Divider, Paragraph, Card, Button, ProgressBar, FAB, Headline, Caption } from 'react-native-paper';
import Header from './Header';
import LottieView from 'lottie-react-native'
import { Audio } from 'expo-av'

export default function DictionaryScreen() {
    const [_viewToggler, _setViewToggler] = React.useState(true);
    const [_hasData, _setHasData] = React.useState(false);
    const [_isLoading, _setLoading] = React.useState(false);
    const [_word, _setWord] = React.useState("");
    const [_data, _setdata] = React.useState([]);
    const [_data_meaning, _setdata_meaning] = React.useState([]);
    const [_data_phonetic, _setdata_phonetic] = React.useState([]);
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

    const LoadingAnim = () => {
        if (_isLoading) {
            return (
                <View>
                    <LottieView style={{ width: 200, height: 200 }} autoPlay loop source={require('../assets/lottie_bookLoading.json')} />
                    <Paragraph style={{ textAlign: 'center', marginTop: -50 }}>Searching</Paragraph>
                </View>
            )
        }
    }

    const RenderDisplay = () => {


        if (_hasData) {
            return (
                <Card style={{ padding: 20, margin: 10, marginTop: 0 }} >
                    <FAB
                        small
                        icon='close'
                        style={{ position: 'absolute', right: 0, zIndex: 3 }}
                        onPress={() => {
                            _setViewToggler(true);
                            _setWord("")
                        }} />
                    <Headline style={{ marginBottom: 20 }}>Search Result</Headline>

                    <Title>Word</Title>
                    <Paragraph style={{ marginLeft: 20 }}>{_data[0].word}</Paragraph>

                    <Divider style={{ margin: 10, marginVertical: 20 }} />

                    <Title>Phonetic</Title>
                    {
                        _data_phonetic.map((e) => {
                            return (
                                <View key={`p_${Math.ceil(Math.random() * 1000)}`} style={{ marginLeft: 20, marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                                    <FAB icon='volume-high' small onPress={() => {
                                        PlayPhonetic(e.audio)
                                    }} />
                                    <Paragraph style={{ marginLeft: 10 }}>{e.text}</Paragraph>
                                </View>
                            )
                        })
                    }


                    <Divider style={{ margin: 10, marginVertical: 20 }} />

                    <Title>Definitions</Title>
                    {
                        _data[0].meanings.map((e) => {
                            return (
                                <View key={`m_${Math.ceil(Math.random() * 1000)}`} style={{ marginLeft: 20, }}>
                                    <Caption style={{}}>{e.partOfSpeech.toUpperCase()}</Caption>
                                    <Paragraph style={{ marginLeft: 20 }}>{e.definitions[0].definition}</Paragraph>
                                    <Paragraph style={{ marginLeft: 40, color: '#5EC2F5' }}>{e.definitions[0].example}</Paragraph>
                                    <Divider style={{ margin: 10 }} />
                                </View>
                            )
                        })
                    }

                    <Title>Synonyms</Title>

                </Card>
            )
        }
    }

    const SearchDisplay = () => {
        try {
            if (_viewToggler) {
                return (
                    <View style={{ flex: 1, padding: 20 }}>
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

                    </View>

                )
            } else {
                return (
                    <ScrollView style={{ marginTop: 10, }}>
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
                ToastAndroid.show("Phonetic Playing", ToastAndroid.SHORT)
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
        </PaperProvider>
    )



}

const styles = StyleSheet.create({

})