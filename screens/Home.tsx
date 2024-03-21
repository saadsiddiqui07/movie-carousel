import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { getMovies } from "../api";
import Backdrop from "../components/Backdrop";
import { ITEM_SIZE, width } from "../constants";
import Item from "../components/Item";

export default function HomeScreen() {
  const scrollX = useSharedValue(0);
  const [movies, setMovies] = useState<any[]>([]);

  const scrollXHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMovies();
      setMovies(data);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Backdrop movies={movies} scrollX={scrollX} />
      <Animated.FlatList
        removeClippedSubviews
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        bounces={false}
        decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: "center" }}
        snapToAlignment="start"
        data={movies}
        keyExtractor={(data) => data.key}
        renderItem={({ item, index }) => (
          <Item item={item} index={index} scrollX={scrollX} />
        )}
        onScroll={scrollXHandler}
        scrollEventThrottle={16}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          alignSelf: "center",
          backgroundColor: "#0f172a",
          paddingHorizontal: 20,
          paddingVertical: 10,
          width: "80%",
          // marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "800",
            fontSize: 15,
            textAlign: "center",
          }}
        >
          Buy Ticket
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  posterImage: {
    width: "100%",
    height: ITEM_SIZE * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});
