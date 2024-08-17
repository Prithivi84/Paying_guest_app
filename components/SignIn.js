import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import { useAuthRequest } from "expo-auth-session/build/providers/Google";
import Constants from "expo-constants";
import { makeRedirectUri } from "expo-auth-session";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const navigation = useNavigation();

  // const [userInfo, setUser] = useState();
  // const [req, res, SignIn] = useAuthRequest({
  //   webClientId:
  //     "383929927836-d79t3o4qol7j8uj66ogm2i8qeg2dkil1.apps.googleusercontent.com",
  // });

  // useEffect(() => {
  //   if (res?.type == "success") {
  //     const { id_token } = res.params;
  //     const credential = GoogleAuthProvider.credential(id_token);
  //     signInWithCredential(auth, credential);
  //   }
  // }, [res]);

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       console.log(JSON.stringify(user, null, 2));
  //     } else {
  //       console.log("error");
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       "383929927836-d79t3o4qol7j8uj66ogm2i8qeg2dkil1.apps.googleusercontent.com",
  //   });
  // }, []);

  //   const sign = async () => {
  //     try {
  //       await GoogleSignin.hasPlayServices();
  //       const user = await GoogleSignin.signIn();
  //       setUser(user);

  //       console.log(JSON.stringify(user));
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   const log = () => {
  //     setUser();
  //     GoogleSignin.revokeAccess();
  //     GoogleSignin.signOut();
  //   };

  return (
    <SafeAreaView style={{}}>
      <Text>SignIn</Text>
      <Button
        onPress={() => {
          navigation.navigate("Rooms");
        }}
        title="Login google"
      />
      {/* <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => {
          // initiate sign in
          sign;
        }}
        disabled={isInProgress}
      />
      ; */}
    </SafeAreaView>
  );
}
