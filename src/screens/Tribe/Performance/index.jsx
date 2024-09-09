import { useNavigation } from "@react-navigation/native";

import { Pressable, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import { card } from "../../../styles/Card";
import Screen from "../../../styles/Screen";

const Evaluation = () => {
  const navigation = useNavigation();

  const options = [
    { name: "Employee KPI", navigate: "Employee KPI" },
    { name: "Employee Appraisal", navigate: "Employee Appraisal" },
    { name: "Employee Review", navigate: "Employee Review" },
    { name: "Performance Result", navigate: "Performance Result" },
  ];

  return (
    <Screen screenTitle="Evaluation">
      <View>
        {options.map((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => navigation.navigate(item.navigate)}
              style={[
                card.card,
                { marginTop: 14, marginBottom: index === options.length - 1 ? 14 : null, marginHorizontal: 16 },
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={[{ fontSize: 14, color: "#3F434A" }, TextProps]}>{item.name}</Text>
                <MaterialCommunityIcons name="chevron-right" size={20} color="#3F434A" />
              </View>
            </Pressable>
          );
        })}
      </View>
    </Screen>
  );
};

export default Evaluation;
