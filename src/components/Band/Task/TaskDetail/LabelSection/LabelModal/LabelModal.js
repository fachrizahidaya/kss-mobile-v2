import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { Text, View } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";

import LabelItem from "../LabelItem/LabelItem";
import FormButton from "../../../../../../styles/buttons/FormButton";
import { useDisclosure } from "../../../../../../hooks/useDisclosure";
import axiosInstance from "../../../../../../config/api";
import { useLoading } from "../../../../../../hooks/useLoading";
import Input from "../../../../../../styles/forms/Input";
import Button from "../../../../../../styles/forms/Button";
import { TextProps } from "../../../../../../styles/CustomStylings";
import CustomModal from "../../../../../../styles/modals/CustomModal";
import { Colors } from "../../../../../../styles/Color";

const LabelModal = ({ isOpen, onClose, projectId, taskId, allLabels = [], refetch, refetchTaskLabels }) => {
  const { isLoading, start, stop } = useLoading(false);

  const { isOpen: colorPickerIsOpen, toggle: toggleColorPicker } = useDisclosure(false);

  const handleBackdropPress = () => onClose(formik.resetForm);

  const handleColorSelect = (color) => {
    onColorPicked(color);
  };

  const addNewLabelFromInput = async (form, setSubmitting, setStatus) => {
    try {
      // Create a new label
      const res = await axiosInstance.post("/pm/labels", form);

      // Associate label with a project (if applicable)
      if (projectId) {
        await axiosInstance.post("/pm/projects/label", {
          project_id: projectId,
          label_id: res.data.data.id,
        });
      }

      // Associate label with the selected task
      await axiosInstance.post("/pm/tasks/label", {
        task_id: taskId,
        label_id: res.data.data.id,
      });
      setStatus("success");
      setSubmitting(false);
      refetch();
    } catch (error) {
      console.log(error);
      setStatus("error");
      setSubmitting(false);
    }
  };

  const assignLabelToTaskOnPress = async (labelId) => {
    try {
      start();
      // Associate the label with the selected task
      await axiosInstance.post("/pm/tasks/label", {
        task_id: taskId,
        label_id: labelId,
      });
      refetchTaskLabels();
      stop();
    } catch (error) {
      console.log(error);
      stop();
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      color: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Label name is required"),
      color: yup
        .string()
        .required("Label color is required")
        .notOneOf([Colors.secondary], "White color is not allowed"),
    }),
    validateOnChange: false,
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus("processing");
      addNewLabelFromInput(values, setSubmitting, setStatus);
    },
  });

  const onColorPicked = (color) => {
    formik.setFieldValue("color", color);
    // If selected color is not white (default) then close the color picker after color picked
    if (color !== Colors.secondary) {
      toggleColorPicker();
    }
  };

  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      onClose(formik.resetForm);
    }
  }, [formik.isSubmitting, formik.status]);

  return (
    <CustomModal isOpen={isOpen} toggle={handleBackdropPress} avoidKeyboard={true}>
      <Text style={[{ fontWeight: "500" }, TextProps]}>New Label</Text>

      <View style={{ gap: 10 }}>
        {allLabels.length > 0 ? (
          <>
            <Text style={TextProps}>Select from labels:</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 2 }}>
              {allLabels.map((label) => {
                return (
                  <LabelItem
                    disabled={isLoading}
                    key={label.id}
                    id={label.label_id}
                    name={label.label_name}
                    color={label.label_color}
                    onPress={assignLabelToTaskOnPress}
                  />
                );
              })}
            </View>
          </>
        ) : null}

        <Input
          formik={formik}
          title="Create new label"
          value={formik.values.name}
          fieldName="name"
          placeHolder="Type anything"
          onChangeText={(value) => formik.setFieldValue("name", value)}
        />

        <View style={{ gap: 10 }}>
          <Text style={{ color: formik.errors.color ? "red" : Colors.fontDark }}>Select label color</Text>

          <Button
            onPress={toggleColorPicker}
            backgroundColor={formik.values.color || Colors.backgroundLight}
            padding={10}
          >
            <Text style={TextProps}> {colorPickerIsOpen ? "Close color picker" : "Pick a color"}</Text>
          </Button>
        </View>
      </View>

      <FormButton padding={10} isSubmitting={formik.isSubmitting} onPress={formik.handleSubmit}>
        <Text style={{ color: Colors.fontLight }}>Save</Text>
      </FormButton>

      {colorPickerIsOpen ? (
        <ColorPicker sliderHidden={true} swatches={false} thumbSize={40} onColorChangeComplete={handleColorSelect} />
      ) : null}
    </CustomModal>
  );
};

export default LabelModal;
