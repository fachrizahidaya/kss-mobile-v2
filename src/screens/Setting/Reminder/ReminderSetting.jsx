import { useNavigation } from "@react-navigation/native";
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";

const ReminderSetting = () => {
  const navigation = useNavigation();

  return (
    <Screen
      screenTitle="Reminder Setting"
      returnButton={true}
      onPress={() => navigation.goBack()}
      backgroundColor={Colors.secondary}
    ></Screen>
  );
};

export default ReminderSetting;
