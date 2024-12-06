import dayjs from "dayjs";

import { StyleSheet, View, Text, Platform, Pressable } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { CopyToClipboard } from "../../../styles/buttons/CopyToClipboard";
import { TextProps } from "../../../styles/CustomStylings";
import AvatarPlaceholder from "../../../styles/AvatarPlaceholder";
import { Colors } from "../../../styles/Color";

const EmployeeProfile = ({ employee, teammates, reference }) => {
  return (
    <>
      <View style={{ ...styles.avatar, bottom: Platform.OS === "android" ? 90 : 50 }}>
        <AvatarPlaceholder size="xl" name={employee?.data?.name} image={employee?.data?.image} isThumb={false} />
      </View>

      <View style={{ marginTop: Platform.OS === "android" ? -80 : -40 }}>
        <View style={styles.content}>
          <View>
            <View style={styles.information}>
              <Text style={{ fontSize: 20, fontWeight: "400", color: Colors.iconDark }}>
                {employee?.data?.name.length > 30 ? employee?.data?.name.split(" ")[0] : employee?.data?.name}
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "400", color: "#8A9099" }}>
                {`(${employee?.data?.gender.charAt(0).toUpperCase() + employee?.data?.gender.slice(1)})`}
              </Text>
            </View>

            <Text style={{ fontSize: 14, fontWeight: "400", color: "#8A9099" }}>{employee?.data?.position_name}</Text>
          </View>
          <View>
            <View style={styles.information}>
              <MaterialCommunityIcons name="phone-outline" size={10} color={Colors.iconDark} />
              <Pressable onPress={() => CopyToClipboard(employee?.data?.phone_number)}>
                <Text style={{ fontSize: 12, fontWeight: "400", color: "#8A9099" }}>
                  {employee?.data?.phone_number}
                </Text>
              </Pressable>
            </View>
            <View style={styles.information}>
              <MaterialCommunityIcons name="cake-variant-outline" size={10} color={Colors.iconDark} />
              <Text style={{ fontSize: 12, fontWeight: "400", color: "#8A9099" }}>
                {dayjs(employee?.data?.birthdate).format("DD MMM YYYY")}
              </Text>
            </View>
          </View>
          <View style={styles.information}>
            <Text style={[{ fontSize: 12 }, TextProps]}>{teammates?.data.length}</Text>
            <Pressable
              onPress={() => {
                reference.current?.show();
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: "400", color: "#8A9099" }}>Teammates</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

export default EmployeeProfile;

const styles = StyleSheet.create({
  avatar: {
    marginBottom: 5,
    position: "relative",

    paddingHorizontal: 8,
  },
  content: {
    paddingBottom: 10,
    paddingHorizontal: 8,
    gap: 5,
  },
  information: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  contentTeammmates: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
