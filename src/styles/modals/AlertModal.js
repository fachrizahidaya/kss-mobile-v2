import { useEffect } from "react";
import { Dimensions, Platform, StatusBar, Text, View } from "react-native";

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
  reason,
}) => {
  const deviceWidth = Dimensions.get("window").width;

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
        onModalHide={() => {
          if (
            (result?.late && !result?.late_reason && !result?.early) ||
            (!result?.late && result?.early && !result?.early_reason) ||
            (result?.late && result?.late_reason && result?.early)
          ) {
            toggleOtherModal();
          }
        }}
      >
        <View
          style={{
            alignItems: "center",
            gap: 3,
            paddingTop: Platform.OS === "ios" ? 30 : null,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: renderColor(), fontSize: 16, fontWeight: "500" }}>{words[0]}</Text>
            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "500" }}>{" " + words.slice(1).join(" ")}</Text>
          </View>

          <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "400" }}>{description}</Text>
          <MaterialCommunityIcons onPress={() => toggle()} name="chevron-up" color="#FFFFFF" size={20} />
        </View>
      </Modal>
    </>
  );
};

export default AlertModal;
