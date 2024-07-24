import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import * as yup from "yup";
import { useFormik } from "formik";

import { SafeAreaView, StyleSheet, View, Text, Pressable, TouchableWithoutFeedback, Keyboard } from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import axiosInstance from "../../../config/api";
import EditGroupProfileForm from "../../../components/Chat/EditGroupProfile/EditGroupProfileForm";
import PickImage from "../../../styles/PickImage";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";

const EditGroupProfile = () => {
  const [imageAttachment, setImageAttachment] = useState(null);
  const [editName, setEditName] = useState(false);
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();

  const { name, image, roomId } = route.params;

  const { isOpen: addImageModalIsOpen, toggle: toggleAddImageModal } = useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const editGroupNameHandler = () => {
    setEditName(!editName);
  };

  /**
   * Handle group update event
   *
   * @param {*} group_id
   * @param {*} data
   */
  const groupUpdateHandler = async (group_id, form, setSubmitting, setStatus) => {
    try {
      const res = await axiosInstance.post(`/chat/group/${group_id}`, form, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      setSubmitting(false);
      setStatus("success");
      navigation.navigate("Chat List");
    } catch (err) {
      console.log(err);
      setRequestType("error");
      setErrorMessage(err.response.data.message);
      toggleAlert();
      setSubmitting(false);
      setStatus("error");
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: name || "",
      image: image || "",
      member: null,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Group name is required"),
    }),
    onSubmit: (values, { setSubmitting, setStatus }) => {
      const formData = new FormData();
      for (let key in values) {
        formData.append(key, values[key]);
      }
      formData.append("_method", "PATCH"); // if want to use PATCH method, put POST method to API then add append
      formData.append("image", imageAttachment);
      setStatus("processing");
      groupUpdateHandler(roomId, formData, setSubmitting, setStatus);
    },
  });

  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      editGroupNameHandler();
    }
  }, [formik.isSubmitting, formik.status]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Pressable onPress={() => !formik.isSubmitting && formik.status !== "processing" && navigation.goBack()}>
              <MaterialIcons name="chevron-left" size={20} color="#3F434A" />
            </Pressable>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Edit Profile</Text>
          </View>
        </View>

        <EditGroupProfileForm
          imageAttachment={imageAttachment}
          setImageAttachment={setImageAttachment}
          name={name}
          image={image}
          formik={formik}
          onEdit={editGroupNameHandler}
          onAddImage={toggleAddImageModal}
          editName={editName}
        />
        <PickImage setImage={setImageAttachment} modalIsOpen={addImageModalIsOpen} toggleModal={toggleAddImageModal} />
      </SafeAreaView>
      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        title={requestType === "post" ? "Data added!" : "Process error!"}
        description={requestType === "post" ? "Data successfully added" : errorMessage || "Please try again later"}
        type={requestType === "post" ? "info" : "danger"}
      />
    </TouchableWithoutFeedback>
  );
};

export default EditGroupProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
});
