import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as yup from "yup";

import { Keyboard, SafeAreaView, StyleSheet, View, Text, Pressable, Alert } from "react-native";

import PageHeader from "../../../styles/PageHeader";
import axiosInstance from "../../../config/api";
import { TextProps } from "../../../styles/CustomStylings";
import SelectedUserList from "../../../components/Chat/UserSelection/SelectedUserList";
import GroupData from "../../../components/Chat/UserSelection/GroupData";
import PickImage from "../../../styles/PickImage";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";

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
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, gap: 5 }}>
        <Pressable style={{ paddingVertical: 14, paddingHorizontal: 16 }} onPress={Keyboard.dismiss}>
          <PageHeader title="New Group" onPress={() => !formik.isSubmitting && navigation.goBack()} />

          <Text style={[{ fontSize: 12, marginLeft: 25 }, TextProps]}>Participants: {userArray?.length}</Text>
        </Pressable>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 5, alignItems: "center", paddingHorizontal: 16 }}>
          {userArray?.length > 0 &&
            userArray.map((user, index) => {
              return <SelectedUserList key={index} name={user?.name} id={user?.id} image={user?.image} />;
            })}
        </View>

        <GroupData onAddImage={toggleAddImageModal} image={image} formik={formik} />
      </View>
      <PickImage setImage={setImage} modalIsOpen={addImageModalIsOpen} toggleModal={toggleAddImageModal} />
      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        title={requestType === "post" ? "Group added!" : "Process error!"}
        description={requestType === "post" ? "Data successfully added" : errorMessage || "Please try again later"}
        type={requestType === "post" ? "info" : "danger"}
      />
    </SafeAreaView>
  );
};

export default GroupFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  groupImage: {
    borderRadius: 80,
    height: 150,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#176688",
  },
  groupData: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 16,
  },
});
