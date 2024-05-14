import { ActivityIndicator, StyleSheet, View } from "react-native";

const ScrollLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ff6584" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: "15%",
    left: "50%",
    zIndex: 10,
  },
});
export default ScrollLoading;
