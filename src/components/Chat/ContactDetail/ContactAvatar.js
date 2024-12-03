import { StyleSheet, View, Text, Pressable } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AvatarPlaceholder from "../../../styles/AvatarPlaceholder";
import { TextProps } from "../../../styles/CustomStylings";
import { Colors } from "../../../styles/Color";

const ContactAvatar = ({ navigation, roomId, type, name, image, position, currentUserIsAdmin }) => {
  const params = {
    name: name,
    image: image,
    roomId: roomId,
  };

  return (
    <View style={styles.container}>
      <View style={{ gap: 10 }}>
        <AvatarPlaceholder size="xl" name={name} image={image} isThumb={false} />
        {type === "group" && currentUserIsAdmin ? (
          <Pressable style={styles.editPicture} onPress={() => navigation.navigate("Edit Group", params)}>
            <MaterialCommunityIcons name="pencil" size={15} color={Colors.iconDark} />
          </Pressable>
        ) : null}
      </View>

      <View style={{ alignItems: "center", gap: 3 }}>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>{name?.length > 30 ? name?.split(" ")[0] : name}</Text>

        {type === "personal" ? (
          <View style={{ alignItems: "center" }}>
            <Text style={[{ fontSize: 12 }, TextProps]}>{position}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default ContactAvatar;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.secondary,
    paddingBottom: 10,
    gap: 10,
  },
  editPicture: {
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C6C9CC",
    width: 30,
    height: 30,
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 2,
    shadowOffset: 0,
  },
});
