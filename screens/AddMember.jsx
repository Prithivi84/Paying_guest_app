import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

export default function AddMember() {
  const [selectDate, setSelectDate] = useState();
  const [date, setDate] = useState(dayjs());
  const [number, setNumber] = useState();

  const navigation = useNavigation();

  const setMembers = () => {
    if (number != null && number > 0 && number <= 10) {
      ToastAndroid.show("Adding Members", ToastAndroid.LONG);

      // console.log(date.toString());

      navigation.push("Adding", { date: date.toString(), number: number });

      // navigation.navigate(
      //   "Adding",
      //   (date = date.toString()),
      //   (number = number)
      // );
    } else if (number == null) {
      ToastAndroid.show("Please fill up the fields", ToastAndroid.LONG);
    } else {
      ToastAndroid.show("only 1 to 10 Family Members can be added");
    }
  };

  return (
    <View className="p-2 pt-20 h-full">
      <DateTimePicker
        mode="single"
        date={date}
        onChange={(params) => setDate(params.date)}
      />

      <View className="justify-center items-center">
        <View>
          <Text className="text-xl" style={{ fontFamily: "outfit" }}>
            No of Family Members
          </Text>
          <TextInput
            className="h-10 m-3 border-2 p-2"
            keyboardType="numeric"
            value={number}
            onChangeText={setNumber}
          />
        </View>
      </View>
      <View className="absolute right-8 bottom-4 ">
        {/* <Button title="Ok" /> */}
        <TouchableOpacity onPress={setMembers}>
          <View className="bg-blue-800 h-20 w-20 justify-center items-center rounded-full">
            <Text className="text-white" style={{ fontFamily: "outfitbold" }}>
              OK
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
