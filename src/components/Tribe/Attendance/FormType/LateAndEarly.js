import { useEffect, useState } from "react";

import { Dimensions, StyleSheet, Text, View } from "react-native";
import dayjs from "dayjs";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import Select from "../../../../styles/forms/Select";
import Tabs from "../../../../styles/Tabs";
import Input from "../../../../styles/forms/Input";
import FormButton from "../../../../styles/FormButton";
import { TextProps } from "../../../../styles/CustomStylings";

const LateAndEarly = ({
  tabs,
  tabValue,
  onChangeTab,
  onChangeNumber,
  onDuty,
  timeIn,
  late,
  formik,
  lateTypes,
  offDuty,
  timeOut,
  early,
  earlyTypes,
  date,
  number,
}) => {
  const [previousTabValue, setPreviousTabValue] = useState(0);

  const { width } = Dimensions.get("window");
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const renderContent = () => {
    switch (tabValue) {
      case "early":
        return (
          <>
            <View style={styles.clock}>
              <View>
                <Text style={[{ fontSize: 12 }, TextProps]}>Off Duty</Text>
                <Text style={[{ fontSize: 12 }, TextProps]}>{offDuty}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <View>
                  <Text style={[{ fontSize: 12 }, TextProps]}>Clock-out Time</Text>
                  <Text style={[{ fontSize: 12 }, TextProps]}>
                    {timeOut} ({early})
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Select
                formik={formik}
                value={formik.values.early_type}
                fieldName="early_type"
                items={earlyTypes}
                title="Early Type"
                placeHolder="Select early type"
                onChange={(value) => formik.setFieldValue("early_type", value)}
              />
            </View>
            <View>
              <Input
                formik={formik}
                title="Reason"
                fieldName="early_reason"
                placeHolder="Input reason"
                value={formik.values.early_reason}
              />
            </View>
          </>
        );

      default:
        return (
          <>
            <View style={styles.clock}>
              <View>
                <Text style={[{ fontSize: 12 }, TextProps]}>On Duty</Text>
                <Text style={[{ fontSize: 12 }, TextProps]}>{onDuty}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <View>
                  <Text style={[{ fontSize: 12 }, TextProps]}>Clock-in Time</Text>
                  <Text style={[{ fontSize: 12 }, TextProps]}>
                    {timeIn} ({late})
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Select
                formik={formik}
                value={formik.values.late_type}
                fieldName="late_type"
                title="Late Type"
                items={lateTypes}
                placeHolder="Select late type"
                onChange={(value) => formik.setFieldValue("late_type", value)}
              />
            </View>
            <View>
              <Input
                formik={formik}
                title="Reason"
                fieldName="late_reason"
                placeHolder="Input reason"
                value={formik.values.late_reason}
              />
            </View>
          </>
        );
    }
  };

  useEffect(() => {
    if (previousTabValue !== number) {
      const direction = previousTabValue < number ? -1 : 1;
      translateX.value = withTiming(direction * width, { duration: 300, easing: Easing.out(Easing.cubic) }, () => {
        translateX.value = 0;
      });
    }
    setPreviousTabValue(number);
  }, [number]);

  return (
    <View style={{ gap: 10 }}>
      <Text style={[TextProps, { color: "gray", flexDirection: "row", justifyContent: "flex-end" }]}>
        {dayjs(date).format("DD MMM YYYY")}
      </Text>
      <Tabs
        tabs={tabs}
        value={tabValue}
        onChange={onChangeTab}
        justify="space-evenly"
        onChangeNumber={onChangeNumber}
      />

      <Animated.View style={[animatedStyle]}>{renderContent()}</Animated.View>

      <FormButton
        size="sm"
        variant="solid"
        fontSize={12}
        isSubmitting={formik.isSubmitting}
        onPress={formik.handleSubmit}
        disabled={
          !formik.values.late_type ||
          !formik.values.late_reason ||
          !formik.values.early_type ||
          !formik.values.early_reason
        }
      >
        <Text style={{ color: "#FFFFFF" }}>Save</Text>
      </FormButton>
    </View>
  );
};

export default LateAndEarly;

const styles = StyleSheet.create({
  clock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 40,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    height: 50,
    padding: 10,
    borderRadius: 10,
  },
  animatedContainer: {
    flex: 1,
    width: "100%",
  },
});
