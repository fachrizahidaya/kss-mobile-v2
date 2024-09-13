import { Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../styles/CustomCard";

const ActivityListItem = ({ message, name, date, index, length }) => {
  return (
    <CustomCard index={index} length={length} gap={8}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={[TextProps]}>{name}</Text>
        <Text style={[TextProps, { opacity: 0.5, textAlign: "right", width: "60%" }]}>{date}</Text>
      </View>

      <Text style={[TextProps]}>{message}</Text>
    </CustomCard>
  );
};

export default ActivityListItem;
