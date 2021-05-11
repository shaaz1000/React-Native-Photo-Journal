import React from 'react';
import {Image,TouchableOpacity,View} from "react-native"
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import ImageClickScreen from "./source/screen/ImageClickScreen"
import ImageListScreen from "./source/screen/ImageListScreen"
import InfoScreen from "./source/screen/InfoScreen"
import ImageInformationScreen from "./source/screen/ImageInformationScreen"
import ViewImageScreen from "./source/screen/ViewImageScreen"
import ConfirmImageScreen from "./source/screen/ConfirmImageScreen"
import {Provider} from "react-redux"
import store from "./source/redux/store"
import SplashScreen from './source/screen/SplashScreen';

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const CustomTabBarButton = ({children,onPress}) => (
  
  <TouchableOpacity
    onPress={onPress}
    style={{
      //top:-30,
      bottom:20,
      justifyContent:"center",
      alignItems:"center",
    }}
  >
    <View style={{width:60,height:60,borderRadius:30,backgroundColor:"white"}}>
      {children}
    </View>
  </TouchableOpacity>
)
const bottomTabsScreen = () => {

  
  return(
    <Tab.Navigator
      tabBarOptions={
        {
          showLabel:false
        }
      }
    >
      <Tab.Screen 
        name="Image List" 
        component={ImageListScreen}
        options={{
          tabBarIcon:({color,size,focused})=>{
            return(
              <Image 
                source={focused?require("./source/assets/image/Vector.png"):require("./source/assets/image/unfocused.png")} 
                style={{width:20,height:20,tintColor:focused?"#314743":"#6C6C6C"}}/>
            )
            
          }
        }}
      />
      <Tab.Screen 
        name="Image Click" 
        component={ImageClickScreen}
        options={{
          tabBarIcon:({color,size,focused})=>(
            <Image
              source={require("./source/assets/image/plus.png")}
              resizeMode="contain"
              style={{
                width:20,
                height:20,
               
              }}
            />
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props}/>
          )
        }}
      />
      
      <Tab.Screen 
        name="Info Screen" 
        component={InfoScreen}
        options={{
          tabBarIcon:({color,size,focused})=>{
            
            return(
              <Image 
                source={require("./source/assets/image/info.png")} 
                style={{width:20,height:20,tintColor:focused?"#314743":"#6C6C6C"}}/>
            )
            
          }
        }}
      />
    </Tab.Navigator>
  )
}

const App = () => {
  return(
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash Screen" component={SplashScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Main" component={bottomTabsScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Image Information" component={ImageInformationScreen} options={{headerShown:false}}/>
        <Stack.Screen name="View Image" component={ViewImageScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Confirm Image" component={ConfirmImageScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default App;
