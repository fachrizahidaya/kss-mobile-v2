import { Text, View } from "react-native";
import dayjs from "dayjs";

import Clock from "./shared/Clock";
import Options from "./shared/Options";
import Reason from "./shared/Reason";
import FormButton from "../../../../styles/buttons/FormButton";
import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";

const SubmittedReport = ({
  date,
  formik,
  titleDuty,
  titleClock,
  title,
  field,
  types,
  fieldName,
  placeholder,
  alpa,
  reasonValue,
  typeValue,
}) => {
  return (
    <View style={{ gap: 10 }}>
      <Text style={[TextProps, { color: Colors.fontGrey, flexDirection: "row", justifyContent: "flex-end" }]}>
        {dayjs(date?.date).format("DD MMM YYYY")}
      </Text>
      {!alpa ? (
        <Clock
          titleDuty={titleDuty}
          timeDuty={date?.onDuty}
          titleClock={titleClock}
          timeInOrTimeOut={date?.timeIn}
          lateOrEarly={date?.late}
        />
      ) : null}
      <Options
        formik={formik}
        value={typeValue}
        title={title}
        field={field}
        types={types}
        valueChange={(value) => formik.setFieldValue(field, value)}
        placeholder={placeholder}
      />
      <Reason formik={formik} value={reasonValue} fieldName={fieldName} />
      <FormButton isSubmitting={formik.isSubmitting} onPress={formik.handleSubmit} disabled={formik.isSubmitting}>
        <Text style={{ color: Colors.fontLight }}>Save</Text>
      </FormButton>
    </View>
  );
};

export default SubmittedReport;
