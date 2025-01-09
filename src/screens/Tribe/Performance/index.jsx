import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../layouts/Screen";
import CustomCard from "../../../layouts/CustomCard";
import { Colors } from "../../../styles/Color";

const Evaluation = () => {
  const navigation = useNavigation();
  const userSelector = useSelector((state) => state.auth);
  const menu = JSON.parse(userSelector?.user_role_menu)?.menu;
  const subMenu = menu[5]?.sub;

  const excludeSubMenu = ["Performance Review", "Performance KPI", "Performance Appraisal"];

  const filteredEvaluationOptions = subMenu?.filter((item) => !excludeSubMenu?.includes(item?.name));

  const filteredAuthorizationOptions = filteredEvaluationOptions?.filter((item) => item?.is_allow === true);

  const evaluationOptions = filteredAuthorizationOptions?.map((item) => ({
    name: item?.name,
    navigate: item?.name,
  }));

  return (
    <Screen screenTitle="Evaluation">
      <View>
        {evaluationOptions.map((item, index) => {
          return (
            <CustomCard
              key={index}
              handlePress={() => navigation.navigate(item.navigate)}
              index={index}
              length={evaluationOptions.length}
            >
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={[{ fontSize: 14, color: Colors.iconDark }, TextProps]}>{item.name}</Text>
                <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.iconDark} />
              </View>
            </CustomCard>
          );
        })}
      </View>
    </Screen>
  );
};

export default Evaluation;
