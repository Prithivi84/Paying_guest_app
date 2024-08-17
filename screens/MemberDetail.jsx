import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function MemberDetail() {
  const nav = useNavigation();

  const member = useRoute().params;

  const [details, setDetails] = useState();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log(member?.details);
    setDetails(member?.details);
  }, []);

  return (
    <View className="h-full p-8 bg-slate-100">
      {/* Profile Photo */}
      <TouchableOpacity onPress={() => nav.goBack()} className="mt-2">
        <FontAwesome5 name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <View className="justify-center items-center mt-16 mb-10 gap-16">
        <Image source={require("../assets/icon.png")} className="h-44 w-44" />
        <Text className="text-4xl" style={{ fontFamily: "outfitbold" }}>
          {details?.members}
        </Text>
      </View>

      <View className="gap-4">
        <View className="bg-white flex-row justify-between p-4 py-6 rounded-lg items-center">
          <View className="flex-row items-center gap-4">
            <Feather name="mail" size={24} color="#4C3BCF" />
            <Text className="text-lg" style={{ fontFamily: "outfitmedium" }}>
              Email:{" "}
            </Text>
            <Text style={{ fontFamily: "outfit" }}>{details?.email}</Text>
          </View>
        </View>

        <View className="bg-white flex-row justify-between p-4 py-6 rounded-lg items-center">
          <View className="flex-row items-center gap-4">
            <Feather name="phone" size={24} color="#4C3BCF" />
            <Text className="text-lg" style={{ fontFamily: "outfitmedium" }}>
              Phone No:{" "}
            </Text>
            <Text style={{ fontFamily: "outfit" }}>{details?.phoneNo}</Text>
          </View>
        </View>

        <View className="bg-white flex-row justify-between p-4 py-6 rounded-lg items-center">
          <View className="flex-row items-center gap-4">
            <Feather name="calendar" size={24} color="#4C3BCF" />
            <Text className="text-lg" style={{ fontFamily: "outfitmedium" }}>
              Entry Date:{" "}
            </Text>
            <Text style={{ fontFamily: "outfit" }}>
              {details?.enrollDate.slice(0, 24)}
            </Text>
          </View>
        </View>

        <View className="bg-white flex-row justify-between p-4 py-6 rounded-lg items-center">
          <View className="flex-row items-center gap-4">
            <FontAwesome5 name="transgender" size={24} color="#4C3BCF" />
            <Text className="text-lg" style={{ fontFamily: "outfitmedium" }}>
              Gender:{" "}
            </Text>
            <Text style={{ fontFamily: "outfit" }}>{details?.gender}</Text>
          </View>
        </View>

        <View className="bg-white flex-row justify-between p-4 py-6 rounded-lg items-center">
          <View className="flex-row items-center gap-4">
            <Feather name="calendar" size={24} color="#4C3BCF" />
            <Text className="text-lg" style={{ fontFamily: "outfitmedium" }}>
              Date Of Birth:{" "}
            </Text>
            <Text style={{ fontFamily: "outfit" }}>
              {details?.dateOfBirth.slice(0, 16)}
            </Text>
          </View>
        </View>

        <View className="bg-white flex-row justify-between p-4 py-6 rounded-lg items-center">
          <View className="flex-row items-center gap-4">
            <Feather name="calendar" size={24} color="#4C3BCF" />
            <Text className="text-lg" style={{ fontFamily: "outfitmedium" }}>
              AadharCard:{" "}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text
                className="text-lg text-fuchsia-700"
                style={{ fontFamily: "outfitbold" }}
              >
                View
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="bg-slate-50 justify-center items-center ">
          <View className="gap-3">
            <Image
              source={require("../assets/icon.png")}
              className="h-40 w-40"
            />
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
