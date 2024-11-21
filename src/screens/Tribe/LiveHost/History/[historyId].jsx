import { useNavigation, useRoute } from "@react-navigation/native";
import Screen from "../../../../layouts/Screen";
import { useFetch } from "../../../../hooks/useFetch";
import HistoryDetailList from "../../../../components/Tribe/LiveHost/LiveHistory/HistoryDetailList";

const HistoryDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const { data, isLoading, refetch } = useFetch(`/hr/ecom-live-history/${id}`);
  return (
    <Screen screenTitle={"History"} returnButton={true} onPress={() => navigation.goBack()}>
      <HistoryDetailList />
    </Screen>
  );
};

export default HistoryDetail;
