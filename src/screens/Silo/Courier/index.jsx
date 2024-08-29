import { useNavigation } from "@react-navigation/native";

import { SafeAreaView, StyleSheet, View } from "react-native";

import CourierList from "../../../components/Silo/Courier/CourierList";
import PageHeader from "../../../styles/PageHeader";
import { useFetch } from "../../../hooks/useFetch";

const Courier = () => {
  const navigation = useNavigation();

  const { data, isFetching, isLoading, refetch } = useFetch(`/wm/courier`);

  const onReturn = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PageHeader title="Courier" onPress={onReturn} />
      </View>
      <CourierList data={data?.data} isFetching={isFetching} refetch={refetch} isLoading={isLoading} />
    </SafeAreaView>
  );
};

export default Courier;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    position: "relative",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  scanner: {
    height: 500,
    width: 500,
  },
  addIcon: {
    backgroundColor: "#377893",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 30,
    right: 15,
    zIndex: 2,
    borderRadius: 30,
    shadowOffset: 0,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
});
