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
<<<<<<< HEAD
<<<<<<< HEAD
=======
        disabled={isDisabled}
>>>>>>> 987e6189 (feat: forgot to clock out form)
=======
>>>>>>> 08bec30b (fix: reason input)
        editable={isEditable}
      />
    </View>
  );
};

export default Reason;
