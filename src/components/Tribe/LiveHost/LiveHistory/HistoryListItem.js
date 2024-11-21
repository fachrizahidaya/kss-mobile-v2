import { Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomCard from "../../../../layouts/CustomCard";
import { Colors } from "../../../../styles/Color";
import { TextProps } from "../../../../styles/CustomStylings";

const HistoryListItem = ({ index, length, date, begin_time, end_time, brand, navigation, id }) => {
  return (
    <CustomCard
      index={index}
      length={length}
      handlePress={() => navigation.navigate("History Detail", { id: id })}
      gap={8}
    >
      <View style={{ gap: 5 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={[TextProps, { fontWeight: "600" }]}>{date}</Text>
          <Text style={[TextProps, { opacity: 0.5 }]}>
            {begin_time} - {end_time}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text
          style={[TextProps, { maxWidth: 300, overflow: "hidden", fontWeight: "600" }]}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {brand}
        </Text>
        <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.iconDark} />
      </View>
    </CustomCard>
  );
};

export default HistoryListItem;
