import { useNavigation } from "@react-navigation/native";

import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import PageHeader from "../../../styles/PageHeader";
import { TextProps } from "../../../styles/CustomStylings";

const Subscription = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginVertical: 15, paddingHorizontal: 16, gap: 24 }}>
        <PageHeader title="Subscribtions" onPress={() => navigation.goBack()} />

        <Text style={[{ fontWeight: 500 }, TextProps]}>Redirect to website</Text>
      </View>
    </SafeAreaView>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
