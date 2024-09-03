import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as yup from "yup";

import { Keyboard, View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import axiosInstance from "../../../config/api";
import { TextProps } from "../../../styles/CustomStylings";
import SelectedUserList from "../../../components/Chat/UserSelection/SelectedUserList";
import GroupData from "../../../components/Chat/UserSelection/GroupData";
import PickImage from "../../../styles/PickImage";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";
import Screen from "../../../styles/Screen";

const GroupFormScreen = ({ route }) => {
  const [image, setImage] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();

  const { userArray, groupData } = route.params;

  const { isOpen: addImageModalIsOpen, toggle: toggleAddImageModal } = useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const createGroupHandler = async (form, setSubmitting) => {
    try {
      const res = await axiosInstance.post("/chat/group", form, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const params = {
        name: res.data.data.name,
        userId: res.data.data.id,
        image: res.data.data.image,
        type: "group",
        position: null,
        email: null,
        active_member: 1,
        roomId: res.data.data.id,
        forwardedMessage: null,
      };

      navigation.navigate("Chat Room", params);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      setRequestType("error");
      setErrorMessage(error.response.data.message);
      toggleAlert();
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: groupData ? true : false,
    initialValues: {
      name: groupData?.name || "",
      image: groupData?.image || "",
      member: userArray,
    },
    validationSchema: yup.object().shape({
      name: yup.string().max(30, "30 characters maximum").required("Group name is required"),
    }),
    validateOnChange: false,
    onSubmit: (values, { setSubmitting }) => {
      const formData = new FormData();

      for (let prop in values) {
        if (Array.isArray(values[prop])) {
          values[prop].forEach((item, index) => {
            Object.keys(item).forEach((key) => {
              formData.append(`${prop}[${index}][${key}]`, item[key]);
            });
          });
        } else {
          formData.append(prop, values[prop]);
        }
      }
      createGroupHandler(formData, setSubmitting);
    },
  });

  return (
    <Screen
      screenTitle="New Group"
      returnButton={true}
      onPress={() => !formik.isSubmitting && navigation.goBack()}
      backgroundColor="#FFFFFF"
    >
      <View style={{ flex: 1, position: "relative" }}>
        <GroupData onAddImage={toggleAddImageModal} image={image} formik={formik} />
        <PickImage setImage={setImage} modalIsOpen={addImageModalIsOpen} toggleModal={toggleAddImageModal} />
        <Pressable style={{ marginVertical: 14, marginHorizontal: 16 }} onPress={Keyboard.dismiss}>
          <Text style={[{ fontSize: 12 }, TextProps]}>Participants: {userArray?.length}</Text>
        </Pressable>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 5, alignItems: "center", marginHorizontal: 16 }}>
          {userArray?.length > 0 &&
            userArray.map((user, index) => {
              return <SelectedUserList key={index} name={user?.name} id={user?.id} image={user?.image} />;
            })}
        </View>
        <Pressable
          style={[styles.checkButton, { backgroundColor: formik.isSubmitting ? "#757575" : "#176688" }]}
          onPress={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <MaterialCommunityIcons name="check" size={25} color="#FFFFFF" />
          )}
        </Pressable>
      </View>
      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        title={requestType === "post" ? "Group added!" : "Process error!"}
        description={requestType === "post" ? "Data successfully added" : errorMessage || "Please try again later"}
        type={requestType === "post" ? "info" : "danger"}
      />
    </Screen>
  );
};

export default GroupFormScreen;

const styles = StyleSheet.create({
  checkButton: {
    padding: 20,
    shadowOffset: 0,
    borderWidth: 5,
    borderColor: "#FFFFFF",
    borderRadius: 40,
    position: "absolute",
    bottom: 30,
    right: 10,
  },
});
