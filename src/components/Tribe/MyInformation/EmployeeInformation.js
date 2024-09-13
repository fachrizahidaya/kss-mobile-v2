import { View, Text, Pressable } from "react-native";

import AvatarPlaceholder from "../../../styles/AvatarPlaceholder";
import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../styles/CustomCard";

const EmployeeInformation = ({ id, name, position, email, phone, image, navigation }) => {
  const navigateToProfileHandler = () => {
    navigation.navigate("Employee Profile", {
      employeeId: id,
      returnPage: "My Information",
      loggedEmployeeImage: image,
      loggedEmployeeId: id,
    });
  };

  return (
    <CustomCard gap={20}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 5 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Pressable onPress={() => navigateToProfileHandler()}>
            <AvatarPlaceholder image={image} name={name} size="lg" isThumb={false} />
          </Pressable>
          <View>
            <Text style={{ fontSize: 14, fontWeight: "500", color: "#3F434A" }}>
              {name.length > 30 ? name.split(" ")[0] : name}
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "400", color: "#8A9099" }}>{position}</Text>
          </View>
        </View>
      </View>

      <View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={[{ fontSize: 12 }, TextProps]}>Phone:</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: "400", color: "#8A9099" }} onPress={() => CopyToClipboard(phone)}>
              {phone}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={[{ fontSize: 12 }, TextProps]}>Email:</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: "400", color: "#8A9099" }} onPress={() => CopyToClipboard(email)}>
              {email}
            </Text>
          </View>
        </View>
      </View>
    </CustomCard>
  );
};

export default EmployeeInformation;
