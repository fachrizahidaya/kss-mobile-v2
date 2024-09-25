import { useNavigation } from "@react-navigation/native";

import { Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../layouts/Screen";
import CustomCard from "../../../layouts/CustomCard";

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
            <CustomCard
              key={index}
              handlePress={() => navigation.navigate(item.navigate)}
              index={index}
              length={options.length}
            >
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={[{ fontSize: 14, color: "#3F434A" }, TextProps]}>{item.name}</Text>
                <MaterialCommunityIcons name="chevron-right" size={20} color="#3F434A" />
              </View>
            </CustomCard>
          );
        })}
      </View>
    </Screen>
  );
};

export default Evaluation;
