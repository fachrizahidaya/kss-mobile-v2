import { Dimensions, Keyboard, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import Modal from "react-native-modal";

import LateOrEarly from "../Attendance/FormType/LateOrEarly";

const ReasonModal = ({
  isOpen,
  toggle,
  formik,
  types,
  timeInOrOut,
  lateOrEarly,
  timeDuty,
  title,
  clockInOrOutTitle,
  onOrOffDuty,
  lateOrEarlyType,
  fieldType,
  fieldReaason,
  lateOrEarlyInputValue,
  lateOrEarlyInputType,
}) => {
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight =
    Platform.OS === "ios"
      ? Dimensions.get("window").height
      : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

  return (
    <Modal
      isVisible={isOpen}
      // onBackdropPress={toggle}
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
          <LateOrEarly
            formik={formik}
            titleTime={clockInOrOutTitle}
            arrayList={types}
            time={timeInOrOut}
            title={title}
            inputValue={lateOrEarlyInputValue}
            inputOnChangeText={(value) => formik.setFieldValue(fieldReaason, value)}
            selectOnValueChange={(value) => formik.setFieldValue(fieldType, value)}
            titleDuty={onOrOffDuty}
            timeDuty={timeDuty}
            timeLateOrEarly={lateOrEarly}
            placeholder={lateOrEarlyType}
            fieldOption={fieldType}
            inputType={lateOrEarlyInputType}
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ReasonModal;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
  },
});
