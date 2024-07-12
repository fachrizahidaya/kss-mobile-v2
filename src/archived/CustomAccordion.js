import { View, Pressable, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useDisclosure } from "../../hooks/useDisclosure";
import { TextProps } from "../styles/CustomStylings";

const CustomAccordion = ({ children, title, subTitle, hasAction }) => {
  const { isOpen, toggle } = useDisclosure(true);

  return (
    <View style={{ gap: 15 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View>
          <Pressable style={{ flexDirection: "row", gap: 4 }} onPress={toggle}>
            <MaterialCommunityIcons name={isOpen ? "chevron-up" : "chevron-down"} size={20} color="#3F434A" />
            <Text style={({ fontSize: 16 }, TextProps)}>{title}</Text>
            <Text style={({ fontSize: 16 }, TextProps)}>({subTitle})</Text>
          </Pressable>
        </View>

        {hasAction && (
          <Pressable>
            <MaterialCommunityIcons name="dots-horizontal" size={20} color="#3F434A" />
          </Pressable>
        )}
      </View>

      {isOpen && children}
    </View>
  );
};

export default CustomAccordion;
