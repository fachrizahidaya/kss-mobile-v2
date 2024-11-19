import CourierList from "../../../components/Silo/Courier/CourierList";
import { useFetch } from "../../../hooks/useFetch";
import Screen from "../../../layouts/Screen";

const Courier = () => {
  const { data, isFetching, isLoading, refetch } = useFetch(`/wm/courier`);

  return (
    <Screen screenTitle="Courier">
      <CourierList data={data?.data} isFetching={isFetching} refetch={refetch} isLoading={isLoading} />
    </Screen>
  );
};

export default Courier;
