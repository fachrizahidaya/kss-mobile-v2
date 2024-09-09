import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFormik } from "formik";
import * as yup from "yup";

import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import PageHeader from "../../../styles/PageHeader";
import Tabs from "../../../styles/Tabs";
import AvatarSelect from "../../../styles/AvatarSelect";
import NewCustomerProfileForm from "../../../components/Coin/Customer/NewCustomerProfileForm";
import NewCustomerAddressForm from "../../../components/Coin/Customer/NewCustomerAddressForm";
import NewCustomerSubmission from "../../../components/Coin/Customer/NewCustomerSubmission";
import Button from "../../../styles/forms/Button";
import { useFetch } from "../../../hooks/useFetch";
import ReturnConfirmationModal from "../../../styles/modals/ReturnConfirmationModal";
import { useDisclosure } from "../../../hooks/useDisclosure";
import axiosInstance from "../../../config/api";
import PickImage from "../../../styles/PickImage";

const NewCustomer = () => {
  const [imageAttachment, setImageAttachment] = useState(null);
  const [tabValue, setTabValue] = useState("Profile");

  const navigation = useNavigation();
  const route = useRoute();

  const { setRequestType, toggleSuccessModal, setError } = route.params;

  const { data: category } = useFetch(`/acc/customer-category`);

  const { isOpen: returnModalIsOpen, toggle: toggleReturnModal } = useDisclosure(false);
  const { isOpen: submissionModalIsOpen, toggle: toggleSubmissionModal } = useDisclosure(false);
  const { isOpen: addImageModalIsOpen, toggle: toggleAddImageModal } = useDisclosure(false);

  const customerCategory = category?.data?.map((item, index) => ({
    label: item?.name,
    value: item?.id,
  }));

  const tabs = useMemo(() => {
    return [
      { title: `Profile`, value: "Profile" },
      { title: `Address`, value: "Address" },
    ];
  }, []);

  const onChangeTab = useCallback((value) => {
    setTabValue(value);
  }, []);

  const exitNewCustomer = () => {
    setImageAttachment(null);
    toggleReturnModal();
    navigation.goBack();
  };

  const handleOnReturn = () => {
    if (formValueEmpty) {
      navigation.goBack();
    } else {
      toggleReturnModal();
    }
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const addCustomerHandler = async (form, setSubmitting, setStatus) => {
    try {
      await axiosInstance.post(`/acc/customer`, form);
      setSubmitting(false);
      setStatus("success");
      setRequestType("post");
      toggleSubmissionModal();
    } catch (err) {
      console.log(err);
      setRequestType("error");
      setError(err.response.data.message);
      toggleSuccessModal();
      setSubmitting(false);
      setStatus("error");
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      customer_category_id: "",
      address: "",
      zip_code: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required"),
      email: yup.string().email().required("Email is required"),
      phone: yup.string().matches(phoneRegExp, "Phone number is invalid").required("Phone Number is required"),
      address: yup.string().required("Address is required"),
      zip_code: yup
        .string()
        .min(5, "ZIP Code consists 5 numbers")
        .max(5, "ZIP Code only 5 numbers")
        .required("ZIP Code is required"),
    }),
    onSubmit: (values, { setSubmitting, setStatus }) => {
      setStatus("processing");
      addCustomerHandler(values, setSubmitting, setStatus);
    },
  });

  const formValueEmpty =
    !formik.values.address &&
    !formik.values.name &&
    !formik.values.email &&
    !formik.values.customer_category_id &&
    !formik.values.phone &&
    !formik.values.zip_code;

  const allFormFilled =
    formik.values.address &&
    formik.values.name &&
    formik.values.email &&
    formik.values.customer_category_id &&
    formik.values.phone &&
    formik.values.zip_code.length === 5;

  useEffect(() => {
    if (!formik.isSubmitting && formik.status === "success") {
      formik.resetForm();
      navigation.goBack();
    }
  }, [formik.isSubmitting, formik.status]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PageHeader title="New Customer" onPress={handleOnReturn} />
        <Button padding={10} disabled={!allFormFilled} onPress={toggleSubmissionModal}>
          <Text style={[{ color: "#FFFFFF", fontSize: 12, fontWeight: "500" }]}>Submit</Text>
        </Button>
      </View>

      <View style={{ backgroundColor: "#FFFFFF", paddingHorizontal: 14 }}>
        <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} />
      </View>

      <ScrollView>
        <View style={{ paddingVertical: 14, paddingHorizontal: 16, gap: 20 }}>
          {tabValue === "Profile" ? (
            <>
              {/* <AvatarSelect
                imageAttachment={imageAttachment}
                setImageAttachment={setImageAttachment}
                name={null}
                image={null}
              /> */}
              <NewCustomerProfileForm customerCategory={customerCategory} formik={formik} />
            </>
          ) : (
            <>
              <NewCustomerAddressForm formik={formik} />
            </>
          )}
        </View>
      </ScrollView>
      <NewCustomerSubmission
        formik={formik}
        visible={submissionModalIsOpen}
        backdropPress={toggleSubmissionModal}
        isSubmitting={formik.isSubmitting}
        onSubmit={formik.handleSubmit}
        toggleOtherModal={toggleSuccessModal}
      />
      <ReturnConfirmationModal
        isOpen={returnModalIsOpen}
        toggle={toggleReturnModal}
        onPress={exitNewCustomer}
        description="Are you sure want to return? It will be deleted."
      />
      <PickImage setImage={setImageAttachment} modalIsOpen={addImageModalIsOpen} toggleModal={toggleAddImageModal} />
    </SafeAreaView>
  );
};

export default NewCustomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    position: "relative",
  },
  header: {
    gap: 15,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editPicture: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 2,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#C6C9CC",
    shadowOffset: 0,
  },
  image: {
    borderRadius: 80,
    height: 150,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#176688",
  },
  form: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 16,
  },
});
