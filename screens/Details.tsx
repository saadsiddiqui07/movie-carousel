import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { height, width } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootParams } from "../navigation/main";
import * as Animatable from "react-native-animatable";
import StarRating from "../components/Rating";
import Genres from "../components/Genres";
import Animated from "react-native-reanimated";

const animation = {
  0: { opacity: 0, height: 0 },
  1: { opacity: 1, height: height * 0.6 },
};

const detailsAnimation = {
  0: { opacity: 0, translateY: 30 },
  1: { opacity: 1, translateY: 0 },
};

const intoductionAnimation = {
  0: { opacity: 0, translateX: width },
  1: { opacity: 1, translateX: 0 },
};

const Details = ({ route }: any) => {
  const { item } = route.params;
  const navigation = useNavigation<NavigationProp<RootParams>>();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: "absolute", top: 60, left: 20, zIndex: 1 }}
      >
        <Ionicons name="close-circle-sharp" size={35} color={"white"} />
      </TouchableOpacity>
      <Animated.Image
        source={{ uri: item.poster }}
        style={{
          height: height * 0.6,
          width: width * 0.7,
          resizeMode: "cover",
        }}
      />
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: "#000", opacity: 0.5 },
        ]}
      />
      <Animatable.View
        animation={animation}
        duration={800}
        style={{
          backgroundColor: "white",
          position: "absolute",
          zIndex: 1,
          bottom: 0,
          width: width,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          flexDirection: "column",
          padding: 20,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Animatable.Text
              animation={detailsAnimation}
              delay={300}
              style={{
                fontSize: 22,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {item.title}
            </Animatable.Text>
            <Animatable.View
              animation={detailsAnimation}
              delay={500}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <StarRating rating={item.rating} />
              <Genres genres={item.genres} />
            </Animatable.View>
          </View>
          <Animatable.View
            animation={detailsAnimation}
            delay={700}
            style={{ marginTop: 15 }}
          >
            <Text
              style={{
                fontWeight: "800",
                fontSize: 16,
                textTransform: "uppercase",
              }}
            >
              Introduction
            </Text>
            <Text style={{ fontWeight: "500", color: "gray", fontSize: 14 }}>
              {item.description}
            </Text>
          </Animatable.View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});
