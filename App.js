import * as React from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import LottieView from 'lottie-react-native'
import DictionaryScreen from './components/DictionaryScreen';
import GameScreen from './components/GameScreen';
import HomeScreen from './components/HomeScreen';
import WordOfTheDayScreen from './components/WordOfTheDayScreen';
import NewDictionaryScreen from './components/NewDictionaryScreen';

export default function MyComponent() {
  const [loading, setLoading] = React.useState(true)
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home', color: "#4A5F67" },
    { key: 'dictionary', title: 'Dictionary', icon: 'book-open-variant', color: "#2C8395", },
    { key: 'wordOfTheDay', title: 'Today\'s word', icon: 'white-balance-sunny', color: "#001F3D" },
    { key: 'games', title: 'Minigame', icon: 'gamepad-variant', color: "#1477B2" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    dictionary: DictionaryScreen,
    wordOfTheDay: WordOfTheDayScreen,
    games: GameScreen,
  });


  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      // shifting={true}
      sceneAnimationEnabled
      keyboardHidesNavigationBar={false}
      style={{ shadowColor: 'transparent' }}
    />

  )
};
