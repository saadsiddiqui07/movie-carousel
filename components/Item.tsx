import React from "react";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ITEM_SIZE, SPACING, width } from "../constants";
import { Image, StyleSheet, Text, View } from "react-native";
import Rating from "./Rating";
import Genres from "./Genres";

interface Props {
  item: any;
  scrollX: SharedValue<number>;
  index: number;
}

const AnimatedItemComponent = Animated.createAnimatedComponent(View);

const Item = ({ index, item, scrollX }: Props) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: interpolate(scrollX.value, inputRange, [40, -30, 40]) },
      ],
    };
  });

  return (
    <Animated.View
      key={item.key}
      style={[{ width: width, marginTop: SPACING * 2 }, animatedImageStyle]}
    >
      <View
        style={{
          marginHorizontal: SPACING * 5,
          padding: SPACING * 2,
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 34,
        }}
      >
        <Image source={{ uri: item.poster }} style={[styles.posterImage]} />
        <Text style={{ fontSize: 24 }} numberOfLines={1}>
          {item.title}
        </Text>
        <Rating rating={item.rating} />
        <Genres genres={item.genres} />
      </View>
      <Text
        style={{
          fontSize: 12,
          marginHorizontal: SPACING * 2,
          textAlign: "center",
          marginTop: SPACING * 2,
        }}
        numberOfLines={3}
      >
        {item.description}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  posterImage: {
    width: ITEM_SIZE * 0.8,
    height: ITEM_SIZE * 1.1,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});
export default Item;
