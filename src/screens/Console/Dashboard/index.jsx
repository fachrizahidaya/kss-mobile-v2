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
};

export default ConsoleDashboard;
