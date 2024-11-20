import { ActivityIndicator, Text, View } from "react-native";
import CustomSheet from "../../../../layouts/CustomSheet";
import Input from "../../../../styles/forms/Input";
import Button from "../../../../styles/forms/Button";
import { Colors } from "../../../../styles/Color";

const ScheduleAchievement = ({ reference, handleUpdate, real_achievement, isLoading }) => {
  return (
    <CustomSheet reference={reference}>
      <Input title="Achievement" placeHolder="Input achievement" value={real_achievement} />
      <Button disabled={null} onPress={handleUpdate}>
        {isLoading ? <ActivityIndicator /> : <Text style={{ color: Colors.fontLight }}>Submit</Text>}
      </Button>
    </CustomSheet>
  );
};

export default ScheduleAchievement;
