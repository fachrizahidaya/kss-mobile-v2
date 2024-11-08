import { Image, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../CustomStylings";
import CustomModal from "./CustomModal";
import { Colors } from "../Color";

const UserPreviewModal = ({ isOpen, toggle, name, image, email, stringToColor, userInitialGenerator }) => {
  return (
    <CustomModal isOpen={isOpen} toggle={toggle}>
      <View style={{ alignItems: "center", gap: 10 }}>
        {image ? (
          <Image
            source={{ uri: `${process.env.EXPO_PUBLIC_API}/image/${image}` }}
            alt={`profile image ${name}`}
            style={styles.image}
          />
        ) : (
          <View style={[styles.wrapper, { backgroundColor: stringToColor(name) }]}>
            <Text style={{ fontSize: 20, color: Colors.fontLight }}>{userInitialGenerator()}</Text>
          </View>
        )}
        <View style={{ alignItems: "center" }}>
          <Text style={[{ textAlign: "center", fontSize: 20 }, TextProps]}>{name || "Something went wrong"}</Text>
          <Text style={TextProps}>{email || "Something went wrong"}</Text>
        </View>
      </View>
    </CustomModal>
  );
};

export default UserPreviewModal;

const styles = StyleSheet.create({
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
