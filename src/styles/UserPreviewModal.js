import { Dimensions, Image, Platform, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

import { TextProps } from "./CustomStylings";

const UserPreviewModal = ({ isOpen, onClose, name, image, email, stringToColor, userInitialGenerator }) => {
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight =
    Platform.OS === "ios"
      ? Dimensions.get("window").height
      : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

  return (
    <Modal isVisible={isOpen} onBackdropPress={onClose} deviceHeight={deviceHeight} deviceWidth={deviceWidth}>
      <View style={styles.container}>
        <View style={{ alignItems: "center", gap: 10 }}>
          {image ? (
            <Image
              source={{ uri: `${process.env.EXPO_PUBLIC_API}/image/${image}` }}
              alt={`profile image ${name}`}
              style={styles.image}
            />
          ) : (
            <View style={[styles.wrapper, { backgroundColor: stringToColor(name) }]}>
              <Text style={{ fontSize: 20, color: "#FFFFFF" }}>{userInitialGenerator()}</Text>
            </View>
          )}
          <View style={{ alignItems: "center" }}>
            <Text style={[{ textAlign: "center", fontSize: 20 }, TextProps]}>{name || "Something went wrong"}</Text>
            <Text style={TextProps}>{email || "Something went wrong"}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UserPreviewModal;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
  },
  wrapper: {
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderRadius: 50,
    resizeMode: "contain",
    height: 50,
    width: 50,
    backgroundColor: "transparent",
  },
});
