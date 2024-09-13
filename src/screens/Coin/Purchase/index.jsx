import { useNavigation } from "@react-navigation/native";

import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../styles/Screen";
import CustomCard from "../../../styles/CustomCard";

const Purchase = () => {
  const navigation = useNavigation();
  const purchaseOptions = [
    {
      name: "Purchase Order",
      navigate: "Purchase Order",
    },
    {
      name: "Receive Purchase Order",
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
          <CustomCard
            key={index}
            index={index}
            length={purchaseOptions.length}
            handlePress={() => navigation.navigate(item.navigate)}
          >
            <View style={styles.content}>
              <Text style={[TextProps]}>{item.name}</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#3F434A" />
            </View>
          </CustomCard>
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
  },
});
