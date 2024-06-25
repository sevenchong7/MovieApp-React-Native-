import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";


const Setting = () => {
    const user = useSelector(state => state.authReducer.user)
    console.log(user)
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>
                Welcome { user.username }
            </Text>
        </View>
    )
}

export default Setting;