import { useNavigation } from "@react-navigation/native";
import Screen from "../../../layouts/Screen";

const Items = () => {
  const navigation = useNavigation();
  return (
    <Screen
      screenTitle="Items"
      returnButton={true}
      backgroundColor="#FFFFFF"
      onPress={() => navigation.goBack()}
    ></Screen>
  );
};

export default Items;
