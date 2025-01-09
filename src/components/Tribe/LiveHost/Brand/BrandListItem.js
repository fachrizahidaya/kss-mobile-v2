import { Text } from "react-native";

import CustomCard from "../../../../layouts/CustomCard";
import { TextProps } from "../../../../styles/CustomStylings";

const BrandListItem = ({ index, length, name }) => {
  return (
    <CustomCard index={index} length={length}>
      <Text style={[TextProps]}>{name}</Text>
    </CustomCard>
  );
};

export default BrandListItem;
