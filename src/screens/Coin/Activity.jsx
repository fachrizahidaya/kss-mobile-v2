import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { SafeAreaView, StyleSheet, View } from "react-native";
import PageHeader from "../../styles/PageHeader";
import { useFetch } from "../../hooks/useFetch";
import ActivityList from "../../components/Coin/Activity/ActivityList";

const Activity = () => {
  const [hasBeenScrolled, setHasBeenScrolled] = useState(false);

  const navigation = useNavigation();

  const { data, refetch, isFetching, isLoading } = useFetch("/acc/dashboard/recent-activity");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <PageHeader title="Activity" onPress={() => navigation.goBack()} />
      </View>
      <ActivityList
        data={data?.data}
        isFetching={isFetching}
        isLoading={isLoading}
        refetch={refetch}
        hasBeenScrolled={hasBeenScrolled}
        setHasBeenScrolled={setHasBeenScrolled}
      />
    </SafeAreaView>
  );
};

export default Activity;

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
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
});
