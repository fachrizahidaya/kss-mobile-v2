import { useNavigation } from "@react-navigation/native";
import Screen from "../../../layouts/Screen";

const ReminderSetting = () => {
  const navigation = useNavigation();

  return (
    <Screen
      screenTitle="Reminder Setting"
      returnButton={true}
      onPress={() => navigation.goBack()}
      backgroundColor="#FFFFFF"
    ></Screen>
  );
};

export default ReminderSetting;
