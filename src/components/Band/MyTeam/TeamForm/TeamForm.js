import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";

import { Text, View } from "react-native";

import FormButton from "../../../../styles/buttons/FormButton";
import axiosInstance from "../../../../config/api";
import Input from "../../../../styles/forms/Input";
import { TextProps } from "../../../../styles/CustomStylings";
import CustomModal from "../../../../styles/modals/CustomModal";
import { Colors } from "../../../../styles/Color";
import Button from "../../../../styles/forms/Button";

const TeamForm = ({
  isOpen,
  toggle,
  teamData,
  refetch,
  setSelectedTeam,
  setSelectedTeamId,
  setRequestType,
  setErrorMessage,
  toggleOtherModal,
  success,
  setSuccess,
}) => {
  const userSelector = useSelector((state) => state.auth);

  const handleBackdropPress = () => {
    if (!formik.isSubmitting && formik.status !== "processing") {
      toggle(formik.resetForm);
    }
  };

  const handleModalHide = () => {
    if (success) {
      toggleOtherModal();
    }
  };

  const handleCancel = () => {
    toggle(formik.resetForm);
    setSuccess(false);
  };

  const handleSubmit = () => {
    formik.handleSubmit();
    setSuccess(true);
  };

  const submitTeam = async (form, setSubmitting, setStatus) => {
    try {
      let res;
      if (teamData) {
        res = await axiosInstance.patch(`/pm/teams/${teamData.id}`, form);
        setSelectedTeam({
          ...teamData,
          ...form,
          owner_id: userSelector.id,
          owner_name: userSelector.name,
        });
        setRequestType("patch");
      } else {
        res = await axiosInstance.post("/pm/teams", form);
        setSelectedTeam({
          ...res.data.data,
          ...form,
          owner_name: userSelector.name,
        });

        setSelectedTeamId(res.data.data.id);
        setRequestType("patch");
      }

      refetch();
      setSubmitting(false);
      setStatus("success");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.setErrorMessage);
      setRequestType("error");
      setSubmitting(false);
      setStatus("error");
    }
  };
  const formik = useFormik({
    enableReinitialize: teamData ? true : false,
    initialValues: {
      name: teamData?.name || "",
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .max(20, "Max 20 characters")
        .required("Team name is required"),
    }),
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus("processing");
      submitTeam(values, setSubmitting, setStatus);
    },
  });

  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      toggle(formik.resetForm);
    }
  }, [formik.isSubmitting, formik.status]);

  return (
    <CustomModal
      isOpen={isOpen}
      toggle={handleBackdropPress}
      handleAfterModalHide={handleModalHide}
    >
      <Text style={[{ fontWeight: "500" }, TextProps]}>
        {teamData ? "Edit Team" : "Create Team"}
      </Text>

      <Input
        formik={formik}
        fieldName="name"
        placeHolder="Input name"
        value={formik.values.name}
      />

      <View
        style={{ flexDirection: "row", justifyContent: "flex-end", gap: 5 }}
      >
        <Button onPress={handleCancel} variant="outline">
          <Text style={{ color: Colors.danger }}>Cancel</Text>
        </Button>

        <FormButton
          isSubmitting={formik.isSubmitting}
          onPress={handleSubmit}
          disabled={
            !formik.values.name ||
            formik.values.name === teamData?.name ||
            formik.isSubmitting ||
            formik.values.name?.length >= 20
          }
        >
          <Text style={{ color: Colors.fontLight }}>Submit</Text>
        </FormButton>
      </View>
    </CustomModal>
  );
};

export default TeamForm;
