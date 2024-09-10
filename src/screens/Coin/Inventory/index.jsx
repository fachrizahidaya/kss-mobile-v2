import { useNavigation } from "@react-navigation/native";

import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { card } from "../../../styles/Card";
import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../styles/Screen";

const Inventory = () => {
  const navigation = useNavigation();

  const inventoryOptions = [
    {
      name: "Item per Warehouse",
      navigate: "Item Warehouse",
    },
    {
      name: "Item Minimum Stock",
      navigate: "Item Minimum",
    },
  ];

  return (
    <Screen screenTitle="Inventory" returnButton={true} onPress={() => navigation.goBack()}>
      {inventoryOptions.map((item, index) => {
        return (
          <Pressable
            key={index}
            style={[card.card, styles.container, { marginBottom: index === inventoryOptions.length - 1 ? 14 : null }]}
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

export default Inventory;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
    marginHorizontal: 16,
  },
});
