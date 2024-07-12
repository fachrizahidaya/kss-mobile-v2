import Input from "../../../styles/forms/Input";

const NewSupplierAddressForm = ({ formik }) => {
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
      <Input title="City" formik={formik} fieldName="city" value={formik.values.city} placeHolder="Input city" />
      <Input
        title="Province"
        formik={formik}
        fieldName="province"
        value={formik.values.province}
        placeHolder="Input province"
      />
      <Input title="State" formik={formik} fieldName="state" value={formik.values.state} placeHolder="Input state" />
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

export default NewSupplierAddressForm;
