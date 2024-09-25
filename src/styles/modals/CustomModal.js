import { Dimensions, Platform, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

const CustomModal = ({
  isOpen,
  toggle,
  children,
  handleAfterModalHide,
  hideModalContentWhileAnimating,
  backdropColor,
  statusBarTranslucent,
  avoidKeyboard,
}) => {
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight =
    Platform.OS === "ios"
      ? Dimensions.get("window").height
      : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={toggle}
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
      onModalHide={handleAfterModalHide}
      hideModalContentWhileAnimating={hideModalContentWhileAnimating}
      backdropColor={backdropColor}
      statusBarTranslucent={statusBarTranslucent}
      avoidKeyboard={avoidKeyboard}
    >
      <View style={styles.container}>{children}</View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: "contain",
  },
});
