import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";
import { Colors } from "../../../styles/Color";

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
    <CustomCard backgroundColor={isLoading ? null : Colors.secondary} gap={8}>
      {!isLoading ? (
        <View style={{ gap: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={{ gap: 5, width: screenWidth - 250 }}>
              <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Code</Text>
              <Text style={[TextProps]}>{code || "-"}</Text>
            </View>
            <View style={{ gap: 5 }}>
              <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Name</Text>
              <Text style={[TextProps]}>{name || "-"}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={{ gap: 5, width: screenWidth - 250 }}>
              <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Account Type</Text>
              <Text style={[TextProps]}>{account_type || "-"}</Text>
            </View>
            <View style={{ gap: 5 }}>
              <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Currency</Text>
              <Text style={[TextProps]}>{currency || "-"}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={{ gap: 5, width: screenWidth - 250 }}>
              <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Balance Date</Text>
              <Text style={[TextProps]}>{balance_date === "Invalid Date" ? "-" : balance_date}</Text>
            </View>
            <View style={{ gap: 5 }}>
              <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Balance</Text>
              <Text style={[TextProps]}>
                {balance < 0 ? `(${converter.format(Math.abs(balance))})` : converter.format(balance) || "-"}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View style={{ gap: 5 }}>
              <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Notes</Text>
              <Text style={[TextProps]}>{notes || "-"}</Text>
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
