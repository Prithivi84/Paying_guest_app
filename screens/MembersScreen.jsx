import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import hyApi from "../ContentApi/hyApi";
import { FontAwesome5 } from "@expo/vector-icons";
import Member from "../components/Member";
import * as IntentLauncher from "expo-intent-launcher";
import { Platform } from "react-native";

const generatePhonePeUPIUrl = (
  payeeVPA,
  payeeName,
  amount,
  transactionId,
  transactionRefId,
  transactionNote,
  callbackUrl
) => {
  return `upi://pay?pa=${encodeURIComponent(payeeVPA)}&pn=${encodeURIComponent(
    payeeName
  )}&tid=${encodeURIComponent(transactionId)}&tr=${encodeURIComponent(
    transactionRefId
  )}&tn=${encodeURIComponent(transactionNote)}&am=${encodeURIComponent(
    amount
  )}&cu=INR&url=${encodeURIComponent(callbackUrl)}`;
};

export default function MembersScreen() {
  const [RoomName, setRoomName] = useState();
  const [rent, setRent] = useState();

  const nav = useNavigation();

  const [loading, setLoading] = useState(false);

  const [members, setMembers] = useState([]);

  const Rname = useRoute().params;

  useEffect(() => {
    setRoomName(Rname?.RoomName);
    setRent(Rname?.Rent);
    getMembers();
  }, []);

  const getMembers = async () => {
    const id = Rname?.id;
    await hyApi
      .GetMembers(id)
      .then((res) => {
        console.log(res);
        setMembers(res.members);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const payment = () => {
    console.log("started");
    const payeeVPA = "komallsharma.098@okaxis";
    const payeeName = "Komal Sharma";
    const amount = "1.00";
    const transactionId = "TXN1234567890";
    const transactionRefId = "REF1234567890";
    const transactionNote = "Tsidoedu821781y";
    const callbackUrl = "Room_Rent://home";

    const upiUrl = generatePhonePeUPIUrl(
      payeeVPA,
      payeeName,
      amount,
      transactionId,
      transactionRefId,
      transactionNote,
      callbackUrl
    );

    if (Platform.OS === "android") {
      IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: upiUrl,
      }).catch((err) => console.error("Failed to launch intent", err));
    } else {
      Alert.alert("Error", "PhonePe integration is only supported on Android.");
    }
  };

  return (
    <View className="bg-slate-200   h-full">
      {/* Header */}
      <View className="bg-slate-50 pt-14 pb-4 px-4 items-center flex-row justify-between">
        <TouchableOpacity>
          <Entypo name="menu" size={30} color="black" />
        </TouchableOpacity>
        <Text style={{ fontFamily: "outfit" }} className="text-3xl font-bold">
          {RoomName}
        </Text>
        <TouchableOpacity>
          <Entypo name="bell" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* body table */}

      <ScrollView>
        <View className="p-6">
          <FlatList
            data={members}
            onRefresh={() => getMembers()}
            refreshing={loading}
            scrollEnabled={false}
            renderItem={({ item, index }) => <Member details={item} />}
          ></FlatList>
        </View>

        {/* Room Details */}

        <View className="p-6">
          <View className="bg-white p-4 rounded-lg">
            <Text className="text-2xl " style={{ fontFamily: "outfitmedium" }}>
              Payment Status
            </Text>
            <View>
              <Text>Room Rent - {rent}</Text>
            </View>
          </View>
        </View>

        {/* history */}

        <View className="p-6 ">
          <View className="bg-white flex-row justify-between items-center p-4 rounded-lg">
            <View>
              <Text
                className="text-2xl "
                style={{ fontFamily: "outfitmedium" }}
              >
                Payment History
              </Text>
              <View>
                <Text>Room Rent - {rent}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => nav.navigate("History", { id: Rname?.id })}
            >
              <Text
                className="text-lg text-purple-600"
                style={{ fontFamily: "outfitmedium" }}
              >
                View History
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Payment Button */}

      <Pressable
        onPress={() => payment()}
        className="absolute left-6 bottom-4 w-[90%] rounded-3xl bg-slate-800 px-8 py-8 justify-between flex-row items-center"
      >
        <Text
          className="text-white text-xl "
          style={{ fontFamily: "outfitmedium" }}
        >
          Pay Rent
        </Text>
        <View className="items-end">
          <Text
            className="text-white text-2xl "
            style={{ fontFamily: "outfitmedium" }}
          >
            ₹{rent}
          </Text>
          <Text className="text-white text-sm" style={{ fontFamily: "outfit" }}>
            due date: dd/mm/yyyy
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
