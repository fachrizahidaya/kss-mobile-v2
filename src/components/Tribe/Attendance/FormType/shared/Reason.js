import { View } from "react-native";

import Input from "../../../../../styles/forms/Input";

const Reason = ({
  formik,
  value,
  fieldName,
  onChangeText,
  isDisabled,
  isEditable,
  title = "Reason",
}) => {
  return (
    <View>
      <Input
        formik={formik}
        title={title}
        fieldName={fieldName}
        placeHolder="Input reason"
        value={value}
        onChangeText={onChangeText}
        multiline={true}
        editable={isEditable}
      />
    </View>
  );
};

export default Reason;
