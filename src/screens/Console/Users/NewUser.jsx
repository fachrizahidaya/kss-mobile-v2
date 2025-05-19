import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { ScrollView, TouchableWithoutFeedback } from "react-native";
import Screen from "../../../layouts/Screen";
import NewUserForm from "../../../components/Tribe/Contact/NewUserForm";
import { Colors } from "../../../styles/Color";

const NewUser = () => {
  const [isReady, setIsReady] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 100);
  });

  return (
    <TouchableWithoutFeedback>
      <Screen
        screenTitle="Create User"
        returnButton={true}
        onPress={null}
        backgroundColor={Colors.secondary}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <NewUserForm />
        </ScrollView>
      </Screen>
    </TouchableWithoutFeedback>
  );
};

export default NewUser;
