import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getMovies } from "./api";
import Rating from "./components/Rating";
import Genres from "./components/Genres";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const SPACING = 10;
// const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const ITEM_SIZE = width;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

interface Props {
  item: any;
  scrollX: SharedValue<number>;
  index: number;
}

const Item = ({ index, item, scrollX }: Props) => {
  const inputRange = [
    (index - 0.6) * width,
    index * width,
    (index + 0.6) * width,
  ];
  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(scrollX.value, inputRange, [0, 1, 0]) }],
    };
  });

  return (
    <View key={item.key} style={{ width: ITEM_SIZE }}>
      <View
        style={{
          marginHorizontal: SPACING,
          padding: SPACING * 2,
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 34,
        }}
      >
        <Animated.Image
          source={{ uri: item.poster }}
          style={[styles.posterImage]}
        />
        <Text style={{ fontSize: 24 }} numberOfLines={1}>
          {item.title}
        </Text>
        <Rating rating={item.rating} />
        <Genres genres={item.genres} />
        <Text style={{ fontSize: 12 }} numberOfLines={3}>
          {item.description}
        </Text>
      </View>
    </View>
  );
};

export default function App() {
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
      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_SIZE}
        pagingEnabled
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
          backgroundColor: "black",
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 10,
          // marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", fontWeight: "900", fontSize: 15 }}>
          Book Tickets
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  posterImage: {
    width: ITEM_SIZE * 0.75,
    height: ITEM_SIZE * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});
