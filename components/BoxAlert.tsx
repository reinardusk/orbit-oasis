import { Alert } from "react-native";

const BoxAlert = (title: string, message: string, callback: any = () => null) =>
  Alert.alert(title, message, [
    {
      text: "Cancel",
      style: "cancel",
    },
    { text: "OK", onPress: callback },
  ]);

export default BoxAlert;
