import { useNavigation, useRoute } from "@react-navigation/native";
import Screen from "../../../../layouts/Screen";
import { useFetch } from "../../../../hooks/useFetch";
import HistoryDetailList from "../../../../components/Tribe/LiveHost/LiveHistory/HistoryDetailList";

const HistoryDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const { data, isLoading, refetch } = useFetch(`/hr/ecom-live-history/${id}`);
  const currencyFormatter = new Intl.NumberFormat("en-US", {});

  return (
    <Screen screenTitle={"History"} returnButton={true} onPress={() => navigation.goBack()}>
      <HistoryDetailList
        brand={data?.data?.brand?.name}
        begin_time={data?.data?.begin_time}
        end_time={data?.data?.end_time}
        formatter={currencyFormatter}
        real_achievement={data?.data?.real_achievement}
        min_achievement={data?.data?.min_achievement}
        hosts={data?.data?.host}
      />
    </Screen>
  );
};

export default HistoryDetail;
