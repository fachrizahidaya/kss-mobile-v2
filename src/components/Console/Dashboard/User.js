<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import CustomCard from "../../../layouts/CustomCard";
import { Colors } from "../../../styles/Color";
import { TextProps } from "../../../styles/CustomStylings";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";

const User = ({ data, isLoading }) => {
  let renderUser;
  if (isLoading) {
    renderUser = <ActivityIndicator />;
  } else if (data) {
    renderUser = data.map((item, index) => {
      return (
        <View key={index} style={styles.content}>
          <Text style={TextProps}>{item?.["type"]}</Text>
          <Text style={TextProps}>{item?.["count"]}</Text>
        </View>
      );
    });
  } else {
    renderUser = <EmptyPlaceholder text="No Data" />;
  }

  return <CustomCard>{renderUser}</CustomCard>;
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { StyleSheet, Text, View } from "react-native";
=======
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
>>>>>>> cfe770bf (fix: adjust api option with parameters)
import CustomCard from "../../../layouts/CustomCard";
import { Colors } from "../../../styles/Color";
import { TextProps } from "../../../styles/CustomStylings";
import EmptyPlaceholder from "../../../layouts/EmptyPlaceholder";

<<<<<<< HEAD
const User = ({ data }) => {
  return (
    <CustomCard>
      {data.map((item, index) => {
        return (
          <View key={index} style={styles.content}>
            <Text style={TextProps}>{item?.["type"]}</Text>
            <Text style={TextProps}>{item?.["count"]}</Text>
          </View>
        );
      })}
    </CustomCard>
  );
>>>>>>> 2075a560 (feat: new user)
=======
const User = ({ data, isLoading }) => {
  let renderUser;
  if (isLoading) {
    renderUser = <ActivityIndicator />;
  } else if (data) {
    renderUser = data.map((item, index) => {
      return (
        <View key={index} style={styles.content}>
          <Text style={TextProps}>{item?.["type"]}</Text>
          <Text style={TextProps}>{item?.["count"]}</Text>
        </View>
      );
    });
  } else {
    renderUser = <EmptyPlaceholder text="No Data" />;
  }

  return <CustomCard>{renderUser}</CustomCard>;
>>>>>>> cfe770bf (fix: adjust api option with parameters)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
};

export default User;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.backgroundLight,
    marginVertical: 4,
    padding: 8,
    borderRadius: 8,
  },
});
