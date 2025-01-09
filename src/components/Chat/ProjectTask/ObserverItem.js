import { View, Text } from "react-native";

import AvatarPlaceholder from "../../../styles/AvatarPlaceholder";
import { TextProps } from "../../../styles/CustomStylings";

const ObserverItem = ({ name, image }) => {
  return (
    <View style={{ flexDirection: "row", gap: 5, padding: 5 }}>
      <AvatarPlaceholder name={name} image={image} />
      <Text style={[{ fontSize: 12 }, TextProps]}>{name}</Text>
    </View>
  );
};

export default ObserverItem;
