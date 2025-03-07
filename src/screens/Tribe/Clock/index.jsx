import { useNavigation } from "@react-navigation/native";

import Screen from "../../../layouts/Screen";

const Clock = () => {
  const navigation = useNavigation();

  const handleReturn = () => {
    navigation.goBack();
  };

  return (
    <Screen screenTitle={"Clock In"} returnButton={true} onPress={handleReturn}></Screen>
  );
};

export default Clock;
