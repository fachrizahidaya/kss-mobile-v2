import { useNavigation } from "@react-navigation/native";

import Screen from "../../../layouts/Screen";
import MapLocation from "../../../components/Tribe/Clock/MapLocation";

const Clock = () => {
  const navigation = useNavigation();

  const handleReturn = () => {
    navigation.goBack();
  };

  return (
    <Screen screenTitle={"Clock In"} returnButton={true} onPress={handleReturn}>
      <MapLocation />
    </Screen>
  );
};

export default Clock;
