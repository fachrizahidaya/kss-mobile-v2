import { memo, useState } from "react";

import Toast from "react-native-root-toast";

import { ActivityIndicator, Dimensions, Image, Platform, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

import axiosInstance from "../../../config/api";
import { useLoading } from "../../../hooks/useLoading";
import Button from "../Forms/Button";
import { ErrorToastProps, SuccessToastProps, TextProps } from "../CustomStylings";

const ConfirmationModal = ({
  isOpen,
  toggle,
  apiUrl,
  successMessage,
  color,
  hasSuccessFunc = false,
  onSuccess,
  description,
  body = {},
  isDelete = true,
  isPatch = false,
  isGet = false,
  toggleOtherModal = null,
  toggleAttendanceReason = null,
  showSuccessToast = true,
  hasLate,
  setResult = null,
}) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAttendanceReason, setShowAttendanceReason] = useState(false);

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight =
    Platform.OS === "ios"
      ? Dimensions.get("window").height
      : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

  const { isLoading: isDeleting, toggle: toggleIsDeleting } = useLoading(false);

  const onPressHandler = async () => {
    try {
      toggleIsDeleting();
      if (isDelete) {
        const res = await axiosInstance.delete(apiUrl);
        setResult && setResult(res.data?.data);
      } else if (isPatch) {
        const res = await axiosInstance.patch(apiUrl);
        setResult && setResult(res.data?.data);
      } else if (isGet) {
        const res = await axiosInstance.get(apiUrl);
        setResult && setResult(res.data?.data);
      } else {
        const res = await axiosInstance.post(apiUrl, body);
        setResult && setResult(res.data?.data);
      }
      toggle();
      toggleIsDeleting();

      if (showSuccessToast) {
        Toast.show(successMessage, SuccessToastProps);
      }

      // If hasSuccessFunc passed then run the available onSuccess function
      if (hasSuccessFunc) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
      toggleIsDeleting();
      Toast.show(error.response.data.message, ErrorToastProps);
    }
  };
  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={() => !isDeleting && toggle()}
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
      hideModalContentWhileAnimating={true}
      useNativeDriver={true}
      onModalHide={() => {
        if (showSuccessModal) {
          toggleOtherModal();
        }
        // if (Platform.OS === "ios" && showAttendanceReason) {
        //   toggleAttendanceReason();
        // }
      }}
    >
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          {/* <Image source={require("../../assets/vectors/confirmation.jpg")} alt="confirmation" style={styles.image} /> */}
          <Text style={[{ textAlign: "center" }, TextProps]}>{description}</Text>
        </View>

        <View style={{ flexDirection: "row", gap: 5 }}>
          <Button
            disabled={isDeleting}
            onPress={() => {
              !isDeleting && toggle();
              !isDeleting && setShowSuccessModal(false);
              // !isDeleting && setShowAttendanceReason(false);
            }}
            flex={1}
            variant="outline"
            backgroundColor="#FD7972"
          >
            <Text style={{ color: "#FD7972" }}>Cancel</Text>
          </Button>

          <Button
            bgColor={isDeleting ? "coolGray.500" : color ? color : "red.600"}
            onPress={() => {
              onPressHandler();
              if (toggleOtherModal) {
                setShowSuccessModal(true);
              }
              // if (Platform.OS === "ios" && hasLate) {
              //   setShowAttendanceReason(true);
              // }
            }}
            startIcon={isDeleting && <ActivityIndicator />}
            flex={1}
          >
            <Text style={{ color: "#FFFFFF" }}>Confirm</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default memo(ConfirmationModal);

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
