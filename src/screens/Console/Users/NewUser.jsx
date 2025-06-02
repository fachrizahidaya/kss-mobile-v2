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

  const { toggle, setRequestType, setError } = route.params;

  const handleReturn = () => {
    navigation.goBack();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      type: "",
      user_role_id: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Please use correct email format")
        .required("Email is required"),
    }),
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus("processing");
      handleSubmit(values, setSubmitting, setStatus);
    },
  });

  const handleSubmit = async (form, setSubmitting, setStatus) => {
    try {
      const res = await axiosInstance.post("/users", form);
      setRequestType("post");
      toggle();
      setSubmitting(false);
      setStatus("success");
    } catch (error) {
      console.log(error);
      setRequestType("error");
      setError(err.response.data.message);
      toggle();
      setSubmitting(false);
      setStatus("error");
    }
  };

  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      navigation.goBack();
    }
  });

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
        {isReady ? (
          <View style={styles.content}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <NewUserForm
                roles={roles?.data}
                formik={formik}
                isSubmitting={formik.isSubmitting}
                onSubmit={formik.handleSubmit}
                name={formik.values.name}
                email={formik.values.email}
                password={formik.values.password}
                type={formik.values.type}
                user_role={formik.values.user_role_id}
              />
            </ScrollView>
          </View>
        ) : null}
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
