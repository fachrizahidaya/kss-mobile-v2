import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
=======
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
>>>>>>> 20b25950 (feat: shift form)
=======
import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
>>>>>>> 155c25bc (fix: shift)
=======
import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
>>>>>>> 859eea89 (first commit)
=======
import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native";
>>>>>>> c3ae17e7 (new branch)

import Screen from "../../../layouts/Screen";
import ReturnConfirmationModal from "../../../styles/modals/ReturnConfirmationModal";
import AlertModal from "../../../styles/modals/AlertModal";
import { Colors } from "../../../styles/Color";
import { useDisclosure } from "../../../hooks/useDisclosure";
import axiosInstance from "../../../config/api";
import ShiftForm from "../../../components/Tribe/Clock/ShiftForm";
import ConfirmationModal from "../../../styles/modals/ConfirmationModal";
import { useFetch } from "../../../hooks/useFetch";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import styles from "./Clock.styles";
=======
>>>>>>> 20b25950 (feat: shift form)
=======
import styles from "./Clock.styles";
>>>>>>> 155c25bc (fix: shift)
=======
import styles from "./Clock.styles";
>>>>>>> 859eea89 (first commit)
=======
import styles from "./Clock.styles";
>>>>>>> c3ae17e7 (new branch)

const Shift = () => {
  const navigation = useNavigation();

  const { isOpen: returnModalIsOpen, toggle: toggleReturnModal } = useDisclosure(false);
  const { isOpen: submitShiftIsOpen, toggle: toggleSubmitShift } = useDisclosure(false);

  const { data } = useFetch("");

  const shifts = [
    { label: "Shift 1", value: "shift_1" },
    { label: "Shift 2", value: "shift_2" },
  ];

  const renderRequestBody = {};

  const handleSubmit = async (data, setSubmitting, setStatus) => {
    try {
      const res = await axiosInstance.post(``, data);
      setSubmitting(false);
      setStatus("success");
      toggleSubmitShift();
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      setStatus("error");
      toggleSubmitShift();
    }
  };

  const formik = useFormik({
    initialValues: {
      shift: "",
    },
    onSubmit: (values, { setSubmitting, setStatus }) => {
      handleSubmit(values, setSubmitting, setStatus);
    },
  });

  const renderDisabled = !formik.values.shift;

  const handleConfirmReturnToHome = () => {
    toggleReturnModal();
    navigation.navigate("Dashboard");
  };

  const handleReturn = () => {
    if (formik.values.shift) {
      toggleReturnModal();
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Screen
        screenTitle="Work Session"
        returnButton={true}
        onPress={handleReturn}
        backgroundColor={Colors.secondary}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            {
              <ShiftForm
                shifts={shifts}
                formik={formik}
                optionValue={formik.values.shift}
                disabled={renderDisabled}
              />
            }
          </View>
        </ScrollView>
        <ReturnConfirmationModal
          isOpen={returnModalIsOpen}
          toggle={toggleReturnModal}
          onPress={handleConfirmReturnToHome}
          description="Are you sure want to exit? It will be deleted"
        />
        <ConfirmationModal
          isOpen={submitShiftIsOpen}
          toggle={toggleSubmitShift}
          apiUrl={``}
          body={renderRequestBody}
          hasSuccessFunc={true}
          description={`Are you sure want to submit the shift?`}
        />
        <AlertModal />
      </Screen>
    </TouchableWithoutFeedback>
  );
};

export default Shift;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======

const styles = StyleSheet.create({
  container: {
    marginVertical: 14,
    marginHorizontal: 16,
    gap: 10,
  },
});
>>>>>>> 20b25950 (feat: shift form)
=======
>>>>>>> 155c25bc (fix: shift)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
