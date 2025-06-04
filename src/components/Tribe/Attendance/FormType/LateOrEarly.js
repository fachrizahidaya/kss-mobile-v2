import { Text, View } from "react-native";
import dayjs from "dayjs";

import Clock from "./shared/Clock";
import Options from "./shared/Options";
import Reason from "./shared/Reason";
import FormButton from "../../../../styles/buttons/FormButton";
import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";

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
  var renderDisabled;

  if (notApplyDisable) {
    renderDisabled = null;
  } else if (title === "Late Type") {
    renderDisabled =
      !inputType || !inputValue || formik.errors.late_type || formik.errors.late_reason;
  } else {
    renderDisabled =
      !inputType || !inputValue || formik.errors.early_type || formik.errors.early_reason;
  }

  return (
    <View style={{ gap: 10 }}>
      <Text
        style={[
          TextProps,
          { color: Colors.fontGrey, flexDirection: "row", justifyContent: "flex-end" },
        ]}
      >
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
          isSubmitting={formik.isSubmitting}
          onPress={formik.handleSubmit}
          disabled={renderDisabled}
        >
          <Text style={{ color: Colors.fontLight }}>Save</Text>
        </FormButton>
      )}
    </View>
  );
};

export default LateOrEarly;
