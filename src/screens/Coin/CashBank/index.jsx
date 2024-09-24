import { useNavigation } from "@react-navigation/native";

import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../layouts/Screen";
import CustomCard from "../../../styles/CustomCard";

const CashBank = () => {
  const navigation = useNavigation();

  const cashBankOptions = [
    {
      name: "Payment",
      navigate: "Payment",
    },
    {
      name: "Receipt",
      navigate: "Receipt",
    },
    {
      name: "Bank Transfer",
      navigate: "Bank Transfer",
    },
    {
      name: "Bank History",
      navigate: "Bank History",
    },
  ];

  return (
    <Screen screenTitle="Cash & Bank" returnButton={true} onPress={() => navigation.goBack()}>
      {cashBankOptions.map((item, index) => {
        return (
          <CustomCard
            key={index}
            index={index}
            length={cashBankOptions.length}
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

export default CashBank;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
