import { Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomCard from "../../../../layouts/CustomCard";
import { Colors } from "../../../../styles/Color";
import { TextProps } from "../../../../styles/CustomStylings";

const HistoryListItem = ({ index, length, date, begin_time, end_time, brand }) => {
  return (
    <CustomCard index={index} length={length}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View>
          <Text style={[TextProps]}>{date}</Text>
          <Text style={[TextProps]}>{brand}</Text>
          <Text style={[TextProps]}>
            {begin_time} - {end_time}
          </Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.iconDark} />
      </View>
    </CustomCard>
  );
};

export default HistoryListItem;
