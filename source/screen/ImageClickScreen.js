import React,{useState,useEffect} from "react";
import {Text,View,StyleSheet, StatusBar, SafeAreaView, ImageBackground,Dimensions, TouchableOpacity,Permission} from "react-native"
import { useFocusEffect } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import ImagePicker from "react-native-image-crop-picker"

const {width,height} = Dimensions.get("window").width


const ImageClickScreen = () => {
    const [isImageCaptured,setImageCaptured] = useState(true)
    const captureImage = () => {
        ImagePicker.openCamera({
            width,
            height,
            cropping: true,
          }).then(image => {
            console.log(image);
          }).catch((error) => {
              alert(error.toString());
              setImageCaptured(false);
          })
    }

    useFocusEffect(()=>{
        captureImage()
    })
    
    return(
        <>
        <StatusBar backgroundColor="white" barStyle="dark-content"/>
        
            <Appbar.Header style={{backgroundColor:"white",height:50}}>
            <Appbar.Content 
                title={
                    <Text style={{color:"#6C6C6C",fontSize:24,fontWeight:"400"}}>pic
                        <Text style={{color:"grey"}}>a</Text>
                            <Text style={{color:"#5ddea6"}}>day</Text>
                    </Text>
                }  titleStyle={{alignSelf:"center"}}/>
            </Appbar.Header>
                {
                    !isImageCaptured ? 
                    <View style={{flex: 1,justifyContent:"center",alignSelf:"center"}}>
                        <Text style={{textAlign:"center",fontSize:20,fontWeight:"bold"}}>No Image Captured</Text>
                        <TouchableOpacity 
                            style={{backgroundColor:"#52b788",padding:10,borderRadius:20,marginTop:10}}
                            onPress={captureImage}
                        >
                            <Text style={{textAlign:"center",fontSize:16,fontWeight:"bold",padding:10,color:"white"}}>Capture Image</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    null
                }
        </>
    )
}

export default ImageClickScreen;
