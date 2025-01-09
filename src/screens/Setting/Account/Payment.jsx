import { useNavigation } from "@react-navigation/native";

import { Text } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../layouts/Screen";

const Payment = () => {
  const navigation = useNavigation();

  return (
    <Screen screenTitle="Payments" returnButton={true} onPress={() => navigation.goBack()}>
      <Text style={[{ fontWeight: "500" }, TextProps]}>Redirect to website</Text>
    </Screen>
  );
};

export default Payment;
