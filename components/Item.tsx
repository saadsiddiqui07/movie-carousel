import React from "react";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ITEM_SIZE, SPACING, width } from "../constants";
import { StyleSheet, Text, View } from "react-native";
import Rating from "./Rating";
import Genres from "./Genres";

interface Props {
  item: any;
  scrollX: SharedValue<number>;
  index: number;
}

const Item = ({ index, item, scrollX }: Props) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(scrollX.value, inputRange, [0, -40, 0]) },
      ],
    };
  });

  return (
    <View key={item.key} style={{ width: width }}>
      <View
        style={{
          marginHorizontal: SPACING * 5,
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
      </View>
      <Text
        style={{ fontSize: 12, marginHorizontal: SPACING * 2 }}
        numberOfLines={3}
      >
        {item.description}
      </Text>
    </View>
  );
};

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
export default Item;
