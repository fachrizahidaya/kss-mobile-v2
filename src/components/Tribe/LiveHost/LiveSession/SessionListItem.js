import { Text } from "react-native";
import CustomCard from "../../../../layouts/CustomCard";
import { TextProps } from "../../../../styles/CustomStylings";

const SessionListItem = ({ index, length, name, begin_time, end_time }) => {
  return (
    <CustomCard index={index} length={length} gap={8}>
      <Text style={[TextProps]}>{name}</Text>
      <Text style={[TextProps]}>{`${begin_time} - ${end_time}` || "-"}</Text>
    </CustomCard>
  );
};

export default SessionListItem;
