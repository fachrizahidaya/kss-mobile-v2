import { Dimensions, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import AvatarPlaceholder from "../../../styles/AvatarPlaceholder";
import CustomCard from "../../../layouts/CustomCard";

const SupplierListItem = ({ id, name, phone, address, email, index, length, navigation }) => {
  const dataArr = [
    { title: "Phone", value: phone || "-" },
    { title: "Email", value: email || "-" },
  ];

  const width = Dimensions.get("window").width - 100;

  return (
    <CustomCard
      index={index}
      length={length}
      gap={8}
      handlePress={() => navigation.navigate("Supplier Detail", { id: id })}
    >
      <View style={{ gap: 15 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <AvatarPlaceholder name={name} isThumb={false} size="md" />
          <Text
            style={[TextProps, { maxWidth: width, overflow: "hidden", fontWeight: "600" }]}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {name}
          </Text>
        </View>
        <View style={{ marginTop: 8, gap: 8 }}>
          {dataArr.map((item, index) => {
            return (
              <View key={index} style={{ flexDirection: "row", justifyContent: "space-between", gap: 5 }}>
                <Text style={[TextProps]}>{item.title} </Text>
                <Text style={[TextProps, { opacity: 0.5, textAlign: "right", width: "60%" }]}>{item.value}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </CustomCard>
  );
};

export default SupplierListItem;
