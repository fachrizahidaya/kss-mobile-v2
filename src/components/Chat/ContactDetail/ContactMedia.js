import { View, Text, Pressable, StyleSheet } from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { TextProps } from "../../../styles/CustomStylings";

const ContactMedia = ({ qty, navigation, media, docs }) => {
  const params = {
    media: media,
    docs: docs,
  };

  return (
    <View style={styles.container}>
      <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <MaterialIcons name="image" size={20} color="#377893" />
        <Text style={[{ fontSize: 14 }, TextProps]}>Media & Docs</Text>
      </Pressable>
      <Pressable
        style={{ flexDirection: "row", alignItems: "center", gap: 1 }}
        onPress={() => navigation.navigate("Media", params)}
      >
        <Text style={[{ fontSize: 14, opacity: 0.5 }, TextProps]}>{qty}</Text>
        <MaterialIcons name="chevron-right" size={10} style={{ opacity: 0.5 }} color="#3F434A" />
      </Pressable>
    </View>
  );
};

export default ContactMedia;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 5,
  },
});
