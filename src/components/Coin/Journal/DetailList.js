import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";

const DetailList = ({ data, isLoading, journal_no, journal_date, transaction_type, transaction_no, notes }) => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <CustomCard gap={8}>
      {!isLoading ? (
        <View style={{ gap: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={{ gap: 5, width: screenWidth - 250 }}>
              <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Journal No.</Text>
              <Text style={[TextProps]}>{journal_no || "No Data"}</Text>
            </View>
            <View style={{ gap: 5 }}>
              <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Journal Date</Text>
              <Text style={[TextProps]}>{journal_date || "No Data"}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={{ gap: 5, width: screenWidth - 250 }}>
              <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Transaction Type</Text>
              <Text style={[TextProps]}>{transaction_type || "No Data"}</Text>
            </View>
            <View style={{ gap: 5 }}>
              <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Transaction No.</Text>
              <Text style={[TextProps]}>{transaction_no || "No Data"}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={{ gap: 5 }}>
              <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Notes</Text>
              <Text style={[TextProps]}>{notes || "No Data"}</Text>
            </View>
          </View>
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </CustomCard>
  );
};

export default DetailList;

const styles = StyleSheet.create({});
