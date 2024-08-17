import {
  View,
  Text,
  Modal,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Room from "../components/Room";
import AddButton from "../components/Button";
// import AddMember from "./AddMember";
import { useNavigation } from "@react-navigation/native";
import hyApi from "../ContentApi/hyApi";

// import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RoomScreen() {
  const [viewModal, setViewModal] = useState(false);

  // const nav = useNavigation();

  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = () => {
    setLoading(true);
    hyApi.GetRooms().then((res) => {
      console.log(res);
      setDetails(res.rooms);
      setLoading(false);
    });
  };

  const RoomEvent = (item) => {
    if (item.noOfMembers === 0) {
      nav.navigate("Adding", { id: item.id, no: item.noOfMembers });
    } else if (item.noOfMembers > 0) {
      nav.navigate("Member", {
        RoomName: item.roomName,
        id: item.id,
        Rent: item.roomRent,
      });
    }
  };

  const nav = useNavigation();

  return (
    <View className="h-full pt-16">
      <View className="justify-center items-center mb-4">
        <Text style={{ fontFamily: "outfitbold" }} className=" text-3xl">
          RoomScreen
        </Text>
      </View>
      <View className=" w-full ">
        <View className="flex-row pt-4 pb-4 justify-evenly bg-slate-300">
          <Text style={{ fontFamily: "outfitmedium" }} className="text-xl ">
            Rooms
          </Text>
          <Text style={{ fontFamily: "outfitmedium" }} className="text-xl ">
            Members
          </Text>
          <Text style={{ fontFamily: "outfitmedium" }} className="text-xl ">
            Status
          </Text>
        </View>
        <View className="mt-6 flex items-center justify-between">
          <FlatList
            data={details}
            onRefresh={() => getRooms()}
            refreshing={loading}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => RoomEvent(item)}>
                <Room details={item} />
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>
      </View>
      <Pressable
        onPress={() => {
          // setViewModal(true);
          console.log("Pressable");
          nav.navigate("Add");
        }}
        className="absolute right-4 bottom-4"
      >
        <AddButton />
      </Pressable>
      {/* <Modal animationType="slide" visible={viewModal}>
        <AddMember modalView={() => setViewModal(false)} />
      </Modal> */}
    </View>
  );
}

// inset 16px 16px 32px #cecece,inset -16px -16px 32px #f2f2f2
