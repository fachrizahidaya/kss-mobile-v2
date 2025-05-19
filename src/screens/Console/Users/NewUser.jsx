import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Screen
        screenTitle="Create User"
        returnButton={true}
        onPress={null}
        backgroundColor={Colors.secondary}
      >
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <NewUserForm />
          </ScrollView>
        </View>
      </Screen>
    </TouchableWithoutFeedback>
  );
};

export default NewUser;

const styles = StyleSheet.create({
  content: {
    marginVertical: 14,
    marginHorizontal: 16,
    gap: 10,
  },
});
