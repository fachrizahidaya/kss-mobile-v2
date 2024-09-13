import { Text, View } from "react-native";
import dayjs from "dayjs";

import Clock from "./shared/Clock";
import Options from "./shared/Options";
import Reason from "./shared/Reason";
import FormButton from "../../../../styles/buttons/FormButton";
import { TextProps } from "../../../../styles/CustomStylings";

const LateOrEarly = ({
  formik,
  arrayList,
  titleTime,
  time,
  title,
  inputValue,
  inputOnChangeText,
  selectOnValueChange,
  titleDuty,
  timeDuty,
  timeLateOrEarly,
  placeholder,
  fieldOption,
  inputType,
  date,
  notApplyDisable,
  withoutSaveButton,
  withDuration,
  duration,
  minimumDurationReached,
}) => {
  return (
    <View style={{ gap: 10 }}>
      <Text style={[TextProps, { color: "gray", flexDirection: "row", justifyContent: "flex-end" }]}>
        {dayjs(date).format("DD MMM YYYY")}
      </Text>
      <Clock
        titleDuty={titleDuty}
        timeDuty={timeDuty}
        titleClock={titleTime}
        timeInOrTimeOut={time}
        lateOrEarly={timeLateOrEarly}
        withDuration={withDuration}
        duration={duration}
      />
      {minimumDurationReached ? null : (
        <>
          <Options
            formik={formik}
            title={title}
            field={fieldOption}
            types={arrayList}
            value={inputType}
            valueChange={selectOnValueChange}
            placeholder={placeholder}
          />
          <Reason formik={formik} value={inputValue} onChangeText={inputOnChangeText} />
        </>
      )}
      {withoutSaveButton ? null : (
        <FormButton
          size="sm"
          variant="solid"
          fontSize={12}
          isSubmitting={formik.isSubmitting}
          onPress={formik.handleSubmit}
          disabled={
            notApplyDisable
              ? null
              : title === "Late Type"
              ? !formik.values.late_type || !formik.values.late_reason
              : !formik.values.early_type || !formik.values.early_reason
          }
        >
          <Text style={{ color: "#FFFFFF" }}>Save</Text>
        </FormButton>
      )}
    </View>
  );
};

export default LateOrEarly;
