import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomCard from "../../../layouts/CustomCard";
import Header from "../SalesOrder/Header";

const DetailList = ({
  data,
  isLoading,
  total_amount,
  doc_no,
  currency,
  status,
  date,
  title,
  useHeader,
  backgroundColor,
  textColor,
}) => {
  return (
    <CustomCard gap={8}>
      {useHeader == null ? (
        <Header
          total_amount={total_amount}
          doc_no={doc_no}
          currency={currency}
          status={status}
          date={date}
          title={title}
          backgroundColor={backgroundColor}
          textColor={textColor}
        />
      ) : null}

      {!isLoading ? (
        data.map((item, index) => {
          return (
            <View key={index} style={[styles.container, { marginBottom: index === data?.length - 1 ? 8 : null }]}>
              <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{item.name}</Text>
              <Text style={[TextProps]}>{item.data}</Text>
            </View>
          );
        })
      ) : (
        <ActivityIndicator />
      )}
    </CustomCard>
  );
};

export default DetailList;

const styles = StyleSheet.create({
  container: {
    gap: 4,
    marginTop: 8,
  },
});
