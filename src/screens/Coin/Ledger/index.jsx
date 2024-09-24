import { useNavigation } from "@react-navigation/native";

import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../layouts/Screen";
import CustomCard from "../../../layouts/CustomCard";

const Ledger = () => {
  const navigation = useNavigation();

  const ledgerOptions = [
    {
      name: "COA",
      navigate: "COA",
    },
    {
      name: "Journal",
      navigate: "Journal",
    },
    {
      name: "Account History",
      navigate: "Account History",
    },
    {
      name: "Journal Logs",
      navigate: "Journal Log",
    },
  ];

  return (
    <Screen screenTitle="Ledger" returnButton={true} onPress={() => navigation.goBack()}>
      {ledgerOptions.map((item, index) => {
        return (
          <CustomCard
            key={index}
            index={index}
            length={ledgerOptions.length}
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

export default Ledger;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
