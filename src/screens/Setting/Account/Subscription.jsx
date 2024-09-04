import { useNavigation } from "@react-navigation/native";

import Screen from "../../../styles/Screen";

const Subscription = () => {
  const navigation = useNavigation();

  return <Screen screenTitle="Subscriptions" returnButton={true} onPress={() => navigation.goBack()}></Screen>;
};

export default Subscription;
