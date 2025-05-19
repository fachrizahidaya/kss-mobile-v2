import { Text, View } from "react-native";
import Input from "../../../styles/forms/Input";

const NewUserForm = ({ formik }) => {
  return (
    <View>
      <Input
        multiline={true}
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
    </View>
  );
};

export default NewUserForm;
