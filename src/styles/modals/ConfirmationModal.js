import { memo } from "react";

import { ActivityIndicator, Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

import axiosInstance from "../../config/api";
import { useLoading } from "../../hooks/useLoading";
import Button from "../forms/Button";
import { TextProps } from "../CustomStylings";

const ConfirmationModal = ({
  isOpen,
  toggle,
  apiUrl,
  color,
  hasSuccessFunc = false,
  onSuccess,
  description,
  body = {},
  isDelete = true,
  isPatch = false,
  isGet = false,
  toggleOtherModal,
  setResult,
  setError = null,
  setRequestType = null,
  success = null,
  setSuccess = null,
}) => {
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight =
    Platform.OS === "ios"
      ? Dimensions.get("window").height
      : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

  const { isLoading: processIsLoading, toggle: toggleProcess } = useLoading(false);

  const handleAfterModalHide = () => {
    if (success) {
      toggleOtherModal();
    }
  };

  const handleBackdropPress = () => {
    if (!processIsLoading) {
      toggle();
    }
  };

  const onCanceled = () => {
    if (!processIsLoading) {
      if (setSuccess) {
        setSuccess(false);
      } else {
        return null;
      }
      toggle();
    }
  };

  const onConfirmed = () => {
    if (setSuccess) {
      setSuccess(true);
    } else {
      return null;
    }
    onPressHandler();
  };

  const onPressHandler = async () => {
    try {
      toggleProcess();
      if (isDelete) {
        const res = await axiosInstance.delete(apiUrl);
        if (setResult) {
          setResult(res.data?.data);
        }
        if (setRequestType) {
          setRequestType("remove");
        }
      } else if (isPatch) {
        const res = await axiosInstance.patch(apiUrl);
        if (setResult) {
          setResult(res.data?.data);
        }
        if (setRequestType) {
          setRequestType("remove");
        }
      } else if (isGet) {
        const res = await axiosInstance.get(apiUrl);
        if (setResult) {
          setResult(res.data?.data);
        }
      } else {
        const res = await axiosInstance.post(apiUrl, body);
        if (setResult) {
          setResult(res.data?.data);
        }
        if (setRequestType) {
          setRequestType("remove");
        }
      }
      toggle();
      toggleProcess();

      // If hasSuccessFunc passed then run the available onSuccess function
      if (hasSuccessFunc) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
      if (setRequestType) {
        setRequestType("error");
      }
      if (setError) {
        setError(error.response.data.message);
      }
      toggleProcess();
    }
  };

  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={handleBackdropPress}
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
      hideModalContentWhileAnimating={true}
      useNativeDriver={true}
      onModalHide={handleAfterModalHide}
    >
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Text style={[{ textAlign: "center" }, TextProps]}>{description}</Text>
        </View>

        <View style={{ flexDirection: "row", gap: 5 }}>
          <Button disabled={processIsLoading} onPress={onCanceled} flex={1} variant="outline" backgroundColor="#FD7972">
            <Text style={{ color: "#FD7972" }}>Cancel</Text>
          </Button>

          <Button
            bgColor={processIsLoading ? "coolGray.500" : color ? color : "red.600"}
            onPress={onConfirmed}
            startIcon={processIsLoading && <ActivityIndicator />}
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
