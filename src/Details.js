import React, {useState, useEffect, useContext }from 'react';
import { Image, View, Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import DataContext from './DataContext';


const DetailsScreen = ({navigation, route}) => {
    const { data, setData } = useContext(DataContext);
    const [tags, setTags] = useState([]);

    const imageUrl = route.params.imageUrl;
    const author = route.params.author;


    useEffect(() => {
        const tags = route.params.tags;
        const tagArr = tags.split(',');
        setTags(tagArr.map(tag => tag.trim()));

    }, [])

    const win = Dimensions.get('window');

    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View style={{flex: 3}}>
            <Image style={{width: win.width, height: win.width}} 
                source={{uri: imageUrl}} resizeMode="contain"/>
            </View>
        <View style={{flex: 1}}>
            <Text style={{ margintop: 10, marginLeft: 15, color: '#002f6c',fontSize: 20}}>Author: {author}</Text>
            <Text style={{ marginLeft: 15, color: '#64b5f6',fontSize: 20}}>Tags: </Text>
            <View style={styles.tags}>{(
                tags.map(( tag, idx) => {
                    return (
                    <TouchableOpacity key={idx.toString()} onPress={() => {
                        setData([]);
                        navigation.navigate('Result', {searchText: tag, refresh: true});}}>
                        <Text key ={idx.toString()} style={styles.tag}>{tag}</Text>
                    </TouchableOpacity>
                    )}
                )
            )}</View>
        </View>
      </View>
    );
}

export default DetailsScreen;

const styles = StyleSheet.create({
    tags: {
        flexDirection: 'row',
    },
    tag: {
        backgroundColor: '#64b5f6',
        marginTop: 15,
        marginHorizontal: 15,
        padding: 8,
        color: 'white',
        fontSize: 20,
    }
});