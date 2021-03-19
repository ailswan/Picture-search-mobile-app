import React, {useState, useEffect, useContext}from 'react';
import {View, StyleSheet, Text, StatusBar, TextInput, Button } from 'react-native';
import DataContext from './DataContext';



const HomeScreen = ({ navigation }) => {
    const [text, setText] = useState('');

    const { data, setData } = useContext(DataContext);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontSize: 18}}>Welcome to picture search</Text>
        <TextInput
            style={styles.searchbar}
            placeholder="Type here to Search"
            onChangeText={text => setText(text)}
            defaultValue={text}
          />
          <Button
            title="Go"
            onPress={() => {
              setData([]);
              navigation.navigate('Result', { searchText: text });
              setText('');
            }}
          />
      </View>
    );
  }

  export default HomeScreen;

  const styles = StyleSheet.create({
    searchbar : {
      height: 40,
      width: 220,
      marginTop: 6,
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 2,
    }
  })