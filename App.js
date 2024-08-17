import Navigation from "./Navigation";
import "react-native-get-random-values";
import { Linking, Alert } from "react-native";
// import "react-native-gesture-handler";
import "./global.css";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export default function App() {
  const [fontsLoaded] = useFonts({
    outfit: require("./assets/fonts/Outfit-Regular.ttf"),
    outfitmedium: require("./assets/fonts/Outfit-Medium.ttf"),
    outfitbold: require("./assets/fonts/Outfit-Bold.ttf"),
  });

  useEffect(() => {
    // Function to handle incoming URLs
    const handleDeepLink = (event) => {
      const url = event.url;
      Alert.alert("Deep Link", `URL: ${url}`);
      // Add your custom logic to handle the URL here
    };

    // Add event listener for incoming URLs
    Linking.addEventListener("url", handleDeepLink);

    // Check if the app was opened with a URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    // Cleanup the event listener on component unmount
    return () => {
      Linking.removeEventListener("url", handleDeepLink);
    };
  }, []);

  useEffect(() => {
    async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
  }, [fontsLoaded]);

  return <Navigation />;
}
