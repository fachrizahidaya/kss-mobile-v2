import { useNavigation, useRoute } from "@react-navigation/native";
import { Text } from "react-native";
import { useFetch } from "../../../../hooks/useFetch";
import Screen from "../../../../layouts/Screen";
import ScheduleDetailList from "../../../../components/Tribe/LiveHost/LiveSchedule/ScheduleDetailList";

const ScheduleDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { id } = route.params;

  const { data, isLoading, refetch } = useFetch(`/hr/ecom-live-schedule/${id}`);

  return (
    <Screen screenTitle={"Schedule"} returnButton={true} onPress={() => navigation.goBack()}>
      <ScheduleDetailList data={data?.data?.session} isLoading={isLoading} refetch={refetch} navigation={navigation} />
    </Screen>
  );
};

export default ScheduleDetail;
