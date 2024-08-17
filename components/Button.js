import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function AddButton({}) {
  //   const addMember = () => {
  //     console.log("add Members");
  //       ToastAndroid.show("Add Members", ToastAndroid.LONG);
  //       //   navigation.navigate("")
  //   };

  const navigation = useNavigation();

  return (
    <View className="p-4 rounded-full w-20 h-20 bg-blue-800 justify-center items-center">
      <Text className="font-bold text-2xl text-white">+</Text>
    </View>
  );
}
