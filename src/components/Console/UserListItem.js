import { StyleSheet, Text, View } from "react-native";
import CustomCard from "../../layouts/CustomCard";

const UserListItem = ({ index, length }) => {
  return (
    <CustomCard index={index} length={length}>
      <View style={styles.content}></View>
    </CustomCard>
  );
};

export default UserListItem;

const styles = StyleSheet.create({
  content: {},
});
