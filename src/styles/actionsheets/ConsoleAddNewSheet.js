import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AlertModal from "../modals/AlertModal";
import { Colors } from "../Color";
import CustomSheet from "../../layouts/CustomSheet";
import { TextProps } from "../CustomStylings";
import { useDisclosure } from "../../hooks/useDisclosure";

const ConsoleAddNewSheet = (props) => {
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8e27ed27 (fix: new user)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
  const { isOpen: newUserIsOpen, toggle: toggleNewUser } = useDisclosure(false);

  const items = [
    {
      icons: "account-plus-outline",
      title: `New User`,
      screen: "New User",
    },
  ];

  const handleNavigate = (value) => {
    navigation.navigate(value.screen, {
      toggle: toggleNewUser,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 5ef7bde9 (fix: new user, contact list)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
      setRequest: setRequestType,
      setErrorMessage: setErrorMessage,
    });
    props.reference.current?.hide();
  };

<<<<<<< HEAD
<<<<<<< HEAD
=======
  const { isOpen: isSuccessUser, toggle: toggleSuccessUser } = useDisclosure(false);

  const items = [
    {
      icons: "account-plus-outline",
      title: `New User`,
      screen: "New User",
    },
  ];

<<<<<<< HEAD
>>>>>>> cb78f292 (feat: console)
=======
  const handleNavigate = (value) => {
    navigation.navigate(value.screen, {});
=======
      setRequestType: setRequestType,
      setErrorMessage: setErrorMessage,
    });
>>>>>>> 8e27ed27 (fix: new user)
    props.reference.current?.hide();
  };

>>>>>>> 2075a560 (feat: new user)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
  return (
    <>
      <CustomSheet reference={props.reference} moduleScreenSheet={true}>
        {items.map((item, idx) => {
          return (
            <Pressable
              key={idx}
              style={styles.wrapper}
              onPress={() => handleNavigate(item)}
            >
              <View style={styles.content}>
                <View style={styles.item}>
                  <MaterialCommunityIcons
                    name={item.icons}
                    size={20}
                    color={Colors.iconDark}
                  />
                </View>
                <Text key={item.title} style={TextProps}>
                  {item.title}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </CustomSheet>
      <AlertModal
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8e27ed27 (fix: new user)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
        isOpen={newUserIsOpen}
        toggle={toggleNewUser}
        title={"User created!"}
        description={"New user available"}
        type={"post"}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
        isOpen={isSuccessUser}
        toggle={toggleSuccessUser}
        title={
          requestType === "post"
            ? "Note created!"
            : requestType === "patch"
            ? "Changes saved!"
            : "Process error!"
        }
        description={
          requestType === "post"
            ? "We will hold the note for you"
            : requestType === "patch"
            ? "Data successfully saved"
            : errorMessage || "Please try again later"
        }
        type={
          requestType === "post" ? "info" : requestType === "patch" ? "success" : "error"
        }
>>>>>>> cb78f292 (feat: console)
=======
>>>>>>> 8e27ed27 (fix: new user)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
      />
    </>
  );
};

export default ConsoleAddNewSheet;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: Colors.borderGrey,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 21,
  },
  item: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 5,
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
