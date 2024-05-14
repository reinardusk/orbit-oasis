import {
  Animated,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeWishlist, wishlistSelector } from "../redux/wishlistslice";
import { LinearGradient } from "expo-linear-gradient";
import BoxAlert from "../components/BoxAlert";

const WishlistPlanet = () => {
  const AnimatedLinearGradient =
    Animated.createAnimatedComponent(LinearGradient);

  const HorizontalLinearGradient =
    Animated.createAnimatedComponent(LinearGradient);

  const wishlist = useAppSelector(wishlistSelector);
  const dispatch = useAppDispatch();

  const removePlanet = (name: string) => {
    BoxAlert(
      "Remove Planet",
      `Are you sure you want to remove ${name} from wishlist?`,
      () => dispatch(removeWishlist({ name }))
    );
  };
  return (
    <ImageBackground source={require("../assets/bg.jpg")} style={{ flex: 1 }}>
      <AnimatedLinearGradient
        colors={["rgba(0,0,0, 1)", "rgba(142, 5, 194, 0.4)"]}
        style={styles.container}
      >
        <Text style={styles.title}>Wishlist Planet</Text>
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <HorizontalLinearGradient
              colors={["rgba(142, 5, 194, 0.6)", "rgba(0,0,0, 0.9)"]}
              start={[0, 1]}
              end={[1, 0]}
              style={styles.cardContainer}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removePlanet(item.name)}
                >
                  <Text style={styles.text}>Remove</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cardBodyContainer}>
                <View>
                  <Text style={styles.text}>
                    Rotation Period: {item.rotation_period} hours
                  </Text>
                  <Text style={styles.text}>
                    Orbital Period: {item.orbital_period} days
                  </Text>
                  <Text style={styles.text}>Climate: {item.climate}</Text>
                </View>
              </View>
            </HorizontalLinearGradient>
          )}
        />
      </AnimatedLinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  cardContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e30b5a",
    padding: 5,
    borderRadius: 5,
  },
  removeText: {
    color: "white",
    marginRight: 5,
  },
  cardBodyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  text: {
    color: "white",
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
});

export default WishlistPlanet;
