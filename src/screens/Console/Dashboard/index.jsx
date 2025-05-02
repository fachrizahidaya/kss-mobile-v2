<<<<<<< HEAD
import { ActivityIndicator, Text } from "react-native";
import Screen from "../../../layouts/Screen";
import { useFetch } from "../../../hooks/useFetch";
import User from "../../../components/Console/Dashboard/User";

const ConsoleDashboard = () => {
  const { data, isFetching, isLoading, refetch } = useFetch("/users");

  const countByType =
    data?.data?.reduce((acc, item) => {
      acc[item?.user_right_name] = (acc[item?.user_right_name] || 0) + 1;
      return acc;
    }, {}) || {};

  const resultOfCount = Object.entries(countByType).map(([type, count]) => ({
    type,
    count,
  }));

  return (
    <Screen>
      <User data={resultOfCount} isLoading={isLoading} />
    </Screen>
  );
=======
import { Text } from "react-native";
import Screen from "../../../layouts/Screen";

const ConsoleDashboard = () => {
<<<<<<< HEAD
  return <Text>ConsoleDashboard</Text>;
>>>>>>> cb78f292 (feat: console)
=======
  return (
    <Screen>
      <Text>ConsoleDashboard</Text>
    </Screen>
  );
>>>>>>> 61a40d09 (feat: dashboard)
};

export default ConsoleDashboard;
