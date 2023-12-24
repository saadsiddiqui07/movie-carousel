import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { BACKDROP_HEIGHT, ITEM_SIZE, height, width } from "../constants";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Rect } from "react-native-svg";

interface Props {
  movies: any[];
  scrollX: SharedValue<number>;
}

const AnimatedComponent = Animated.createAnimatedComponent(Svg);

const Item = ({ item, index, scrollX }: any) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width],
            [-width, 0]
          ),
        },
      ],
    };
  });
  return (
    <MaskedView
      style={{ position: "absolute" }}
      maskElement={
        <AnimatedComponent
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={[animatedStyle]}
        >
          <Rect width={width} height={height} fill={"red"} x="0" y="0" />
        </AnimatedComponent>
      }
    >
      <Image
        source={{ uri: item.backdrop }}
        style={{ width, height: BACKDROP_HEIGHT, resizeMode: "cover" }}
      />
    </MaskedView>
  );
};

const Backdrop = ({ movies, scrollX }: Props) => {
  return (
    <View style={{ position: "absolute", width, height: BACKDROP_HEIGHT }}>
      <FlatList
        data={movies}
        keyExtractor={(data) => data.key}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => (
          <Item item={item} index={index} scrollX={scrollX} />
        )}
      />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "white"]}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: "absolute",
          bottom: 0,
        }}
      />
    </View>
  );
};

export default Backdrop;

const styles = StyleSheet.create({});
