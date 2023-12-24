import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const StarRating = ({ rating }: { rating: number }) => {
  // Calculate the number of full and half stars based on the rating
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  // Create an array to render the stars dynamically
  const stars = [];
  for (let i = 1; i <= 10; i++) {
    if (i <= fullStars) {
      stars.push(<FontAwesome key={i} name="star" size={15} color="#FFD700" />);
    } else if (i === fullStars + 1 && halfStar) {
      stars.push(
        <FontAwesome key={i} name="star-half-full" size={15} color="#FFD700" />
      );
    } else {
      stars.push(
        <FontAwesome key={i} name="star-o" size={15} color="#FFD700" />
      );
    }
  }

  return (
    <View style={styles.main}>
      <Text style={styles.rating}>{rating}</Text>
      {stars.map((star, index) => (
        <View key={index} style={styles.starView}>
          {star}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  main: { flexDirection: "row", alignItems: "center", marginVertical: 4 },
  starView: { marginLeft: 2 },
  rating: { marginRight: 5 },
});

export default StarRating;
