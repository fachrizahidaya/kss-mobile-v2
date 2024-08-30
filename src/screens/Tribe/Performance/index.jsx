import { useNavigation } from "@react-navigation/native";

import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import PageHeader from "../../../styles/PageHeader";
import { TextProps } from "../../../styles/CustomStylings";
import { card } from "../../../styles/Card";

const Evaluation = () => {
  const navigation = useNavigation();

  const options = [
    { name: "Employee KPI", navigate: "Employee KPI" },
    { name: "Employee Appraisal", navigate: "Employee Appraisal" },
    { name: "Employee Review", navigate: "Employee Review" },
    { name: "Performance Result", navigate: "Performance Result" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PageHeader title="Evaluation" backButton={false} />
      </View>
      <View>
        {options.map((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => navigation.navigate(item.navigate)}
              style={[card.card, { marginVertical: 4, marginHorizontal: 16 }]}
            >
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={[{ fontSize: 14, color: "#3F434A" }, TextProps]}>{item.name}</Text>
                <MaterialCommunityIcons name="chevron-right" size={20} color="#3F434A" />
              </View>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default Evaluation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
