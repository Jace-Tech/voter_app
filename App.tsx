import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import { IRootStackParamList } from './src/@types/common';
import HomeScreen from './src/screens/HomeScreen';
import GlobalContextProvider from './src/contexts/GlobalContext';
import CategoryScreen from './src/screens/CategoryScreen';
import ElectionScreen from './src/screens/ElectionScreen';
import Toast from "react-native-toast-message"

export default function App() {
  const { Navigator, Screen } = createNativeStackNavigator<IRootStackParamList>()
  type ScreenArrayType = {
    name: keyof IRootStackParamList;
    component: React.FC;
    options: NativeStackNavigationOptions
  }
  const ScreensArray: ScreenArrayType[] = [
    {
      name: "Landing",
      component: SplashScreen,
      options: {
        animation: "fade",
        headerShown: false
      }
    },
    {
      name: "Category",
      component: CategoryScreen,
      options: {
        animation: "fade",
        headerShown: false
      }
    },
    {
      name: "Home",
      component: HomeScreen,
      options: {
        animation: "fade",
        headerShown: false
      }
    },
    {
      name: "Election",
      component: ElectionScreen,
      options: {
        animation: "fade",
        headerShown: false
      }
    },
  ]

  return (
    <GlobalContextProvider>
      <NavigationContainer>
        <StatusBar style='auto' />
        <Navigator initialRouteName='Landing'>
          { ScreensArray.map((screen) => (
            <Screen
              key={screen.name}
              {...screen}
            />
          )) }
        </Navigator>
      </NavigationContainer>
    </GlobalContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
