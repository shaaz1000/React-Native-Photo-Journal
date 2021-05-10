import React from "react";
import {Text,View,StyleSheet, StatusBar, SafeAreaView, ImageBackground,Dimensions,TouchableOpacity,Image} from "react-native"
import { Appbar ,IconButton} from 'react-native-paper';
import moment from "moment"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const ConfirmImageScreen = ({route,navigation}) => {
    //console.log(route,"aila")
    const {image} = route.params
    const date = moment().format('D MMMM YYYY')
    
    const newDate = date.split(" ")
   
    return(
        <>
        <StatusBar backgroundColor="white" barStyle="dark-content"/>
        
        <Appbar.Header style={{backgroundColor:"white",height:50}}>
        <Appbar.Action icon="chevron-left" onPress={() => {}} style={{right:10}} />
        
        <Appbar.Content
            style={{right:15}}
            title={
                <Text style={{color:"#6C6C6C",fontSize:24,fontWeight:"400",}}>pic
                    <Text style={{color:"grey"}}>a</Text>
                        <Text style={{color:"#5ddea6"}}>day</Text>
                </Text>
            }  titleStyle={{alignSelf:"center"}}/>
        </Appbar.Header>
        <SafeAreaView style={{flex:1}}>
        <ImageBackground
            source={{uri:image.path}}
            style={{width:"100%",height:200}}
        >
            <Text style={{marginLeft:10,color:"white",fontSize:16,fontWeight:"bold",marginTop:10}}>{newDate[1]}</Text>
            <Text style={{marginLeft:10,color:"white",fontSize:16,fontWeight:"bold",marginTop:2}}>{newDate[0]}</Text>
            <View style={{flexDirection:"row",top:"33%",justifyContent:"space-between"}}>
                <View style={{flexDirection:"row"}}>
                    <MaterialCommunityIcons name="source-commit-start-next-local" color="white" size={20} />
                    <Text style={{color:"white",top:2}}>Kochi,India</Text>
                </View>
                <View style={{flexDirection:"row",right:20,bottom:8}}>
                    
                    <Text style={{color:"white"}}>24'
                        <Text style={{color:"white",fontSize:25,fontWeight:"bold"}}>☼</Text>
                    </Text>
                </View>
            </View>
        </ImageBackground>
        <TouchableOpacity 
                style={{position:"absolute",
                top:"25.5%",
                alignSelf:"center",
            }}
            onPress={() =>navigation.goBack()}
        >
        <View style={{
            height:50,
            width:50,
            backgroundColor:"white",
            borderRadius:25,
            elevation:10,
            
            
            }}>
                <Image 
                    source={require("../assets/image/capture.png")}
                    style={{height:30,width:30,alignSelf:"center",top:10}}
                />
        </View>
        </TouchableOpacity>
        </SafeAreaView>
        </>
    )
}

export default ConfirmImageScreen;
