import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Screen from "../../../layouts/Screen";
import NewUserForm from "../../../components/Tribe/Contact/NewUserForm";
import { Colors } from "../../../styles/Color";
import { useFetch } from "../../../hooks/useFetch";
import axiosInstance from "../../../config/api";

const NewUser = () => {
  const [isReady, setIsReady] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const { data: roles } = useFetch("/user-roles/option");

  const handleReturn = () => {
    navigation.goBack();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      user_role_id: "",
    },
    validationSchema: yup.object().shape({}),
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus("processing");
      handleSubmit(values, setSubmitting, setStatus);
    },
  });

  const handleSubmit = async (form, setSubmitting, setStatus) => {
    try {
      await axiosInstance.post("/users", form);
      setSubmitting(false);
      setStatus("success");
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      setStatus("error");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 100);
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Screen
        screenTitle="Create User"
        returnButton={true}
        onPress={handleReturn}
        backgroundColor={Colors.secondary}
      >
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <NewUserForm roles={roles?.data} formik={formik} />
          </ScrollView>
        </View>
      </Screen>
    </TouchableWithoutFeedback>
  );
};

export default NewUser;

const styles = StyleSheet.create({
  content: {
    marginVertical: 14,
    marginHorizontal: 16,
    gap: 10,
  },
});
