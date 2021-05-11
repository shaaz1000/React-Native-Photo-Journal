import React,{useEffect,useState} from "react";
import {Text,View,TouchableOpacity, StatusBar,FlatList, SafeAreaView, ImageBackground, Image,PermissionsAndroid} from "react-native"
import { Appbar } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage"
import Geolocation from 'react-native-geolocation-service';
import * as ImageActions from "../redux/action/dataInformationAction"
import {connect} from "react-redux"

const ImageListScreen = ({dispatch,navigation}) => {
    
    const [isDataEmpty,setIsDataEmpty] = useState(false)
    const [Data,setData] = useState([])
    const [Loading,setLoading] = useState(true)
    let Data1 = []

    const saveData = async () => {
        
        try {
            const isDataAvailable = await AsyncStorage.getItem("savedData")
            
            if(isDataAvailable === null){
                setIsDataEmpty(true)
                await AsyncStorage.setItem("savedData",JSON.stringify(Data1))
                setLoading(false)
            }
            else{
                setLoading(true)
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
                setLoading(false)
            }
            else{
                setData(parseSavedData)
                setLoading(false)
            }
            
        } catch (error) {
            console.log(error,"line 41")
        }
       
       
    }
    
    
    
    

    const askForLocationPermission = async () => {
        
        const isPermissionGranted = await PermissionsAndroid.request("android.permission.ACCESS_FINE_LOCATION")
        if(isPermissionGranted == "granted"){
            Geolocation.getCurrentPosition(({coords})=>{
                const {latitude,longitude} = coords
                //console.log("data",latitude,longitude,"ha")
                fetch(`http://api.positionstack.com/v1/reverse?access_key=3d0ba2096a738608e82cb6386e055b76&query=${latitude},${longitude}`)
                .then(response => response.json())
                .then(({data})=>{
                    
                    const convertArraytoObject = Object.assign({},data)
                    
                    dispatch(ImageActions.LocationInfo(convertArraytoObject["0"].label))
                    fetch(`http://api.weatherapi.com/v1/current.json?key=231213c0d7704509a64210440210905&q=Thane,%20MH,%20India`)
                    .then(weatherResponse=>weatherResponse.json())
                    .then(({current})=>{
                        const {feelslike_c} = current
                            dispatch(ImageActions.ClimateInfo(feelslike_c))
                    })
                    .catch(err=>{
                        alert("Failed to load weather data")
                    })
                })
                .catch(err=>{
                    alert(err)
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
    
    },[])
    const renderItem = (item,index) => {
        const newDate = item.imageDate.split(" ")
        
        //console.log(newDate.pop(),"hi")
        return(
            <>
            <TouchableOpacity onPress={()=>navigation.navigate("Image Information",{data:item})}>
                <View>
                    <ImageBackground 
                        source={{uri:item.imageLink}} 
                        style={{width:"100%",height:200,elevation:10}}>
                        <Text style={{color:"white",fontSize:18,fontWeight:"bold",marginLeft:10}}>{newDate[1]}</Text>
                        <Text style={{color:"white",fontSize:18,fontWeight:"bold",marginLeft:10}}>{newDate[0]}</Text>
                            <View style={{flexDirection:"row",top:120,justifyContent:"space-around"}}>
                            <Text style={{color:"white",marginLeft:10,right:50}}>{item.imageLocation}</Text>
                            <Text style={{color:"white",fontSize:14,right:-20}}>{`${item.temperature}'☼`}</Text>
                            </View>
                    </ImageBackground>
                   
                </View>
                </TouchableOpacity>
            </>
        )
    }
    return(
        <>
        <StatusBar backgroundColor="white" barStyle="dark-content"/>
        <Appbar.Header style={{backgroundColor:"white",height:50}}>
       
        <Appbar.Content 
            title={
                <Text style={{color:"#6C6C6C",fontSize:24,fontWeight:"bold"}}>pic
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
                <TouchableOpacity onPress={saveData}>
                    <Text style={{marginTop:20,padding:10,borderRadius:10,backgroundColor:"#c8c2bc",color:"white",fontSize:19,fontWeight:"bold"}}>Refresh Me</Text>
                </TouchableOpacity>
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
                refreshing={Loading}
                onRefresh={()=>{
                    saveData()
                }}
            />
        }
        </SafeAreaView>
        </>
    )
}

export default connect()(ImageListScreen);
