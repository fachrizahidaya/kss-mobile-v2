import { Text, View } from "react-native";
import Input from "../../../styles/forms/Input";
import Select from "../../../styles/forms/Select";

const NewUserForm = ({ formik }) => {
  const arr = [];
  return (
    <View style={{ gap: 10 }}>
      <Input
        formik={formik}
        title="Name"
        fieldName="name"
        placeHolder="Input name"
        // value={formik.values.name}
      />
      <Input
        formik={formik}
        title="Email"
        fieldName="email"
        placeHolder="Input email"
        // value={formik.values.email}
      />
      <Select
        title="Type"
        items={arr}
        value={null}
        placeHolder="Select type"
        onChange={() => {}}
      />
    </View>
  );
};

export default NewUserForm;
