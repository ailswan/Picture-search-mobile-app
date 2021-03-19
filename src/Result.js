import React, {useState, useEffect, useContext, useRef}from 'react';
import { TouchableOpacity, View, FlatList, StyleSheet, Text, StatusBar, ImageBackground, Dimensions} from 'react-native';
import DataContext from './DataContext';
import Constants from 'expo-constants';

const Item = ({ title, image, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.item}>
            <ImageBackground source={{uri: image}} style={styles.image}>
            </ImageBackground>
        </View>
    </TouchableOpacity>
);


const ResultScreen = ({navigation, route}) => {
    const { data, setData } = useContext(DataContext);
    const [curpage, setCurpage ] = useState(1);
    const [searchText, setSearchText ] = useState(route.params.searchText);
    const [refresh, setRefresh] = useState(false);
    let Flatlist =  useRef();

    useEffect(() => {
        //console.log("init load");
    }, []);

    useEffect(() => {
        //console.log("every load");
        
        if (route.params.searchText !== searchText) {
            Flatlist.current.scrollToOffset({ animated: false, offset: 0 });
            setSearchText(route.params.searchText);
            setCurpage(1);
        }
    });

    useEffect(() => {
        //console.log('more page');
        loadData();
    }, [curpage, searchText]);

    // use the api 
    const loadData = () => {
        const apiKey = Constants.manifest.extra.API_KEY;
        const page  = curpage;
        const encodedSearchText = searchText;
        const query = `key=${apiKey}&q=${encodedSearchText}&page=${page}`;
        const prefix = 'https://cors-anywhere.herokuapp.com/'; // no need in ios 
        fetch('https://pixabay.com/api/?' + query, {
            method: 'GET',
            // mode: 'no-cors', // no-cors,
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
        })
        .then((resp) => resp.json())
        .then((json) => {
            // console.log(json);
            let newdata = [];
            json.hits.forEach(hit => {
                //console.log(hit);
                newdata.push({
                    id: hit.id.toString(),
                    previewUrl: hit.previewURL,
                    imageUrl: hit.largeImageURL,
                    author: hit.user,
                    tags: hit.tags
                })
            });
            // setClientData(data);
            if (curpage === 1){
                setData(newdata);
            } else{
                setData([...data, ...newdata]);
            }

        })
        .catch((error) => {
            console.error(error);
        });   
    }
    

    const renderItem = ({ item: element }) => (
        <Item key={element.id} title={element.title} image={element.previewUrl} onPress={() => {
            navigation.navigate('Details', element);
        }} />
    );

    
        
    let onEndReachedCalledDuringMomentum = true;

    return (
        <View style={styles.container}>
            <FlatList
                ref={Flatlist}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                onEndReachedThreshold={0.5}
                onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum = false; }}
                onEndReached={(distanceFromEnd) => {
                    if(!onEndReachedCalledDuringMomentum){
                        
                        setCurpage(curpage+1)
                        onEndReachedCalledDuringMomentum = true;
                    }
                } }
                //onEndReachedThreshold={0.5}
            />
        </View>
    );
};

const win = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        flex: 1,
      backgroundColor: 'green',
      marginVertical: 8,
      marginHorizontal: 16,
      height:200
    },
    title: {
      fontSize: 32,
    },
    image: {
        flex: 1,
        resizeMode: "contain",
        justifyContent: "center",
    },
  });
  

export default ResultScreen;