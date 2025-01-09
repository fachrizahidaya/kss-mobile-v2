import { Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../../styles/CustomStylings";
import CustomCard from "../../../../layouts/CustomCard";

const AppraisalDetailItem = ({
  choice,
  description,
  item,
  choice_a,
  choice_b,
  choice_c,
  choice_d,
  choice_e,
  handleOpen,
  employeeAppraisalValue,
  index,
  length,
}) => {
  return (
    <CustomCard index={index} length={length} handlePress={() => handleOpen(item, employeeAppraisalValue)} gap={10}>
      <Text style={[TextProps]}>{description}</Text>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <MaterialCommunityIcons name="widgets-outline" size={15} style={{ opacity: 0.5 }} />

        <Text style={[{ width: "80%", overflow: "hidden" }, TextProps]} ellipsizeMode="tail" numberOfLines={1}>
          {choice == "a"
            ? choice_a
            : choice == "b"
            ? choice_b
            : choice == "c"
            ? choice_c
            : choice == "d"
            ? choice_d
            : choice == "e"
            ? choice_e
            : "Select your answer"}
        </Text>
      </View>
    </CustomCard>
  );
};

export default AppraisalDetailItem;
