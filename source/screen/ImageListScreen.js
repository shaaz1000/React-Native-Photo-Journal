import React,{useEffect,useState} from "react";
import {Text,View,StyleSheet, StatusBar,FlatList, SafeAreaView, ImageBackground, Image,PermissionsAndroid} from "react-native"
import { Appbar } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage"
import Geolocation from 'react-native-geolocation-service';
// import Geocoder from 'react-native-geocoding';
import { useFocusEffect } from '@react-navigation/native';
const ImageListScreen = () => {
    
    const [isDataEmpty,setIsDataEmpty] = useState(false)
    
    
    let Data1 = []
    
    //  Data1.push({
    //     imageDate : "26th Jan 2021",
    //     imageLocation : "Ahmednagar",
    //     temperature :"24'☼",
    //     imageLink : "https://media.nomadicmatt.com/netherlandsguide.jpg"
    // })

    
    
    const saveData = async () => {
        
        try {
            const isDataAvailable = await AsyncStorage.getItem("savedData")
            console.log(isDataAvailable,"is")
            if(isDataAvailable === null){
                setIsDataEmpty(true)
                await AsyncStorage.setItem("savedData",JSON.stringify(Data1))
            }
            else{
                getSavedData()
            }
            
           
        
        } catch (error) {
            console.log(error,"line 25")
        }
        
    }
    
    const getSavedData = async () =>{
        try {
            const SavedData = await AsyncStorage.getItem("savedData")
            const parseSavedData = JSON.parse(SavedData)
            // console.log(parseSavedData.length,"len")
            // if(parseSavedData.length == 0){
            //     setIsDataEmpty(true)
            // }
            if(parseSavedData.length == 0){
                setIsDataEmpty(true)
            }
            // else{
           
            // let newData = JSON.parse(SavedData)
            
            // newData.push({
            //     imageDate : "28th Jan 2020",
            //     imageLocation : "Ahmedae",
            //     temperature :"25'☼",
            //     imageLink : "uuuu"
            // })
            
            
            // //await AsyncStorage.removeItem("savedData")
            // await AsyncStorage.setItem("savedData",JSON.stringify(newData))
            // const data = await AsyncStorage.getItem("savedData")
            // console.log(data,"d") 
            // }
        } catch (error) {
            console.log(error,"line 41")
        }
        console.log("44")
       
    }
    
    
    const Data = [
        {
            imageDate : "26th Jan 2021",
            imageLocation : "Ahmednagar",
            temperature :"24'☼",
            imageLink : "https://media.nomadicmatt.com/netherlandsguide.jpg"
        },
        {
            imageDate : "26th Jan 2021",
            imageLocation : "Ahmednagar",
            temperature :"24'☼",
            imageLink : "https://media.nomadicmatt.com/netherlandsguide.jpg"
        },
        {
            imageDate : "26th Jan 2021",
            imageLocation : "Ahmednagar",
            temperature :"24'☼",
            imageLink : "https://media.nomadicmatt.com/netherlandsguide.jpg"
        },
        {
            imageDate : "26th Jan 2021",
            imageLocation : "Ahmednagar",
            temperature :"24'☼",
            imageLink : "https://media.nomadicmatt.com/netherlandsguide.jpg"
        },
        {
            imageDate : "26th Jan 2021",
            imageLocation : "Ahmednagar",
            temperature :"24'☼",
            imageLink : "https://media.nomadicmatt.com/netherlandsguide.jpg"
        },
        {
            imageDate : "26th Jan 2021",
            imageLocation : "Ahmednagar",
            temperature :"24'☼",
            imageLink : "https://media.nomadicmatt.com/netherlandsguide.jpg"
        },
        {
            imageDate : "26th Jan 2021",
            imageLocation : "Ahmednagar",
            temperature :"24'☼",
            imageLink : "https://media.nomadicmatt.com/netherlandsguide.jpg"
        },
        {
            imageDate : "26th Jan 2021",
            imageLocation : "Ahmednagar",
            temperature :"24'☼",
            imageLink : "https://media.nomadicmatt.com/netherlandsguide.jpg"
        },
        {
            imageDate : "26th Jan 2021",
            imageLocation : "Ahmednagar",
            temperature :"24'☼",
            imageLink : "https://media.nomadicmatt.com/netherlandsguide.jpg"
        },
        {
            imageDate : "26th Jan 2021",
            imageLocation : "Ahmednagar",
            temperature :"24'☼",
            imageLink : "https://media.nomadicmatt.com/netherlandsguide.jpg"
        },
    ]

    

    const askForLocationPermission = async () => {
        
        const isPermissionGranted = await PermissionsAndroid.request("android.permission.ACCESS_FINE_LOCATION")
        if(isPermissionGranted == "granted"){
            Geolocation.getCurrentPosition(({coords})=>{
                const {latitude,longitude} = coords
                //console.log("data",latitude,longitude,"ha")
                fetch(`http://api.positionstack.com/v1/reverse?access_key=3d0ba2096a738608e82cb6386e055b76&query=${latitude},${longitude}`)
                .then(response => response.json())
                .then(({data})=>{
                    // const updatedData = data.toString()
                    const convertArraytoObject = Object.assign({},data)
                    console.log(convertArraytoObject["0"].label,"hii")
                    fetch(`http://api.weatherapi.com/v1/current.json?key=231213c0d7704509a64210440210905&q=Thane,%20MH,%20India`)
                    .then(weatherResponse=>weatherResponse.json())
                    .then(({current})=>{
                        const {feelslike_c} = current
                        //console.log(feelslike_c,"from weather")
                    })
                    .catch(err=>{
                        alert("Failed to load weather data")
                    })
                })
                .catch(err=>{
                    alert("Failed to load address")
                })
            },
            (error) => {
              // See error code charts below.
              alert("Something went wrong while accessing location")
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            )
            
        }
        else {
            alert("Please give permission to continue")
        }
        console.log(isPermissionGranted,"is permission")
    }

    
    
        
    
    
    
    useEffect(()=>{
        saveData()
        
        askForLocationPermission()
    
    },[Data])
    const renderItem = (item,index) => {
        const newDate = item.imageDate.split(" ")
        //console.log(newDate.pop(),"hi")
        return(
            <>
                <View>
                    <ImageBackground 
                        source={require("../assets/image/pic.jpg")} 
                        style={{width:"100%",height:200,elevation:10}}>
                        <Text style={{color:"white",fontSize:18,fontWeight:"bold",marginLeft:10}}>{newDate[1]}</Text>
                        <Text style={{color:"white",fontSize:18,fontWeight:"bold",marginLeft:10}}>{newDate[0]}</Text>
                            <View style={{flexDirection:"row",top:120,justifyContent:"space-around"}}>
                            <Text style={{color:"white",marginLeft:10,right:60}}>{item.imageLocation}</Text>
                            <Text style={{color:"white",fontSize:14,left:60}}>{item.temperature}</Text>
                            </View>
                    </ImageBackground>
                   
                </View>
            </>
        )
    }
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
        <SafeAreaView style={{flex:1}}>
            {
                isDataEmpty ?
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text style={{backgroundColor:"#a5e1ad",color:"#564a4a",padding:10,fontSize:18,fontWeight:"bold",borderRadius:10,marginHorizontal:15}}>You have no memories Please click on the plus button to start clicking image</Text>
                </View>
                :
            
            <FlatList
                data={Data}
                renderItem={({item,index})=>{
                    return renderItem(item,index)
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item,index)=>{
                   return index
                }}
            />
        }
        </SafeAreaView>
        </>
    )
}

export default ImageListScreen;
