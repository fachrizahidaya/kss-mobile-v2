import { useNavigation } from "@react-navigation/native";

import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../layouts/Screen";
import CustomCard from "../../../styles/CustomCard";

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
          <CustomCard
            key={index}
            index={index}
            length={inventoryOptions.length}
            handlePress={() => navigation.navigate(item.navigate)}
          >
            <View style={styles.container}>
              <Text style={[TextProps]}>{item.name}</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#3F434A" />
            </View>
          </CustomCard>
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
  },
});
