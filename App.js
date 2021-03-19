import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "./src/Home";
import ResultScreen from "./src/Result";
import DetailsScreen from "./src/Details";
import { DataProvider } from './src/DataContext'


const Stack = createStackNavigator();

const App = () => {
  const [data, setData] = useState([]);
  return (
  <DataProvider value={{data, setData}}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  </DataProvider>
  )
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
