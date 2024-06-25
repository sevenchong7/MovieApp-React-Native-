import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/AuthAction";

const Logout = ({navigation}) => {
    const dispatch = useDispatch();

    const checklogout = () =>  {
        dispatch(logout());
        navigation.navigate('Movies')
    }
    const user = useSelector(state => state.authReducer.user)

    console.log(user)

    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
           <TouchableOpacity onPress={ () => checklogout() } style={{ borderRadius:10,borderWidth:1,width:200, justifyContent:'center',alignItems:'center',backgroundColor:'blue'}}>
            <Text style={{margin:10,fontSize:20,color:'white'}}>
                LOGOUT
            </Text>
           </TouchableOpacity>
        </View>
    )
};



export default Logout;