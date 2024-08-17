import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function Date({ name, eventDate }) {
  const [date, setDate] = useState(dayjs().toDate());

  const show = async (mod) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (e, s) => {
        setDate(s);
      },
      mode: mod,
    });
  };

  eventDate(date);

  useEffect(() => {
    console.log(date);
    console.log(name);
  }, [date]);

  return (
    <View>
      <Text style={{ fontFamily: "outfit" }}>{name}</Text>
      <Pressable onPress={() => show("date")} className="p-4 bg-gray-900">
        <Text className="text-white" style={{ fontFamily: "outfit" }}>
          {date.getDate()}-{date.getMonth()}-{date.getFullYear()}
        </Text>
      </Pressable>
    </View>
  );
}
