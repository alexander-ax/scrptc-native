import * as React from 'react';
import { StyleSheet, View, StatusBar, Image, ScrollView } from 'react-native'
import {
    Title,
    configureFonts,
    DefaultTheme,
    Button,
    Provider as PaperProvider,
    Paragraph,
    FAB,
    Portal,
    Dialog,
    Subheading,
    Card,
    Headline,
} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

export default function HomeScreen() {
    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#4A5F67',
            accent: '#4A5F67',
        },
    };
    const [dialogVisible, setVisible] = React.useState(false)
    const showDialog = () => setVisible(true)
    const dismissDialog = () => setVisible(false)

    const Tab = createMaterialTopTabNavigator()

    const HomeTab = () => {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
            }}>
                <FAB
                    style={styles.aboutus}
                    icon='information'
                    small
                    onPress={showDialog}>About Us</FAB>

                <View >
                    <Headline style={{
                        textAlign: 'center'
                    }}>SCRPTC</Headline>
                    <Paragraph style={{
                        textAlign: 'center'
                    }}>The on-point dictionary app</Paragraph>

                </View>
                <LottieView source={require('../assets/lottie_reading.json')} autoPlay loop />


                <Paragraph style={{ textAlign: 'center' }}>Cycle through our app using the navigation bar below</Paragraph>


                {/* portal for dialogs */}
                <Portal>
                    <Dialog visible={dialogVisible} onDismiss={dismissDialog} >
                        <Dialog.Title>About Us</Dialog.Title>
                        <Dialog.Content>
                            <Subheading>Who did this?</Subheading>
                            <Paragraph style={{ fontSize: 12 }}>SCRPTC is created by Group 1 on the course: Application Development and Emerging Technologies</Paragraph>
                            <Paragraph style={{ fontSize: 12, marginTop: 20 }}>
                                Any content presented here are for the completion of the requirement to the course.
                                It is not intended to be distibuted commercially and raise profit for all the activity
                                interacted from the user and the developer
                        </Paragraph>

                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => { }}>Concerns and Report</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        )
    }

    const FavoritesTab = () => {
        return (
            <View style={{ padding: 10 }}>
                <Headline>Your favorite words</Headline>
                <Card style={{ padding: 20, marginTop: 10 }}>
                    <Title style={{ marginBottom: 10 }}>It's empty for now</Title>
                    <Paragraph>Nothingness not being nothing, nothingness being emptiness. - Isabelle Adjani</Paragraph>

                </Card>
            </View>
        )
    }

    return (
        <PaperProvider theme={theme} >
            <View style={{ marginTop: StatusBar.currentHeight }} />
            <NavigationContainer

                tabBarOptions={{
                    activeTintColor: '#4A5F67',
                    inactiveTintColor: '#4A5F67',
                }}>
                <Tab.Navigator >
                    {/* <Tab.Screen name="Dashboard" component={FavoritesTab} /> */}
                    <Tab.Screen name="Home" component={HomeTab} />
                    <Tab.Screen name="Favorites" component={FavoritesTab} />
                </Tab.Navigator>

            </NavigationContainer>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    aboutus: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 3
    }
})
