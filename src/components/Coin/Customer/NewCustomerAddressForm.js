import Input from "../../../styles/forms/Input";

const NewCustomerAddressForm = ({ formik }) => {
  return (
    <>
      <Input
        title="Address"
        multiline={true}
        formik={formik}
        fieldName="address"
        value={formik.values.address}
        placeHolder="Input address"
      />
      <Input
        title="ZIP Code"
        keyboardType="numeric"
        formik={formik}
        fieldName="zip_code"
        value={formik.values.zip_code}
        placeHolder="Input ZIP code"
      />
    </>
  );
};

export default NewCustomerAddressForm;
