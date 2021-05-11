import React,{useEffect} from "react"
import {Text,View} from "react-native"

const SplashScreen = ({navigation}) => {

    setTimeout(()=>{
        navigation.navigate("Main")
    },2000)
    return(
        <>
        <View style={{flex: 1,justifyContent:"center",alignItems: "center"}}>
        <Text style={{color:"#6C6C6C",fontSize:24,fontWeight:"bold"}}>pic
                    <Text style={{color:"grey"}}>a</Text>
                        <Text style={{color:"#5ddea6"}}>day</Text>
                </Text>
                </View>
        </>
    )
}

export default SplashScreen