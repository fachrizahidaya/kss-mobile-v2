import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";

const DetailList = ({
  data,
  isLoading,
  code,
  name,
  account_type,
  currency,
  balance_date,
  balance,
  notes,
  converter,
}) => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <CustomCard backgroundColor={isLoading ? null : "#FFFFFF"} gap={8}>
      {!isLoading ? (
        <View style={{ gap: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={{ gap: 5, width: screenWidth - 250 }}>
              <Text style={[TextProps]}>Code</Text>
              <Text style={[TextProps, { opacity: 0.5 }]}>{code || "No Data"}</Text>
            </View>
            <View style={{ gap: 5 }}>
              <Text style={[TextProps]}>Name</Text>
              <Text style={[TextProps, { opacity: 0.5 }]}>{name || "No Data"}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={{ gap: 5, width: screenWidth - 250 }}>
              <Text style={[TextProps]}>Account Type</Text>
              <Text style={[TextProps, { opacity: 0.5 }]}>{account_type || "No Data"}</Text>
            </View>
            <View style={{ gap: 5 }}>
              <Text style={[TextProps]}>Currency</Text>
              <Text style={[TextProps, { opacity: 0.5 }]}>{currency || "No Data"}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={{ gap: 5, width: screenWidth - 250 }}>
              <Text style={[TextProps]}>Balance Date</Text>
              <Text style={[TextProps, { opacity: 0.5 }]}>
                {balance_date === "Invalid Date" ? "No Data" : balance_date}
              </Text>
            </View>
            <View style={{ gap: 5 }}>
              <Text style={[TextProps]}>Balance</Text>
              <Text style={[TextProps, { opacity: 0.5 }]}>
                {balance < 0 ? `(${converter.format(Math.abs(balance))})` : converter.format(balance) || "No Data"}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={{ gap: 5 }}>
              <Text style={[TextProps]}>Notes</Text>
              <Text style={[TextProps, { opacity: 0.5 }]}>{notes || "No Data"}</Text>
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
