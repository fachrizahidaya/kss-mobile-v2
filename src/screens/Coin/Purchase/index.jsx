import { useNavigation } from "@react-navigation/native";

import { Pressable, StyleSheet, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { card } from "../../../styles/Card";
import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../styles/Screen";

const Purchase = () => {
  const navigation = useNavigation();
  const purchaseOptions = [
    {
      name: "Purchase Order",
      navigate: "Purchase Order",
    },
    {
      name: "Receipt Purchase Order",
      navigate: "Receipt Purchase Order",
    },
    {
      name: "Supplier",
      navigate: "Supplier",
    },
  ];

  return (
    <Screen screenTitle="Purchase" returnButton={true} onPress={() => navigation.goBack()}>
      {purchaseOptions.map((item, index) => {
        return (
          <Pressable
            key={index}
            style={[card.card, styles.content, { marginBottom: index === purchaseOptions.length - 1 ? 14 : null }]}
            onPress={() => navigation.navigate(item.navigate)}
          >
            <Text style={[TextProps]}>{item.name}</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#3F434A" />
          </Pressable>
        );
      })}
    </Screen>
  );
};

export default Purchase;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 14,
  },
});
