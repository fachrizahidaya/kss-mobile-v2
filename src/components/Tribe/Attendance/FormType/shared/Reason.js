import { View } from "react-native";

import Input from "../../../../../styles/forms/Input";

const Reason = ({ formik, value, fieldName, onChangeText }) => {
  return (
    <View>
      <Input
        formik={formik}
        title="Reason"
        fieldName={fieldName}
        placeHolder="Input reason"
        value={value}
        onChangeText={onChangeText}
        multiline={true}
      />
    </View>
  );
};

export default Reason;
