<<<<<<< HEAD
<<<<<<< HEAD
import { useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Selfie } from "simple-selfie";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Button from "../../../styles/forms/Button";
import ImageAttachment from "../../Chat/Attachment/ImageAttachment";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import FloatingButton from "../../../styles/buttons/FloatingButton";
import { Colors } from "../../../styles/Color";

const SelfieLocation = ({ attachment, toggle, handleAttachment }) => {
  return (
    <>
      <Pressable style={styles.container} onPress={attachment ? null : toggle}>
        {attachment ? (
          <ImageAttachment image={attachment} setImage={handleAttachment} />
        ) : (
<<<<<<< HEAD
<<<<<<< HEAD
          <View style={{ flex: 1, alignItems: "center", paddingVertical: 80 }}>
=======
          <View style={{ flex: 1, alignItems: "center", paddingVertical: 120 }}>
>>>>>>> 84ce2474 (fix: selfie location)
=======
          <View style={{ flex: 1, alignItems: "center", paddingVertical: 80 }}>
>>>>>>> ba143aea (fix: attendance map location, qr generate)
            <MaterialCommunityIcons
              name="camera-outline"
              color={Colors.iconDark}
              size={50}
              onPress={toggle}
            />
            <EmptyPlaceholder text="Select an image" />
          </View>
<<<<<<< HEAD
        )}
        {attachment && (
          <Pressable style={styles.camera}>
            <MaterialCommunityIcons
              name="camera-outline"
              color={Colors.secondary}
              size={20}
              onPress={toggle}
            />
          </Pressable>
        )}
      </Pressable>
    </>
  );
};

export default SelfieLocation;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 14,
    backgroundColor: Colors.iconGrey,
    borderRadius: 6,
    flex: 1,
  },
  camera: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: 50,
    height: 50,
    bottom: 20,
    right: 10,
    zIndex: 2,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: Colors.borderWhite,
  },
});
=======
import React from "react";
import { Text } from "react-native";
=======
import { useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Selfie } from "simple-selfie";
>>>>>>> 57035468 (feat: selfie location)

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Button from "../../../styles/forms/Button";
import ImageAttachment from "../../Chat/Attachment/ImageAttachment";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";
import FloatingButton from "../../../styles/buttons/FloatingButton";
import { Colors } from "../../../styles/Color";

const SelfieLocation = ({ attachment, toggle, handleAttachment }) => {
  return (
    <>
      <Pressable style={styles.container} onPress={attachment ? null : toggle}>
        {attachment ? (
          <ImageAttachment image={attachment} setImage={handleAttachment} />
        ) : (
          <EmptyPlaceholder text="Select an image" />
=======
>>>>>>> 84ce2474 (fix: selfie location)
        )}
        {attachment && (
          <Pressable style={styles.camera}>
            <MaterialCommunityIcons
              name="camera-outline"
              color={Colors.secondary}
              size={20}
              onPress={toggle}
            />
          </Pressable>
        )}
      </Pressable>
    </>
  );
};

export default SelfieLocation;
<<<<<<< HEAD
>>>>>>> ed94efae (fix: map location for ios)
=======

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 14,
    backgroundColor: Colors.iconGrey,
    borderRadius: 6,
    flex: 1,
  },
  camera: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: 50,
    height: 50,
    bottom: 20,
    right: 10,
    zIndex: 2,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: Colors.borderWhite,
  },
});
>>>>>>> 57035468 (feat: selfie location)
