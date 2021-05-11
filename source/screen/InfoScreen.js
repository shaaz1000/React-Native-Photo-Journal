import React,{useState,useEffect} from "react";
import {Text,View,StyleSheet, StatusBar,FlatList, SafeAreaView, ImageBackground, Image} from "react-native"
import { Appbar ,Divider} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage"
import moment from "moment"
import { useFocusEffect } from '@react-navigation/native';
const InfoTextScreen = ({topText,middleText,bottomText}) => {
    return(
        <>
            <View>
                <Text style={{fontSize:17,textAlign: 'center',marginTop:10}}>{topText}</Text>
                <Text style={{fontSize:50,textAlign: 'center',color:"#314743",fontWeight:"bold"}}>{middleText}</Text>
                <Text style={{textAlign: 'center'}}>{bottomText}</Text>
               
            </View>
            <Divider style={{borderWidth:0.25,marginTop:10}}/>
        </>
    )
}
const InfoScreen = () => {
    const [isDataEmpty,setIsDataEmpty] = useState(false)
    const [TotalDays,setTotalDays] = useState()
    const [DifferenceOfDays,setDifferenceOfDays] = useState()
    const [coldestTemperature,setColdestTemperature] = useState([])
    const [hottestTemperature,setHottestTemperature] = useState([])
    
    const getNumberOfDays = async () => {
        try {
            const savedData = await AsyncStorage.getItem("savedData")
            const newData = JSON.parse(savedData)
            if(newData.length == 0){
                setIsDataEmpty(true)
                
            }
            else{
                const totalClickedDays = moment().diff(newData[0].imageDate,"day")
                setDifferenceOfDays(totalClickedDays)
                setTotalDays(newData.length)
                const ColdestTemperature = newData.sort((a,b)=>{
                    return a.temperature - b.temperature
                })
                setColdestTemperature(ColdestTemperature[0])
                const HottestTemperature = newData.sort((a,b)=>{
                    return b.temperature - a.temperature
                    
                })
                setHottestTemperature(HottestTemperature[0])
                
                
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    
    useEffect(()=>{
        getNumberOfDays()
    },[])
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
            isDataEmpty ?
            <View style={{flex:1,justifyContent:"center",alignSelf:"center"}}>
                <Text style={{textAlign:"center",fontSize:18,fontWeight:"bold",marginHorizontal:10,backgroundColor:"#c6ffc1",padding:10,borderRadius:20}}>You haven't clicked any picture yet</Text>
            </View>
            :
            <>
            {
                DifferenceOfDays === 0 ?
                
                <InfoTextScreen 
            topText="Days" 
            middleText={`${TotalDays}`}
            bottomText={`You have record ${TotalDays} day since the first day`}/>
            :
            <InfoTextScreen 
            topText="Days" 
            middleText={`${TotalDays}/${DifferenceOfDays}`}
            bottomText={`You have record ${TotalDays} days since the first day`}
            />
            }
            
        
        <InfoTextScreen 
            topText="Hottest day" 
            middleText={`${hottestTemperature.temperature} '`} 
            bottomText={`${hottestTemperature.imageDate}`}
        />
        <InfoTextScreen 
            topText="Coldest day" 
            middleText={`${coldestTemperature.temperature} '`} 
            bottomText={`${coldestTemperature.imageDate}`}
        />
        </>
        }
        
        </>
    )
}

export default InfoScreen;
