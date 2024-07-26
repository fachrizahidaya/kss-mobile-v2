import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { useFormik } from "formik";
import * as yup from "yup";

import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import FormButton from "../../../styles/FormButton";
import { update_image } from "../../../redux/reducer/auth";
import { update_profile } from "../../../redux/reducer/auth";
import axiosInstance from "../../../config/api";
import PageHeader from "../../../styles/PageHeader";
import Input from "../../../styles/forms/Input";
import PickImage from "../../../styles/PickImage";
import { useDisclosure } from "../../../hooks/useDisclosure";
import AlertModal from "../../../styles/modals/AlertModal";

const MyProfile = ({ route }) => {
  const [image, setImage] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { profile } = route.params;

  const { isOpen: addImageModalIsOpen, toggle: toggleAddImageModal } = useDisclosure(false);
  const { isOpen: saveModalIsOpen, toggle: toggleSaveModal } = useDisclosure(false);

  const userSelector = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const phoneNumber = profile?.data?.phone_number.toString();

  const forms = [
    { title: "Email", source: profile?.data?.email },
    { title: "Date of Birth", source: profile?.data?.birthdate_convert },
    { title: "Job Title", source: profile?.data?.position_name },
    { title: "Status", source: profile?.data?.status.charAt(0).toUpperCase() + profile?.data?.status.slice(1) },
  ];

  /**
   * Submit updated profile (name) handler
   * @param {*} form
   * @param {*} setSubmitting
   * @param {*} setStatus
   */
  const editProfileHandler = async (form, setSubmitting, setStatus) => {
    try {
      const res = await axiosInstance.patch(`/setting/users/${userSelector.id}`, { ...form, password: "" });
      dispatch(update_profile(res.data.data));
      navigation.goBack({ profile: profile });
      setRequestType("patch");
      toggleSaveModal();
      setSubmitting(false);
      setStatus("success");
    } catch (error) {
      console.log(error);
      setRequestType("error");
      setErrorMessage(error.response.data.message);
      toggleSaveModal();
      setSubmitting(false);
      setStatus("error");
    }
  };

  /**
   * Edit profile handler
   */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userSelector.name,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required"),
    }),
    validateOnChange: false,
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus("processing");
      editProfileHandler(values, setSubmitting, setStatus);
    },
  });

  /**
   * Submit update profile picture handler
   */
  const editProfilePictureHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("_method", "PATCH");
      const res = await axiosInstance.post(`/setting/users/change-image/${userSelector.id}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      dispatch(update_image(res.data.data));
      setImage(null);
      setRequestType("patch");
      toggleSaveModal();
    } catch (error) {
      console.log(error);
      setRequestType("error");
      setErrorMessage(error.response.data.message);
      toggleSaveModal();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PageHeader
          title="My Profile Screen"
          onPress={() => !formik.isSubmitting && formik.status !== "processing" && navigation.goBack({ profile })}
        />
      </View>

      <ScrollView style={{ paddingHorizontal: 16 }}>
        <View style={{ alignItems: "center", justifyContent: "center", gap: 4, marginVertical: 3 }}>
          <View style={{ borderStyle: "dashed", borderColor: "#C6C9CC", borderRadius: 20, padding: 2, borderWidth: 1 }}>
            <Image
              style={{ resizeMode: "contain", borderRadius: 20, width: 120, height: 120 }}
              source={{
                uri: !image ? `${process.env.EXPO_PUBLIC_API}/image/${userSelector?.image}` : image.uri,
              }}
              alt="profile picture"
            />
            <Pressable style={styles.editPicture} onPress={!image ? () => toggleAddImageModal() : () => setImage(null)}>
              <MaterialCommunityIcons name={!image ? "pencil-outline" : "close"} size={20} color="#3F434A" />
            </Pressable>
          </View>
          {image && (
            <FormButton onPress={editProfilePictureHandler} style={{ paddingHorizontal: 8 }}>
              <Text style={{ color: "#FFFFFF" }}>Save</Text>
            </FormButton>
          )}
        </View>

        <View style={{ gap: 20, marginVertical: 3, paddingHorizontal: 5 }}>
          <Input
            title="Name"
            formik={formik}
            value={formik.values.name}
            fieldName="name"
            defaultValue={profile?.data?.name.length > 30 ? profile?.data?.name.split(" ")[0] : profile?.data?.name}
          />

          {forms.map((form) => {
            return <Input key={form.title} title={form.title} editable={false} defaultValue={form.source} />;
          })}

          <Input title="Phone Number" editable={false} defaultValue={`+62 ${phoneNumber}`} />

          <Input title="Address" editable={false} defaultValue={profile?.data?.address} multiline />

          <FormButton
            isSubmitting={formik.isSubmitting}
            onPress={formik.handleSubmit}
            disabled={formik.values.name === profile?.data?.name}
          >
            <Text style={{ color: "#FFFFFF" }}>Save</Text>
          </FormButton>
        </View>
      </ScrollView>

      <PickImage setImage={setImage} modalIsOpen={addImageModalIsOpen} toggleModal={toggleAddImageModal} />
      <AlertModal
        isOpen={saveModalIsOpen}
        toggle={toggleSaveModal}
        type={requestType === "patch" ? "success" : "danger"}
        title={requestType === "patch" ? "Changes saved!" : "Process error!"}
        description={requestType === "patch" ? "Data successfully saved" : errorMessage || "Please try again later"}
      />
    </SafeAreaView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  editPicture: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    position: "absolute",
    top: -5,
    right: -10,
    zIndex: 2,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#C6C9CC",
  },
});
