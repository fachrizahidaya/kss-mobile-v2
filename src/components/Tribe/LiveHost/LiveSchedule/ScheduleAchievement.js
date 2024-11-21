import { ActivityIndicator, Text, View } from "react-native";
import CustomSheet from "../../../../layouts/CustomSheet";
import Input from "../../../../styles/forms/Input";
import Button from "../../../../styles/forms/Button";
import { Colors } from "../../../../styles/Color";

const ScheduleAchievement = ({ reference, real_achievement, isLoading, formik, current_achievement }) => {
  return (
    <CustomSheet reference={reference}>
      <Input
        formik={formik}
        fieldName="real_achievement"
        title="Achievement"
        placeHolder="Input achievement"
        value={formik.values.real_achievement}
        keyboardType="numeric"
        onChangeText={(value) => formik.setFieldValue("real_achievement", value)}
      />
      <Button disabled={real_achievement === current_achievement} onPress={formik.handleSubmit}>
        {isLoading ? <ActivityIndicator /> : <Text style={{ color: Colors.fontLight }}>Submit</Text>}
      </Button>
    </CustomSheet>
  );
};

export default ScheduleAchievement;
