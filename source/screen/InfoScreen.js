import React from "react";
import {Text,View,StyleSheet, StatusBar,FlatList, SafeAreaView, ImageBackground, Image} from "react-native"
import { Appbar ,Divider} from 'react-native-paper';

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
        <InfoTextScreen 
            topText="Days" 
            middleText="17/19" 
            bottomText="You have record 17 days since the first day"
        />
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
    )
}

export default InfoScreen;
