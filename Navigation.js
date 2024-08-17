import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./components/SignIn";
import Welcome from "./components/Welcome";
import RoomScreen from "./screens/RoomScreen";
import AddingMember from "./screens/AddingMember";
import AddMember from "./screens/AddMember";
import MembersScreen from "./screens/MembersScreen";
import HistoryScreen from "./screens/HistoryScreen";
import MemberDetail from "./screens/MemberDetail";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Rooms"
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Rooms" component={RoomScreen} />
        <Stack.Screen name="Adding" component={AddingMember} />
        <Stack.Screen name="Add" component={AddMember} />
        <Stack.Screen name="Member" component={MembersScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Detail" component={MemberDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
