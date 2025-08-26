import { useState } from "react";

import { Text, View } from "react-native";
import Input from "../../../styles/forms/Input";
import Select from "../../../styles/forms/Select";
import FormButton from "../../../styles/buttons/FormButton";
import { Colors } from "../../../styles/Color";

const NewUserForm = ({
  formik,
  roles,
  isSubmitting,
  onSubmit,
  name,
  email,
  password,
  type,
  user_role,
  disabled,
}) => {
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
        value={name}
      />
      <Input
        formik={formik}
        title="Email"
        fieldName="email"
        placeHolder="Input email"
        value={email}
      />
      <Input
        formik={formik}
        title="Password"
        fieldName="password"
        placeHolder="Input password"
        secureTextEntry={hidePassword}
        endIcon={hidePassword ? "eye-outline" : "eye-off-outline"}
        onPressEndIcon={handleHidePassword}
        value={password}
      />
      <Select
        title="Type"
        formik={formik}
        items={types}
        fieldName="type"
        value={formik.values.type}
        placeHolder="Select type"
        onChange={(value) => {
          formik.setFieldValue("type", value);
        }}
      />
      <Select
        formik={formik}
        title="User Role"
        items={roles}
        fieldName="user_role_id"
        value={formik.values.user_role_id}
        placeHolder="Select type"
        onChange={(value) => {
          formik.setFieldValue("user_role_id", value);
        }}
      />
      <FormButton isSubmitting={isSubmitting} disabled={disabled} onPress={onSubmit}>
        <Text style={{ color: Colors.fontLight }}>Submit</Text>
      </FormButton>
    </View>
  );
};

export default NewUserForm;
