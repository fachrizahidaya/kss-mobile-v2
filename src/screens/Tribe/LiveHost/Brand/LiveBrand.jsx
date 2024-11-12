import { Text, View } from "react-native";
import { useFetch } from "../../../../hooks/useFetch";
import BrandList from "../../../../components/Tribe/LiveHost/Brand/BrandList";
import Screen from "../../../../layouts/Screen";

const LiveBrand = () => {
  const { data, isLoading, isFetching, refetch } = useFetch("/hr/ecom-brand");
  console.log("d", data);

  return (
    <Screen screenTitle="E-Commerce Live Brand">
      <BrandList data={data?.data} isFetching={isFetching} isLoading={isLoading} refetch={refetch} />
    </Screen>
  );
};

export default LiveBrand;
