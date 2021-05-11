import React,{useState,useEffect} from "react";
import {Text,View,StyleSheet, StatusBar,FlatList, SafeAreaView, ImageBackground, Image} from "react-native"
import { Appbar ,Divider} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage"
import moment from "moment"
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
    const date = moment().format('D MMMM YYYY')
    
    
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
            bottomText={`You have record ${TotalDays} days since the first day`}/>
            :
            <InfoTextScreen 
            topText="Days" 
            middleText={`${DifferenceOfDays}/${TotalDays}`}
            bottomText={`You have record ${TotalDays} days since the first day`}
            />
            }
            
        
        <InfoTextScreen 
            topText="Hottest day" 
            middleText="39°" 
            bottomText="You have record 17 days since the first day"
        />
        <InfoTextScreen 
            topText="Coldest day" 
            middleText="24°" 
            bottomText="You have record 17 days since the first day"
        />
        </>
        }
        
        </>
    )
}

export default InfoScreen;
