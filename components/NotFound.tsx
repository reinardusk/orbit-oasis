import LottieView from "lottie-react-native";
import { StyleSheet, Text, View } from "react-native";

const NotFound = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>404 Not Found</Text>
      <LottieView
        source={require("../assets/animation404.json")}
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  lottie: {
    flex: 1,
    width: 100,
    height: 100,
  },
});

export default NotFound;
