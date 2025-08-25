import { useCallback, useEffect, useMemo, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import FormButton from "../../../../styles/buttons/FormButton";
import Reason from "./shared/Reason";
import { Colors } from "../../../../styles/Color";
import { TextProps } from "../../../../styles/CustomStylings";
import Tabs from "../../../../layouts/Tabs";
import CustomBadge from "../../../../styles/CustomBadge";
import dayjs from "dayjs";

const ForgotClockOut = ({
  formik,
  value,
  handleChange,
  fieldName,
  disabled,
  approvalClockOut,
  isEditable,
  date,
  approvalHistory,
}) => {
  const [tabValue, setTabValue] = useState("report");
  const [previousTabValue, setPreviousTabValue] = useState(0);
  const [number, setNumber] = useState(0);

  const { width } = Dimensions.get("window");
  const translateX = useSharedValue(0);

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
            {approvalClockOut ? (
              <Text style={[TextProps, { color: Colors.error }]}>
                {`Waiting for approval by ${approvalClockOut?.approval_by}`}
              </Text>
            ) : null}
            <Reason
              formik={formik}
              value={value}
              fieldName={fieldName}
              onChangeText={handleChange}
              title="Forgot to Clock Out Reason"
              isEditable={isEditable}
            />
            <FormButton
              isSubmitting={formik.isSubmitting}
              onPress={formik.handleSubmit}
              disabled={disabled}
            >
              <Text style={{ color: Colors.fontLight }}>Save</Text>
            </FormButton>
          </View>
        );

      default:
        return (
          <View>
            {approvalHistory ? (
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
              <Text style={[TextProps]}>No Data</Text>
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
      <Animated.View style={[animatedStyle]}>{renderContent()}</Animated.View>
      {/* {approvalClockOut ? (
        <Text style={[TextProps, { color: Colors.error }]}>
          {`Waiting for approval by ${approvalClockOut?.approval_by}`}
        </Text>
      ) : null} */}
      {/* <Reason
        formik={formik}
        value={value}
        fieldName={fieldName}
        onChangeText={handleChange}
        title="Forgot to Clock Out Reason"
        isEditable={isEditable}
      /> */}
      {/* <FormButton
        isSubmitting={formik.isSubmitting}
        onPress={formik.handleSubmit}
        disabled={disabled}
      >
        <Text style={{ color: Colors.fontLight }}>Save</Text>
      </FormButton> */}
    </View>
  );
};

export default ForgotClockOut;
