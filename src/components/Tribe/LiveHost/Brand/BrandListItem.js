import { Text, View } from "react-native";

import CustomCard from "../../../../layouts/CustomCard";
import { TextProps } from "../../../../styles/CustomStylings";

const BrandListItem = ({ index, length, name }) => {
  return (
    <CustomCard index={index} length={length}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={[TextProps]}>{name}</Text>
      </View>
    </CustomCard>
  );
};

export default BrandListItem;
