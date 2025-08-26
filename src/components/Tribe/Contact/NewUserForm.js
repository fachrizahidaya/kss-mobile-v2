<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 859eea89 (first commit)
import { useState } from "react";

import { Text, View } from "react-native";
import Input from "../../../styles/forms/Input";
import Select from "../../../styles/forms/Select";
import FormButton from "../../../styles/buttons/FormButton";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 859eea89 (first commit)
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
<<<<<<< HEAD
=======
=======
import { useState } from "react";

>>>>>>> cfe770bf (fix: adjust api option with parameters)
import { Text, View } from "react-native";
import Input from "../../../styles/forms/Input";
import Select from "../../../styles/forms/Select";
=======
>>>>>>> c266ac12 (fix:)
=======
import { Colors } from "../../../styles/Color";
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)

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
<<<<<<< HEAD
        multiline={true}
>>>>>>> 2075a560 (feat: new user)
=======
>>>>>>> 5666f74d (fix: new user)
=======
>>>>>>> 859eea89 (first commit)
        formik={formik}
        title="Name"
        fieldName="name"
        placeHolder="Input name"
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        value={name}
=======
        // value={formik.values.name}
>>>>>>> 2075a560 (feat: new user)
=======
        value={formik.values.name}
>>>>>>> 576753b8 (fix: add user)
=======
        value={name}
>>>>>>> 8e27ed27 (fix: new user)
=======
        value={name}
>>>>>>> 859eea89 (first commit)
      />
      <Input
        formik={formik}
        title="Email"
        fieldName="email"
        placeHolder="Input email"
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8e27ed27 (fix: new user)
=======
>>>>>>> 859eea89 (first commit)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 859eea89 (first commit)
      />
      <Select
        title="Type"
        formik={formik}
        items={types}
        fieldName="type"
        value={formik.values.type}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 859eea89 (first commit)
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
<<<<<<< HEAD
=======
        // value={formik.values.email}
=======
        value={formik.values.email}
>>>>>>> 576753b8 (fix: add user)
      />
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 2075a560 (feat: new user)
=======
=======
      <Input
        formik={formik}
        title="Password"
        fieldName="password"
        placeHolder="Input password"
        secureTextEntry={hidePassword}
        endIcon={hidePassword ? "eye-outline" : "eye-off-outline"}
        onPressEndIcon={handleHidePassword}
        // value={formik.values.email}
=======
>>>>>>> 8e27ed27 (fix: new user)
      />
>>>>>>> cfe770bf (fix: adjust api option with parameters)
      <Select
        title="Type"
        formik={formik}
        items={types}
        value={type}
=======
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
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
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 5666f74d (fix: new user)
=======
      <FormButton
        isSubmitting={isSubmitting}
        disabled={null}
        onPress={onSubmit}
        text="Submit"
      />
>>>>>>> c266ac12 (fix:)
=======
      <FormButton isSubmitting={isSubmitting} disabled={disabled} onPress={onSubmit}>
        <Text style={{ color: Colors.fontLight }}>Submit</Text>
      </FormButton>
>>>>>>> 16ba8713 (feat: submit attendance with location and selfie)
=======
>>>>>>> 859eea89 (first commit)
    </View>
  );
};

export default NewUserForm;
