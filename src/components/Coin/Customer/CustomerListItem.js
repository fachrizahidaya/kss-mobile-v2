import { Dimensions, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import AvatarPlaceholder from "../../../styles/AvatarPlaceholder";
import CustomCard from "../../../layouts/CustomCard";

const CustomerListItem = ({ name, phone, address, email, index, length }) => {
  const dataArr = [
    { title: "Phone", value: phone || "No Data" },
    { title: "Email", value: email || "No Data" },
    { title: "Address", value: address || "No Data" },
  ];

  const width = Dimensions.get("window").width - 100;

  return (
    <CustomCard index={index} length={length}>
      <View style={{ gap: 15 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <AvatarPlaceholder name={name} isThumb={false} size="lg" />
          <Text style={[TextProps, { maxWidth: width }]}>{name}</Text>
        </View>
        <View style={{ gap: 5 }}>
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

export default CustomerListItem;
