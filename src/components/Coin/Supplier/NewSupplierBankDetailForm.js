import Input from "../../../styles/forms/Input";
import Select from "../../../styles/forms/Select";

const NewSupplierBankDetailForm = ({ formik, bank }) => {
  return (
    <>
      <Select
        title="Bank"
        placeHolder="Select bank"
        items={bank}
        formik={formik}
        value={formik.values.bank_id}
        fieldName="bank_id"
        onChange={(value) => formik.setFieldValue("bank_id", value)}
      />
      <Input
        title="Account Number"
        keyboardType="numeric"
        formik={formik}
        fieldName="account_no"
        value={formik.values.account_no}
        placeHolder="Input account number"
      />
      <Input
        title="Account Name"
        formik={formik}
        fieldName="account_name"
        value={formik.values.account_name}
        placeHolder="Input account name"
      />
    </>
  );
};

export default NewSupplierBankDetailForm;
