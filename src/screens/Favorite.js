import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addFavorites, getMovies, removeFavorite } from "../store/actions/MoviesActions";
import { useEffect } from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';



const Favorites = () => {

    const { favorites } = useSelector( state => state.moviesReducer );
    const { movies } = useSelector(state => state.moviesReducer);
    const addToFavorites = movies => dispatch(addFavorites(movies));
    const removeFromFavorites = movies => dispatch(removeFavorite(movies));
    const handleAddFavorites = movies => {
        addToFavorites(movies);
    };
    const handleRemoveFavorites = movies => {
        removeFromFavorites(movies);
    };

    const dispatch = useDispatch();
    const fetchMovies = () => dispatch(getMovies());

    useEffect(() => {
        fetchMovies();
    },[]);

    const exists = movies => {
        if( favorites.filter(item => item.id === movies.id).length > 0 ){
            return true;
        }else{
            return false;
        }
    };


   

    return (
        <View style={{ flex: 1, marginTop: 15, paddingHorizontal: 20}}>
            <Text style={{ fontSize:22 }}>
                Favorites Movies
            </Text>
            <View>
                <FlatList 
                data={ favorites }
                keyExtractor={ item => item.id }
                renderItem={({ item }) => {
                    // console.log('item',item);
                    // const IMAGE_URL = ''
                    return (
                        <View style={style.movieListContainer}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{ flex:1 }}>
                                    <Text style={style.title}>
                                        {item.title}
                                    </Text>
                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                        <Text style={style.subtitle}> 
                                            Rating : { item.vote_average }
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection:'row', alignItems:'center', marginTop:10}}>
                                        <AntDesign name="like1" size={40} color="green" />
                                        <Text style={style.likeText}>  
                                            { item.vote_count }
                                        </Text>
                                        <TouchableOpacity onPress={() => exists(item) ? handleRemoveFavorites(item) : handleAddFavorites(item) }>
                                            <MaterialIcons name={ exists(item) ? 'favorite' : 'favorite-border'} size={40} color={'orange'} style={{marginLeft:'5%'}}/>
                                        </TouchableOpacity>
                                    </View>
                                    
                                </View>
                                <View>
                                        {item.adult == true ? <MaterialIcons name="18-up-rating" size={50} color={'red'} /> : null }
                                </View>
                            </View>
                        </View>
                    );
                    
                
                }}
                />

                
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    movieListContainer:{
        marginTop: 20,
    },
    title:{
        fontSize:20,
        fontWeight:'black'
    },
    subtitle:{
        fontSize: 16,
        marginTop: 5,
        fontWeight:'400'
    },
    likeText:{
        fontSize: 24,
        fontWeight: '200'
    }
})

export default Favorites;