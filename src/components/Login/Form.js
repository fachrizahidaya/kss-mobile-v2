import { Text, View } from "react-native";
import Input from "../../styles/forms/Input";
import FormButton from "../../styles/buttons/FormButton";
import { Colors } from "../../styles/Color";
import { TextProps } from "../../styles/CustomStylings";

const Form = ({
  formik,
  hidePassword,
  handleHidePassword,
  handleDisabled,
  handleForgotPassword,
}) => {
  return (
    <View style={{ gap: 10, alignItems: "center" }}>
      <Input
        fieldName="email"
        title="Email"
        formik={formik}
        placeHolder="Input your email"
      />

      <Input
        fieldName="password"
        title="Password"
        formik={formik}
        placeHolder="Input your password"
        secureTextEntry={hidePassword}
        endIcon={hidePassword ? "eye-outline" : "eye-off-outline"}
        onPressEndIcon={handleHidePassword}
      />

      <FormButton
        onPress={formik.handleSubmit}
        disabled={handleDisabled}
        width="100%"
        isSubmitting={formik.isSubmitting}
      >
        <Text style={[TextProps, { color: Colors.fontLight }]}>Log In</Text>
      </FormButton>

      <Text
        onPress={handleForgotPassword}
        style={[TextProps, { color: Colors.primary, fontWeight: "500" }]}
      >
        Forgot Password?
      </Text>
    </View>
  );
};

export default Form;
