import React from "react";
import {Text,View, StatusBar,  ImageBackground,TouchableOpacity} from "react-native"
import { Appbar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const ImageInformationScreen = ({route,navigation}) => {
    const {data} = route.params
    const newDate = data.imageDate.split(" ")

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
        <TouchableOpacity onPress={()=>navigation.navigate("View Image",{data})}>
        <ImageBackground
            source={{uri:data.imageLink}}
            style={{width:"100%",height:200}}
        >
            <Text style={{marginLeft:10,color:"white",fontSize:16,fontWeight:"bold",marginTop:10}}>{newDate[1]}</Text>
            <Text style={{marginLeft:10,color:"white",fontSize:16,fontWeight:"bold",marginTop:2}}>{newDate[0]}</Text>
            <View style={{flexDirection:"row",top:"33%",justifyContent:"space-between"}}>
                <View style={{flexDirection:"row"}}>
                    <MaterialCommunityIcons name="source-commit-start-next-local" color="white" size={20} />
                    <Text style={{color:"white",top:2}}>{data.imageLocation}</Text>
                </View>
                <View style={{flexDirection:"row",right:20,bottom:8}}>
                    
                    <Text style={{color:"white"}}>{`${data.temperature}' `}
                        <Text style={{color:"white",fontSize:25,fontWeight:"bold"}}>☼</Text>
                    </Text>
                </View>
            </View>
        </ImageBackground>
        </TouchableOpacity>
            <View style={{marginTop:10}}>
                <Text style={{marginHorizontal:15,marginTop:10,color:"grey",fontSize:15}}>{data.Thoughts}</Text>
            </View>
        </>
    )
}

export default ImageInformationScreen;
