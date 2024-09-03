import { useNavigation } from "@react-navigation/native";

import { Pressable, Text, View } from "react-native";
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
    <Screen screenTitle="Inventory" mainScreen={true}>
      <View style={{ paddingHorizontal: 16 }}>
        {inventoryOptions.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={[
                card.card,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 16,
                  paddingHorizontal: 14,
                  marginVertical: 4,
                },
              ]}
              onPress={() => navigation.navigate(item.navigate)}
            >
              <Text style={[TextProps]}>{item.name}</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#3F434A" />
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
};

export default Inventory;
