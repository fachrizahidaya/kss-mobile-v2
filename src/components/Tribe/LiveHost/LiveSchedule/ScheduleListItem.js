import { Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TextProps } from "../../../../styles/CustomStylings";
import CustomCard from "../../../../layouts/CustomCard";
import { Colors } from "../../../../styles/Color";

const ScheduleListItem = ({ index, length, id, date, navigation }) => {
  return (
    <CustomCard index={index} length={length} handlePress={() => navigation.navigate("Schedule Detail", { id: id })}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={[TextProps]}>{date}</Text>
        <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.iconDark} />
      </View>
    </CustomCard>
  );
};

export default ScheduleListItem;
