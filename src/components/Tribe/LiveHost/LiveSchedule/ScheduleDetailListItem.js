import { Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CustomCard from "../../../../layouts/CustomCard";
import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";

const ScheduleDetailListItem = ({ navigation, begin_time, brand, end_time, min_achievement }) => {
  return (
    <CustomCard handlePress={() => navigation.navigate("")}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View>
          <Text style={[TextProps]}>{brand}</Text>
          <Text style={[TextProps]}>
            {begin_time} - {end_time}
          </Text>
          <Text style={[TextProps]}>Minimum Achievement: {min_achievement}</Text>
        </View>
        {/* <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.iconDark} /> */}
      </View>
    </CustomCard>
  );
};

export default ScheduleDetailListItem;
