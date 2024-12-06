import { useState } from "react";

import { LayoutAnimation, Pressable, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const FAQCard = ({ question, answer, index, length }) => {
  const [menuIndex, setMenuIndex] = useState(-1);

  return (
    <Pressable
      style={{ marginTop: 14, marginHorizontal: 16, marginBottom: index === length - 1 ? 14 : null }}
      activeOpacity={0.8}
      key={index}
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.create(200, "easeInEaseOut", "opacity"));
        setMenuIndex(menuIndex === index ? -1 : index);
      }}
    >
      <View style={styles.container}>
        <Text style={[TextProps, { color: Colors.fontLight, width: "80%" }]}>{question}</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={Colors.iconLight}
          style={{ transform: [{ rotate: menuIndex === index ? "90deg" : "0deg" }] }}
        />
      </View>
      {menuIndex === index && (
        <View
          style={{ backgroundColor: Colors.backgroundLight, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}
        >
          <TouchableNativeFeedback key={index}>
            <View style={{ padding: 10 }}>
              <Text style={[TextProps, { width: "90%" }]}>{answer}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      )}
    </Pressable>
  );
};

export default FAQCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
