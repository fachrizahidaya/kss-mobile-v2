import { Image, StyleSheet, Text, View } from "react-native";

import CustomCard from "../../../layouts/CustomCard";

const CourierPickupItem = ({ awb, courier, image, index, length }) => {
  return (
    <CustomCard index={index} length={length} gap={2}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image
          style={styles.image}
          source={{ uri: `${process.env.EXPO_PUBLIC_API}/image/${image}` }}
          alt="Courier Image"
          resizeMethod="auto"
          fadeDuration={0}
        />
        <Text>{courier}</Text>
      </View>
      <Text>{awb}</Text>
    </CustomCard>
  );
};

export default CourierPickupItem;

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
});
