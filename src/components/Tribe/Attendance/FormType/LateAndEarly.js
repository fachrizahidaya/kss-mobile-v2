import { StyleSheet, Text, View } from "react-native";

import Select from "../../../../styles/forms/Select";
import Tabs from "../../../../styles/Tabs";
import Input from "../../../../styles/forms/Input";
import FormButton from "../../../../styles/FormButton";
import { TextProps } from "../../../../styles/CustomStylings";

const LateAndEarly = ({
  tabs,
  tabValue,
  onChangeTab,
  onDuty,
  timeIn,
  late,
  formik,
  lateTypes,
  offDuty,
  timeOut,
  early,
  earlyTypes,
}) => {
  return (
    <View style={{ gap: 10 }}>
      <Tabs tabs={tabs} value={tabValue} onChange={onChangeTab} justify="space-evenly" />
      {tabValue === "late" ? (
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
      ) : (
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
      )}
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
});
