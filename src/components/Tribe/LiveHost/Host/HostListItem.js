import { Text } from "react-native";

import CustomCard from "../../../../layouts/CustomCard";
import { TextProps } from "../../../../styles/CustomStylings";

const HostListItem = ({ index, length, name, host_type }) => {
  return (
    <CustomCard index={index} length={length} gap={8}>
      <Text style={[TextProps]}>{name}</Text>
      <Text style={[TextProps, { opacity: 0.5 }]}>{host_type}</Text>
    </CustomCard>
  );
};

export default HostListItem;
