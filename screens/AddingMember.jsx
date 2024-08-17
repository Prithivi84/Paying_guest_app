import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { v4 } from "uuid";
import LottieView from "lottie-react-native";
import Loading from "../components/Loading";
import Date from "../components/Date";
import hyApi from "../ContentApi/hyApi";

export default function AddingMember() {
  const [select, setSelect] = useState();

  const nav = useNavigation();

  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [vehicle, setVehicle] = useState();
  const [Jdate, setJdate] = useState();
  const [bDate, setBdate] = useState();
  const [Gender, setGender] = useState();
  const [age, setAge] = useState();

  const personType = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
  ];
  //   console.log(date, number);
  const param = useRoute().params;

  const [roomId, setRoomId] = useState();

  useEffect(() => {
    console.log(param);
    setRoomId(param?.id);
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      // setImage(result.assets[0].uri);

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", result.assets[0].uri, true);
        xhr.send(null);
      });

      const fileRef = ref(storage, v4());
      const result2 = await uploadBytes(fileRef, blob);

      console.log(result2);
      // We're done with the blob, close and release it
      blob.close();

      return await getDownloadURL(fileRef);
    } else {
      return null;
    }
  };

  const Save = async () => {
    const data = {
      name: name,
      email: email,
      date: Jdate.toString(),
      gender: Gender,
      No: Number(phone),
      dateOfBirth: bDate.toString(),
      roomId: roomId,
      Vno: vehicle,
      Aurl: image2,
      Purl: image,
    };

    const data2 = {
      roomId: roomId,
      no: Number(param?.no + 1),
    };

    if (!name || !Gender || !phone || !Jdate || !bDate || !roomId) {
      ToastAndroid.show("Please fill Missing Field", ToastAndroid.LONG);
    } else {
      console.log("name", name);
      // console.log("select", select);
      console.log("phone", Number(phone));
      console.log("Gender", typeof Gender);
      console.log("Jdate", Jdate.toString());
      console.log("Bdate", bDate);
      console.log("RoomId", roomId);

      // setLoading3(true);

      await hyApi
        .SetMember(data)
        .then((res) => {
          console.log(res);
        })
        .then(async () => {
          await hyApi.SetNoMember(data2).then((res) => {
            console.log(res);
            setLoading3(false);
            nav.navigate("Rooms");
          });
        })
        .catch((e) => {
          console.log(e);
          setLoading3(false);
        });

      console.log(data);
    }
  };

  const AddPhoto = async (type) => {
    if (type == "Passport") {
      setLoading(true);
      const url = await pickImage();
      setImage(url);
      console.log(url);
      setLoading(false);
    } else if (type == "AadharCard") {
      setLoading2(true);
      const url = await pickImage();
      setImage2(url);
      console.log(url);
      setLoading2(false);
    }
  };

  useEffect(() => {}, [Bdate, dates]);

  const Bdate = (data) => {
    console.log("Bdate", data);
    setBdate(data);
  };
  const dates = (data) => {
    console.log("dates", data);
    setJdate(data);
  };

  return (
    <ScrollView className="">
      <Image className="w-full h-80" source={require("../assets/image1.png")} />
      <View className="p-4">
        <Text className="text-2xl" style={{ fontFamily: "outfitmedium" }}>
          Add Members Name
        </Text>
        <View>
          <View className="w-full  mt-4  gap-3">
            <View>
              <Text className="text-xl" style={{ fontFamily: "outfit" }}>
                Full Name
              </Text>
              <TextInput
                maxLength={100}
                value={name}
                onChangeText={(i) => setName(i)}
                className="w-3/4 border-2 p-1"
              />
            </View>
            <Pressable
              onPress={() => AddPhoto("Passport")}
              className="flex-row items-center gap-4"
            >
              <Text style={{ fontFamily: "outfit" }}>
                Upload Passport Size Photo
              </Text>
              {loading ? (
                <Loading size={40} />
              ) : image ? (
                <Image source={{ uri: image }} className="w-12 h-12" />
              ) : (
                <Image
                  className="w-12 h-12"
                  source={require("../assets/icon.png")}
                />
              )}
            </Pressable>
            <Pressable
              onPress={() => AddPhoto("AadharCard")}
              className="flex-row items-center gap-4"
            >
              <Text style={{ fontFamily: "outfit" }}>Upload AadharCard</Text>
              {loading2 ? (
                <Loading size={40} />
              ) : image2 ? (
                <Image source={{ uri: image2 }} className="w-12 h-12" />
              ) : (
                <Image
                  className="w-12 h-12"
                  source={require("../assets/icon.png")}
                />
              )}
            </Pressable>
            <View className="flex-row w-full gap-4">
              <View>
                <Text className="text-lg" style={{ fontFamily: "outfit" }}>
                  Gender
                </Text>
                <SelectList
                  setSelected={(val) => setGender(val)}
                  data={personType}
                  save="value"
                />
              </View>
              <View className=" w-24">
                <Text className="text-lg" style={{ fontFamily: "outfit" }}>
                  Age
                </Text>
                <TextInput
                  value={age}
                  onChangeText={(i) => setAge(i)}
                  keyboardType="numeric"
                  className="rounded-md border-2 p-1"
                />
              </View>
            </View>
            <View>
              <Text style={{ fontFamily: "outfit" }}>Phone no.</Text>
              <TextInput
                value={phone}
                onChangeText={(i) => setPhone(i)}
                maxLength={10}
                keyboardType="numeric"
                className=" rounded-md border-2 p-1"
              />
            </View>
            <View>
              <Text style={{ fontFamily: "outfit" }}>Email</Text>
              <TextInput
                value={email}
                onChangeText={(i) => setEmail(i)}
                keyboardType="email-address"
                className="rounded-md border-2 p-1 "
              />
            </View>
            <View>
              <Text style={{ fontFamily: "outfit" }}>Vehicle No.</Text>
              <TextInput
                value={vehicle}
                onChangeText={(i) => setVehicle(i)}
                maxLength={10}
                placeholder="Vehicle number if any?"
                className="rounded-md border-2 p-1 "
              />
            </View>
            <Date name={"Joining Date"} eventDate={dates} />
            <Date name={"Date of Birth"} eventDate={Bdate} />
          </View>
          <TouchableOpacity onPress={() => Save()}>
            <View className="items-center my-4 py-4 bg-neutral-900">
              {loading3 ? (
                <Loading size={40} />
              ) : (
                <Text
                  className="text-white"
                  style={{ fontFamily: "outfitmedium" }}
                >
                  Save Member
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
