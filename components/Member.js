import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
// import { useRoute } from "@react-navigation/native";

export default function Member({ details }) {
  const nav = useNavigation();

  useEffect(() => {
    // console.log(memderId?.id);
    console.log(details);
  }, []);

  return (
    <View className="bg-white flex-row justify-between p-4 py-8 rounded-lg items-center">
      <View className="flex-row items-center gap-2">
        {/* <FontAwesome5 name="user-alt" size={24} color="black" /> */}
        <Image
          source={require("../assets/icon.png")}
          style={{ height: 40, width: 40 }}
          className="rounded-full"
        />
        <View>
          <Text className="text-lg" style={{ fontFamily: "outfit" }}>
            Members
          </Text>
        </View>
      </View>
      <Text className="text-lg" style={{ fontFamily: "outfit" }}>
        DD/mm/yyyy
      </Text>
      <TouchableOpacity
        onPress={() => nav.navigate("Detail", { details: details })}
      >
        <Text
          className="text-lg text-purple-600"
          style={{ fontFamily: "outfit" }}
        >
          View Details
        </Text>
      </TouchableOpacity>
    </View>
  );
}
