import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { useFetch } from "../../hooks/useFetch";
import ActivityList from "../../components/Coin/Activity/ActivityList";
import Screen from "../../styles/Screen";

const Activity = () => {
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);

  const navigation = useNavigation();

  const { data, refetch, isFetching, isLoading } = useFetch("/acc/dashboard/recent-activity");

  return (
    <Screen screenTitle="Activity" returnButton={true} onPress={() => navigation.goBack()}>
      <ActivityList
        data={data?.data}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
      />
    </Screen>
  );
};

export default Activity;
