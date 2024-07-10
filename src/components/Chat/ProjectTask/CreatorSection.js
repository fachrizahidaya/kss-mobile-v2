import { View, Pressable, Text, StyleSheet } from "react-native";

import AvatarPlaceholder from "../../../styles/AvatarPlaceholder";
import { TextProps } from "../../../styles/CustomStylings";

const CreatorSection = ({ name, image }) => {
  return (
    <Pressable style={styles.container}>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Text style={[{ fontSize: 12 }, TextProps]}>Created by</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <AvatarPlaceholder name={name} image={image} />
        <Text style={[{ fontSize: 12 }, TextProps]}>{name}</Text>
      </View>
    </Pressable>
  );
};

export default CreatorSection;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    padding: 5,
    gap: 5,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
});
