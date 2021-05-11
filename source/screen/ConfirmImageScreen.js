import React,{useState,useEffect} from "react";
import {Text,View,TextInput, StatusBar, SafeAreaView, ImageBackground,TouchableOpacity,Image,TouchableWithoutFeedback,Keyboard, KeyboardAvoidingView} from "react-native"
import { Appbar ,IconButton} from 'react-native-paper';
import moment from "moment"
import {connect} from "react-redux"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage"
const ConfirmImageScreen = ({route,navigation,imageLocation,Climate}) => {
    
    const {params} = route
    const [Thoughts,setThoughts] = useState("")
    const {image} = route.params
    const date = moment().format('D MMMM YYYY')
    const newDate = date.split(" ")
    const {path,mime,modificationDate} = params.image
    const [savedImageDate,setSavedImageDate] = useState()
    
    const checkData = async () => {
        try {
            const savedData = await AsyncStorage.getItem("savedData")
            const newData = JSON.parse(savedData)

            if(newData.length != 0){
                setSavedImageDate(newData[newData.length-1].imageDate)
            }

        } catch (error) {
            
        }
    }
     useEffect(()=>{
        checkData()
    },[])
    const uploadData = () => {
        let cloudData = {
            uri : path,
            type : mime,
            name : modificationDate
        }
        const data = new FormData()
        data.append("file",cloudData)
        data.append('upload_preset',"SalesGrowAdmin")
        data.append('cloud_name',"salesgrow")

        fetch("https://api.cloudinary.com/v1_1/salesgrow/image/upload",{
            method : "post",
            body : data
        }).then(res=>res.json())
        .then(async ({url}) => {
            // console.log(url,"url")
            const savedData = await AsyncStorage.getItem("savedData")
            const newData = JSON.parse(savedData)
            
            newData.push({
                imageDate : date,
                imageLocation,
                temperature : `${Climate}'☼`, //"24'☼"
                imageLink : url
            })
            await AsyncStorage.setItem("savedData",JSON.stringify(newData))
            navigation.navigate("Image List")
        }
        )
        .catch((e)=>{
            console.log("Error",e)
        })
    
    }
    console.log( savedImageDate != newDate.toString(),"ji")
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
                    <Text style={{color:"white",top:2}}>{imageLocation}</Text>
                </View>
                <View style={{flexDirection:"row",right:20,bottom:8}}>
                    
                    <Text style={{color:"white"}}>{`${Climate}' `}
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
        
        <TextInput
            onChangeText={(text)=>setThoughts(text)}
            placeholder="Type your thoughts..."
            placeholderTextColor="grey"
            multiline={true}
            style={{marginTop:30,fontSize:15,marginLeft:10,color:"grey"}}
        />

        {
            savedImageDate === newDate.toString() ?  
            <View style={{marginHorizontal:10,alignItems:"center",elevation:10,padding:10,backgroundColor:"pink",borderRadius:10}}>
                <Text style={{textAlign: 'center',fontWeight:"bold",fontSize:18,padding:10,color:"white"}}>You have already clicked an image for the day</Text>
            </View>
            :
            Thoughts.length != 0
            ?
            <TouchableOpacity 
                onPress={uploadData}
                
                style={{alignSelf:"center",margin:10,backgroundColor:"#34ebcf",padding:10,borderRadius:10}}
            >
                <Text style={{color:"grey",fontWeight:"bold",fontSize:16}}>Upload Pic</Text>
            </TouchableOpacity>
            :
            null
            
         }
        
        </SafeAreaView>
        </>
    )
}

const mapStateToProps = State => ({
    imageLocation : State.DataReducer.LocationInfo,
    Climate : State.DataReducer.ClimateInfo
})

export default connect(mapStateToProps)(ConfirmImageScreen);
