import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import AvatarPlaceholder from "../../../styles/AvatarPlaceholder";
import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const ContactDescription = ({
  isLoading,
  navigation,
  name,
  image,
  email,
  concatenatedNames,
  params,
  type,
  attendance_today,
}) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <Pressable
        onPress={() => {
          if (!isLoading) {
            navigation.navigate("Chat List");
          }
        }}
      >
        <MaterialIcons name="chevron-left" size={20} color={Colors.iconDark} />
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("User Detail", params)}
        style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
      >
        <AvatarPlaceholder
          name={name}
          image={image}
          size="md"
          isThumb={false}
        />

        <View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {name?.length > 30 ? name?.split(" ")[0] : name}
            </Text>
            {type === "personal" ? (
              <View
                style={[
                  styles.attendanceStatus,
                  {
                    backgroundColor: attendance_today?.time_in
                      ? "#3BC14A"
                      : "#EDEDED",
                  },
                ]}
              ></View>
            ) : null}
          </View>
          {type === "personal" ? (
            <Text style={[{ fontSize: 12, opacity: 0.5 }, TextProps]}>
              {email}
            </Text>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={[
                    { fontSize: 10, width: 200, overflow: "hidden" },
                    TextProps,
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {concatenatedNames}
                </Text>
              </View>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default ContactDescription;

const styles = StyleSheet.create({
  attendanceStatus: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: 15,
    height: 15,
  },
});
