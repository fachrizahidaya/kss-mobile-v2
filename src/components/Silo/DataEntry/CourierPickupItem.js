import { Image, StyleSheet, Text, View } from "react-native";

import CustomCard from "../../../layouts/CustomCard";
import { TextProps } from "../../../styles/CustomStylings";

const CourierPickupItem = ({ awb, courier, image, index, length, time }) => {
  return (
    <CustomCard index={index} length={length} gap={8}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
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
        <Text style={[TextProps, { opacity: 0.5 }]}>{time}</Text>
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
