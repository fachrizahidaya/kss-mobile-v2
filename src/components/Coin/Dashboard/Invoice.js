import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import InvoiceList from "./InvoiceList";
import { TextProps } from "../../../styles/CustomStylings";

const Invoice = ({ data, navigation, converter, isLoading, refetch }) => {
  return (
    <View style={{ gap: 10 }}>
      <View style={styles.header}>
        <Text style={[{ fontSize: 18, fontWeight: 500 }, TextProps]}>Invoice</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Pressable onPress={() => navigation.navigate("Invoice")} style={styles.showMore}>
            <Text style={[TextProps, { fontSize: 11 }]}>Show more</Text>
            <MaterialCommunityIcons name="chevron-right" size={15} color="#3F434A" />
          </Pressable>
          <Pressable onPress={refetch} style={styles.refresh}>
            <MaterialCommunityIcons name="refresh" size={15} color="#3F434A" />
          </Pressable>
        </View>
      </View>
      <InvoiceList data={data} converter={converter} isLoading={isLoading} />
    </View>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16 },
  categoryWrapper: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    padding: 0.5,
    borderColor: "#E8E9EB",
  },
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    flexDirection: "column",
  },
  animatedContainer: {
    flex: 1,
    width: "100%",
  },
  showMore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#ffffff",
  },
  refresh: {
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#ffffff",
  },
});
