import { View, Text } from "react-native";
import React from "react";

export default function Room({ details }) {
  console.log(details);

  return (
    <View className=" w-full py-8 border-y flex-row justify-evenly text-left">
      <Text>{details.roomName}</Text>
      <Text>{details.noOfMembers}</Text>
      <Text>Members</Text>
    </View>
  );
}
