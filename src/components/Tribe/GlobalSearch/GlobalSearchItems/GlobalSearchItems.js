import { StyleSheet, View } from "react-native";

import EmployeeSection from "../EmployeeSection/EmployeeSection";
import FeedSection from "../FeedSection/FeedSection";

const GlobalSearchItems = ({ data, employeeUsername, navigation }) => {
  const { employee, post } = data;

  return (
    <View style={styles.flex}>
      {employee?.length > 0 && <EmployeeSection employee={employee} navigation={navigation} />}
      {post?.length > 0 && <FeedSection feed={post} employeeUsername={employeeUsername} navigation={navigation} />}
    </View>
  );
};

export default GlobalSearchItems;

const styles = StyleSheet.create({
  flex: {
    gap: 20,
  },
});
