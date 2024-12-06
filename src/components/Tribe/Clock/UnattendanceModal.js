import { Dimensions, Keyboard, Platform, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Modal from "react-native-modal";

import SubmittedReport from "../Attendance/FormType/SubmittedReport";
import { Colors } from "../../../styles/Color";

const UnattendanceModal = ({ isOpen, toggle, title, field, alpaType, fieldName, placeholder, formik }) => {
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight =
    Platform.OS === "ios"
      ? Dimensions.get("window").height
      : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

  return (
    <Modal
      isVisible={isOpen}
      //   onBackdropPress={toggle}
      deviceHeight={deviceHeight}
      deviceWidth={deviceWidth}
      backdropColor="#272A2B"
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      hideModalContentWhileAnimating={true}
      useNativeDriver={false}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <SubmittedReport
            formik={formik}
            title={title}
            field={field}
            types={alpaType}
            fieldName={fieldName}
            placeholder={placeholder}
            alpa={true}
            reasonValue={formik.values.att_reason}
            typeValue={formik.values.att_type}
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default UnattendanceModal;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    backgroundColor: Colors.secondary,
    padding: 20,
    borderRadius: 10,
  },
});
