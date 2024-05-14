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
            Rotation Period: {planet.rotation_period} hours
          </Text>
          <Text style={styles.text}>
            Orbital Period: {planet.orbital_period} days
          </Text>
          <Text style={styles.text}>Diameter: {planet.diameter} km</Text>
          <Text style={styles.text}>Climate: {planet.climate}</Text>
          <Text style={styles.text}>Gravity: {planet.gravity}</Text>
          <Text style={styles.text}>Terrain: {planet.terrain}</Text>
          <Text style={styles.text}>
            Surface Water: {planet.surface_water} km
          </Text>
          <Text style={styles.text}>Population: {planet.population}</Text>
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
    fontSize: 18,
    color: "white",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 35,
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
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginVertical: 15,
    alignItems: "center",
  },
  wishlistText: {
    color: "#393e46",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DetailPlanet;
