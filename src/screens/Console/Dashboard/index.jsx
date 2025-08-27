<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> cfe770bf (fix: adjust api option with parameters)
=======
>>>>>>> 859eea89 (first commit)
=======
>>>>>>> c3ae17e7 (new branch)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    </Screen>
  );
=======
import { Text } from "react-native";
import Screen from "../../../layouts/Screen";
import { useFetch } from "../../../hooks/useFetch";
import User from "../../../components/Console/Dashboard/User";

const ConsoleDashboard = () => {
<<<<<<< HEAD
<<<<<<< HEAD
  return <Text>ConsoleDashboard</Text>;
>>>>>>> cb78f292 (feat: console)
=======
=======
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

>>>>>>> 2075a560 (feat: new user)
  return (
    <Screen>
      <User data={resultOfCount} />
=======
>>>>>>> cfe770bf (fix: adjust api option with parameters)
    </Screen>
  );
>>>>>>> 61a40d09 (feat: dashboard)
=======
    </Screen>
  );
>>>>>>> 859eea89 (first commit)
=======
    </Screen>
  );
>>>>>>> c3ae17e7 (new branch)
};

export default ConsoleDashboard;
