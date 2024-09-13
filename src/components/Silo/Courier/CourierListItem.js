import { Image, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../styles/CustomCard";

const CourierListItem = ({ name, prefix, image, index, length }) => {
  return (
    <CustomCard index={index} length={length}>
      <View style={[styles.content]}>
        <Text style={[TextProps]}>
          {name} - {prefix}
        </Text>
        <Image
          style={styles.image}
          source={{ uri: `${process.env.EXPO_PUBLIC_API}/image/${image}` }}
          alt="Courier Image"
          resizeMethod="auto"
          fadeDuration={0}
        />
      </View>
    </CustomCard>
  );
};

export default CourierListItem;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
});
