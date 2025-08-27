import { ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

import Screen from "../../../layouts/Screen";
import styles from "./Overtime.styles";
import OvertimeForm from "../../../components/Tribe/Overtime/OvertimeForm";
import { Colors } from "../../../styles/Color";

const NewOvertime = () => {
  const navigation = useNavigation();

  const overtimes = [
    {
      value: 1,
      label: "Lembur",
    },
    {
      value: 2,
      label: "Tambahan",
    },
  ];

  const handleReturn = () => {
    navigation.goBack();
  };

  const handleSubmit = async (form, setSubmitting, setStatus) => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      overtime: "",
      begin_time: dayjs().format("HH:mm"),
      end_time: dayjs().format("HH:mm"),
    },
    validationSchema: yup.object().shape({
      begin_time: yup.date().required("Begin time is required"),
      end_time: yup
        .date()
        .min(yup.ref("begin_time"))
        .required("End time can't be less than begin time"),
    }),
    onSubmit: (values, { setSubmitting, setStatus }) => {
      handleSubmit(values, setSubmitting, setStatus);
    },
  });

  return (
    <TouchableWithoutFeedback>
      <Screen
        screenTitle="Create Overtime"
        returnButton={true}
        onPress={handleReturn}
        backgroundColor={Colors.secondary}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <OvertimeForm
              formik={formik}
              optionValue={formik.values.overtime}
              overtimes={overtimes}
            />
          </View>
        </ScrollView>
      </Screen>
    </TouchableWithoutFeedback>
  );
};

export default NewOvertime;
