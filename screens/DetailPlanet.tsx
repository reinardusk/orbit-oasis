import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DetailPlanetParamsProps, Planet } from "../types/types";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { LinearGradient } from "expo-linear-gradient";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addWishlist, wishlistSelector } from "../redux/wishlistslice";
import BoxAlert from "../components/BoxAlert";

const DetailPlanet = () => {
  const AnimatedLinearGradient =
    Animated.createAnimatedComponent(LinearGradient);
  const route = useRoute<RouteProp<any>>();
  const { name, url } = route.params as DetailPlanetParamsProps;
  const [planet, setPlanet] = useState<Planet>({} as Planet);
  const [loading, setLoading] = useState<boolean>(false);
  const wishlist = useAppSelector(wishlistSelector);

  const dispatch = useAppDispatch();
  const navigate = useNavigation();

  const handleAddToWishlist = () => {
    if (wishlist.find((item) => item.name === planet.name)) {
      return BoxAlert("Error!", "Planet already in wishlist");
    }
    dispatch(addWishlist(planet));
    navigate.goBack();
    BoxAlert("Success!", `${planet.name} added to wishlist`);
  };

  const fetchPlanet = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(url);
      setPlanet(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPlanet();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <ImageBackground source={require("../assets/bg.jpg")} style={{ flex: 1 }}>
      <AnimatedLinearGradient
        colors={["rgba(0,0,0, 1)", "rgba(142, 5, 194, 0.4)"]}
        style={styles.container}
      >
        <View style={styles.container}>
          <Text style={styles.cardTitle}>{planet.name}</Text>

          <Text style={styles.text}>
            <Text style={{ ...styles.text, fontWeight: "700" }}>
              Rotation Period:
            </Text>{" "}
            {planet.rotation_period} hours
          </Text>
          <Text style={styles.text}>
            <Text style={{ ...styles.text, fontWeight: "700" }}>
              Orbital Period:
            </Text>{" "}
            {planet.orbital_period} days
          </Text>
          <Text style={styles.text}>
            <Text style={{ ...styles.text, fontWeight: "700" }}>Diameter:</Text>{" "}
            {planet.diameter} km
          </Text>
          <Text style={styles.text}>
            <Text style={{ ...styles.text, fontWeight: "700" }}>Climate: </Text>
            {planet.climate}
          </Text>
          <Text style={styles.text}>
            <Text style={{ ...styles.text, fontWeight: "700" }}>Gravity:</Text>{" "}
            {planet.gravity}
          </Text>
          <Text style={styles.text}>
            <Text style={{ ...styles.text, fontWeight: "700" }}>
              Diameter:{" "}
            </Text>
            Terrain {planet.terrain}
          </Text>
          <Text style={styles.text}>
            <Text style={{ ...styles.text, fontWeight: "700" }}>
              Surface Water:
            </Text>{" "}
            {planet.surface_water} km
          </Text>
          <Text style={styles.text}>
            <Text style={{ ...styles.text, fontWeight: "700" }}>
              Population:
            </Text>{" "}
            {planet.population}
          </Text>
          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={handleAddToWishlist}
          >
            <Text style={styles.wishlistText}>Add to Wishlist</Text>
          </TouchableOpacity>
        </View>
      </AnimatedLinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  text: {
    fontSize: 17,
    color: "white",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    margin: 10,
    borderColor: "white",
    borderBottomWidth: 1,
  },
  cardContainer: {
    padding: 10,
    margin: 10,
    backgroundColor: "#00adb5",
    borderRadius: 10,
  },
  wishlistButton: {
    backgroundColor: "#ff6584",
    padding: 10,
    borderRadius: 10,
    marginVertical: 15,
    alignItems: "center",
  },
  wishlistText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DetailPlanet;
