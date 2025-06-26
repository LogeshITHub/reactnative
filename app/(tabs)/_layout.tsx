import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <>      
      <Tabs screenOptions={{tabBarActiveTintColor:"blue"}}>
        
        <Tabs.Screen name="index" options={{
          title:"Home",          
          tabBarIcon: ({color,focused})=> {
            return focused?
            (<Ionicons name="home-sharp" size={24} color="blue"/>)
            : (<Ionicons name="home-sharp" size={24} color="black" />)
          }, 
          }}/>
        <Tabs.Screen name="Login" options={{
          title:"Login",
          tabBarIcon: ({color,focused})=> {
            return focused?
            (<Entypo name="login" size={24} color="blue" />)
            : (<Entypo name="login" size={24} color="black" />)
          },
          }}/>
      </Tabs >      
    </>
  )
}

