import { useNavigation } from "@react-navigation/native";

import CourierList from "../../../components/Silo/Courier/CourierList";
import { useFetch } from "../../../hooks/useFetch";
import Screen from "../../../styles/Screen";

const Courier = () => {
  const navigation = useNavigation();

  const { data, isFetching, isLoading, refetch } = useFetch(`/wm/courier`);

  const handleReturn = () => {
    navigation.goBack();
  };

  return (
    <Screen screenTitle="Courier" returnButton={true} onPress={handleReturn}>
      <CourierList data={data?.data} isFetching={isFetching} refetch={refetch} isLoading={isLoading} />
    </Screen>
  );
};

export default Courier;
