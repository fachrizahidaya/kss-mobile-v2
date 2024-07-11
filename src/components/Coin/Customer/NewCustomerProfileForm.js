import Input from "../../../styles/forms/Input";
import Select from "../../../styles/forms/Select";

const NewCustomerProfileForm = ({ customerCategory, formik }) => {
  return (
    <>
      <Input title="Name" formik={formik} fieldName="name" value={formik.values.name} placeHolder="Input name" />
      <Input title="Email" formik={formik} fieldName="email" value={formik.values.email} placeHolder="Input email" />
      <Input
        title="Phone Number"
        keyboardType="numeric"
        formik={formik}
        fieldName="phone"
        value={formik.values.phone}
        placeHolder="Input phone number"
      />
      <Select
        title="Customer Category"
        placeHolder="Select Category"
        items={customerCategory}
        formik={formik}
        value={formik.values.customer_category_id}
        fieldName="customer_category_id"
        onChange={(value) => formik.setFieldValue("customer_category_id", value)}
      />
    </>
  );
};

export default NewCustomerProfileForm;
