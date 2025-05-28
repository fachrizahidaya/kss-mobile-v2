import { useState } from "react";

import { Text, View } from "react-native";
import Input from "../../../styles/forms/Input";
import Select from "../../../styles/forms/Select";
import FormButton from "../../../styles/buttons/FormButton";

const NewUserForm = ({ formik, roles, isSubmitting }) => {
  const [hidePassword, setHidePassword] = useState(true);

  const types = [
    { value: "Employee", label: "Employee" },
    { value: "User", label: "User" },
  ];

  const handleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <View style={{ gap: 10 }}>
      <Input
        formik={formik}
        title="Name"
        fieldName="name"
        placeHolder="Input name"
        value={formik.values.name}
      />
      <Input
        formik={formik}
        title="Email"
        fieldName="email"
        placeHolder="Input email"
        value={formik.values.email}
      />
      <Input
        formik={formik}
        title="Password"
        fieldName="password"
        placeHolder="Input password"
        secureTextEntry={hidePassword}
        endIcon={hidePassword ? "eye-outline" : "eye-off-outline"}
        onPressEndIcon={handleHidePassword}
        // value={formik.values.email}
      />
      <Select
        title="Type"
        items={types}
        value={null}
        placeHolder="Select type"
        onChange={() => {}}
      />
      <Select
        title="User Role"
        items={roles}
        value={null}
        placeHolder="Select type"
        onChange={() => {}}
      />
      <FormButton
        isSubmitting={isSubmitting}
        disabled={null}
        onPress={formik.handleSubmit}
        text="Submit"
      />
    </View>
  );
};

export default NewUserForm;
