import { useCallback, useEffect, useMemo, useState } from "react";

import { Dimensions, Text, View } from "react-native";
import dayjs from "dayjs";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import Clock from "./shared/Clock";
import Options from "./shared/Options";
import Reason from "./shared/Reason";
import FormButton from "../../../../styles/buttons/FormButton";
import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";
import Tabs from "../../../../layouts/Tabs";
import CustomBadge from "../../../../styles/CustomBadge";

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
  reasonNotClockOutValue,
  handleChangeNotClockOut,
  fieldName,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  currentDate,
  approvalHistory,
  data,
=======
>>>>>>> 40c1e0d2 (fix: form attendance)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
}) => {
  var renderDisabled;

  if ((inputType === "Late" || inputType === "Early") && !inputValue) {
    renderDisabled = false;
  } else {
    renderDisabled = !inputValue || !inputType;
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      {!date?.timeOut && (
        <View style={{ gap: 10 }}>
          <Reason
            formik={formik}
            value={reasonNotClockOutValue}
            fieldName={fieldName}
            onChangeText={handleChangeNotClockOut}
            title="Forgot to Clock Out Reason"
          />
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          <Reason formik={formik} value={inputValue} onChangeText={inputOnChangeText} />
=======
          {inputType !== "Late" && inputType !== "Went Home Early" && (
            <Reason formik={formik} value={inputValue} onChangeText={inputOnChangeText} />
          )}
>>>>>>> d3d4ef0a (fix:)
=======
          <Reason formik={formik} value={inputValue} onChangeText={inputOnChangeText} />
>>>>>>> 322b3182 (fix:)
=======
>>>>>>> 987e6189 (feat: forgot to clock out form)
        </>
=======
          {/* <FormButton
        isSubmitting={formik.isSubmitting}
        onPress={formik.handleSubmit}
        disabled={disabled}
      >
        <Text style={{ color: Colors.fontLight }}>Save</Text>
      </FormButton> */}
=======
>>>>>>> 0b658dbb (fix: attendance form)
        </View>
>>>>>>> 40c1e0d2 (fix: form attendance)
      )}
=======

>>>>>>> eac86091 (fix: attendance calendar)
=======

>>>>>>> 859eea89 (first commit)
=======

>>>>>>> c3ae17e7 (new branch)
      {withoutSaveButton ? null : (
        <FormButton
          isSubmitting={formik.isSubmitting}
          onPress={formik.handleSubmit}
<<<<<<< HEAD
          disabled={
            notApplyDisable
              ? null
              : title === "Late Type"
                ? !formik.values.late_type || !formik.values.late_reason
                : !formik.values.early_type || !formik.values.early_reason
          }
=======
          disabled={renderDisabled}
>>>>>>> 577d5985 (fix: attendance form)
        >
          <Text style={{ color: Colors.fontLight }}>Save</Text>
        </FormButton>
      )}
    </View>
  );
};

export default LateOrEarly;
