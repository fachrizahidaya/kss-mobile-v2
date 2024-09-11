import { useEffect } from "react";
import { ActivityIndicator, Dimensions, Platform, StatusBar, StyleSheet, Text, View } from "react-native";

import Modal from "react-native-modal";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AlertModal = ({
  isOpen,
  toggle,
  title = "",
  description = "",
  type,
  color,
  toggleOtherModal,
  result,
  withLoading,
  timeIn,
  timeOut,
}) => {
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;

  const renderColor = () => {
    if (color) {
      return color;
    } else {
      if (type === "info") {
        return "#CFCFCF";
      } else if (type === "success") {
        return "#46D590";
      } else if (type === "danger") {
        return "#FF7272";
      } else if (type === "warning") {
        return "#FFA800";
      } else return "#92C4FF";
    }
  };

  const words = title.split(" ");

  const handleOnModalHide = () => {
    if (
      (result?.late && !result?.late_reason && !result?.early) ||
      (!result?.late && !result?.late_reason && result?.early) ||
      (result?.late && result?.late_reason && result?.early)
    ) {
      if (timeIn && timeOut) {
        return null;
      } else {
        toggleOtherModal();
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        toggle();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <>
      <StatusBar animated={true} backgroundColor={isOpen ? "#176688" : null} />
      <Modal
        isVisible={isOpen}
        deviceHeight={Platform.OS === "ios" ? 140 : 110}
        deviceWidth={deviceWidth}
        animationIn={"slideInDown"}
        animationOut={"slideOutUp"}
        backdropColor="#176688"
        backdropOpacity={1}
        hideModalContentWhileAnimating={true}
        useNativeDriver={false}
        style={{ justifyContent: "flex-start", alignItems: "center", padding: 10, gap: 10, flex: 0.2 }}
        onModalHide={handleOnModalHide}
      >
        <View style={styles.wrapper}>
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: renderColor(), fontSize: 16, fontWeight: "500" }}>{words[0]}</Text>
              <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "500" }}>
                {" " + words.slice(1).join(" ")}
              </Text>
            </View>
            <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "400" }}>{description}</Text>
          </View>

          <MaterialCommunityIcons onPress={() => toggle()} name="chevron-up" color="#FFFFFF" size={20} />
        </View>
        {withLoading ? (
          <View
            style={{
              marginTop: 12,
              paddingBottom: 100,
              justifyContent: "center",
              height: deviceHeight - 130,
              width: deviceWidth,
              backgroundColor: "rgba(98, 61, 61, 0.2)",
              shadowColor: "rgba(0, 0, 0, 0.1)",
            }}
          >
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : null}
      </Modal>
    </>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    gap: Platform.OS === "ios" ? 1 : 3,
    paddingTop: Platform.OS === "ios" ? 30 : null,
  },
});
