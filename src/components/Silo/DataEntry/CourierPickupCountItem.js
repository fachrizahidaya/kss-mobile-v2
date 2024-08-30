import { Image, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";

const CourierPickupCountItem = ({ image, count, name, index, length }) => {
  return (
    <View style={[styles.container, { marginLeft: 14, marginRight: index === length - 1 ? 14 : null }]}>
      <View style={styles.wrapper}>
        <Image
          style={styles.image}
          source={{ uri: `${process.env.EXPO_PUBLIC_API}/image/${image}` }}
          alt="Courier Image"
          resizeMethod="auto"
          fadeDuration={0}
        />

        <Text style={[TextProps]}>{count}</Text>
      </View>
      <Text style={{ fontSize: 10 }}>{name}</Text>
    </View>
  );
};

export default CourierPickupCountItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 3,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  image: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },
});
