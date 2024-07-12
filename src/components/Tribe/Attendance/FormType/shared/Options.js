import { View } from "react-native";

import Select from "../../../../../styles/forms/Select";

const Options = ({ formik, title, field, types, valueChange, placeholder, value }) => {
  return (
    <View>
      <Select
        formik={formik}
        value={value}
        title={title}
        fieldName={field}
        onChange={valueChange ? valueChange : (value) => formik.setFieldValue(field, value)}
        items={types}
        placeHolder={placeholder}
      />
    </View>
  );
};

export default Options;
