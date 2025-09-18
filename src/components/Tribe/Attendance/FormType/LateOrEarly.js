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
=======
  currentDate,
  approvalHistory,
  data,
>>>>>>> 26543521 (fix: attendance form, calendar)
}) => {
  const [tabValue, setTabValue] = useState("report");
  const [previousTabValue, setPreviousTabValue] = useState(0);
  const [number, setNumber] = useState(0);

  const { width } = Dimensions.get("window");
  const translateX = useSharedValue(0);
  var renderDisabled;

  if ((inputType === "Late" || inputType === "Early") && !inputValue) {
    renderDisabled = false;
  } else {
    renderDisabled = !inputValue || !inputType;
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const tabs = useMemo(() => {
    return [
      { title: "report", value: "report", number: 1 },
      { title: "approval", value: "approval", number: 2 },
    ];
  }, []);

  const handleChangeTab = useCallback((value) => {
    setTabValue(value);
  }, []);

  const handleChangeNumber = (value) => {
    setNumber(value);
  };

  const renderContent = () => {
    switch (tabValue) {
      case "report":
        return (
          <View style={{ gap: 10 }}>
            <Text
              style={[
                TextProps,
                {
                  color: Colors.fontGrey,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                },
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
                <Reason
                  formik={formik}
                  value={inputValue}
                  onChangeText={inputOnChangeText}
                />
              </>
            )}

            {!data?.timeOut &&
              currentDate !== date &&
              data?.attendanceType !== "Absent" && (
                <View style={{ gap: 10 }}>
                  {data?.approvalClockOut ? (
                    <Text style={[TextProps, { color: Colors.error }]}>
                      {`Waiting for approval by ${data?.approvalClockOut?.approval_by}`}
                    </Text>
                  ) : null}
                  <Reason
                    formik={formik}
                    value={reasonNotClockOutValue}
                    fieldName={fieldName}
                    onChangeText={handleChangeNotClockOut}
                    title="Forgot to Clock Out Reason"
                    isEditable={data?.approvalClockOut ? false : true}
                  />
                </View>
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

      default:
        return (
          <View>
            {approvalHistory?.length > 0 ? (
              approvalHistory.map((item) => {
                return (
                  <View
                    style={{
                      gap: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderWidth: 1,
                      borderColor: Colors.borderGrey,
                      borderRadius: 10,
                      paddingHorizontal: 16,
                      paddingVertical: 14,
                    }}
                  >
                    <View style={{ gap: 5 }}>
                      <Text style={[TextProps, { color: Colors.primary }]}>
                        {`${item?.object}`}
                      </Text>
                      <Text style={[TextProps]}>
                        {`${dayjs(item?.updated_at).format("DD MMM YYYY hh:mm")}`}
                      </Text>
                    </View>
                    <CustomBadge
                      description={item?.status}
                      backgroundColor={"#dcfce6"}
                      textColor={"#16a349"}
                    />
                  </View>
                );
              })
            ) : (
              <Text style={[TextProps, { textAlign: "center" }]}>No Data</Text>
            )}
          </View>
        );
    }
  };

  useEffect(() => {
    setTabValue("report");
  }, [date]);

  useEffect(() => {
    if (previousTabValue !== number) {
      const direction = previousTabValue < number ? -1 : 1;
      translateX.value = withTiming(
        direction * width,
        { duration: 300, easing: Easing.out(Easing.cubic) },
        () => {
          translateX.value = 0;
        }
      );
    }
    setPreviousTabValue(number);
  }, [number]);

  return (
    <View style={{ gap: 10 }}>
      <Tabs
        tabs={tabs}
        value={tabValue}
        onChange={handleChangeTab}
        justify="space-evenly"
        onChangeNumber={handleChangeNumber}
      />
<<<<<<< HEAD
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
=======
      <Animated.View style={[animatedStyle]}>{renderContent()}</Animated.View>
>>>>>>> 26543521 (fix: attendance form, calendar)
    </View>
  );
};

export default LateOrEarly;
