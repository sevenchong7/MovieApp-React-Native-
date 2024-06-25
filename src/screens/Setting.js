import { Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {useTranslation} from 'react-i18next';
import { changeLanguage } from 'i18next';
import { useEffect, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from '@react-navigation/native';
import {theme} from '../Theme/Theme'
import colors from "../Theme/colors";



const Setting = () => {
    const {colors} = useTheme();
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState("");
    const [modal, setModal] = useState(false);

    useEffect(() => {
        // MemberApi()
        // console.log(i18n.language)
        setLanguage(i18n.language)
    }, [])

    const ChangeLanguage = (value) => {
        setTimeout(() => {
            i18n.changeLanguage(value)
        }, 100)
    }

    return (
        <SafeAreaView style={style.container}>
            <View style={style.container}>
                <View style={style.header}>  
                    <Text>
                        {t("welcome")}
                    </Text>
                    <TouchableOpacity onPress={()=>setModal(true)} style={style.langButton}>
                        {/* <Text style={style.langText}>
                            Change Language
                        </Text> */}

                        <Text style={[[{ textAlign: "right" , color: 'white',margin:10}]]}>
                            {language == "en" && "English"}
                            {language == "bm" && "Bahasa Malaysia"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal animationType='slide' transparent={true} visible={modal}>
                <View style={{flex:1,justifyContent:'flex-end', backgroundColor: "rgba(0,0,0,0.5)"}}>
                    <View style={{backgroundColor:'white'}}>
                        <View style={{flexDirection:'row-reverse',paddingRight:20,marginTop:10}}>
                            <TouchableOpacity onPress={ () => setModal(false) }>
                                <AntDesign name="close" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style = {{justifyContent:'center',alignItems:'center', marginBottom:30}}>
                            <TouchableOpacity style={[style.langButton, {backgroundColor: language =='en' ? colors.dark_grey : colors.primary}]} onPress={ () => { 
                                setLanguage("en"),
                                changeLanguage("en"),
                                setModal(false)
                             }}>
                                <Text style={style.langText}>English</Text>
                            </TouchableOpacity> 
                            <TouchableOpacity style={[style.langButton,{backgroundColor: language =='bm' ? colors.dark_grey : colors.primary}]} onPress={ () => {
                                setLanguage("bm"),
                                changeLanguage("bm"),
                                setModal(false)
                            }}>
                                <Text style={style.langText}>Bahasa Melayu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    
                </View>
            </Modal>
        </SafeAreaView>
        
        
    )
};

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    langButton:{
        borderRadius:10,
        backgroundColor: colors.primary,
        width: 200,
        alignItems:'center',
        justifyContent: 'center',
        margin: 10
    },
    langText:{
        fontSize: 20,
        fontWeight: '300',
        margin: 5,
        color: 'white'
    }

});

export default Setting;