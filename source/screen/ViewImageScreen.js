import React from "react";
import {Text,View, StatusBar,  Image} from "react-native"
import { Appbar} from 'react-native-paper';

const ViewImageScreen = ({route,navigation}) => {
    
    const {data} = route.params
    return(
        <>
        <StatusBar backgroundColor="white" barStyle="dark-content"/>
        
        <Appbar.Header style={{backgroundColor:"white",height:50}}>
        <Appbar.Action icon="chevron-left" onPress={() =>navigation.goBack()} style={{right:10}} />
        
        <Appbar.Content
            style={{right:15}}
            title={
                <Text style={{color:"#6C6C6C",fontSize:24,fontWeight:"400",}}>pic
                    <Text style={{color:"grey"}}>a</Text>
                        <Text style={{color:"#5ddea6"}}>day</Text>
                </Text>
            }  titleStyle={{alignSelf:"center"}}/>
        </Appbar.Header>
        <View style={{flex:1,justifyContent:"center"}}>
        <Image
            source={{uri:data.imageLink}}
            style={{width:"100%",height:230}}
        />
        </View>
        </>
    )
}

export default ViewImageScreen;
