import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

import Button from "../../../styles/forms/Button";

const ItemDetail = ({ backdropPress, visible, onClose, data, converter }) => {
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight =
    Platform.OS === "ios"
      ? Dimensions.get("window").height
      : require("react-native-extra-dimensions-android").get("REAL_WINDOW_HEIGHT");

  let detailArr =
    data?.balance_type === "credit"
      ? [
          {
            name: "Account Code",
            value: data?.coa?.code,
          },
          {
            name: "Account Name",
            value: data?.coa?.name,
          },
          {
            name: "Credit",
            value: converter.format(data?.credit_amount),
          },
        ]
      : [
          {
            name: "Account Code",
            value: data?.coa?.code,
          },
          {
            name: "Account Name",
            value: data?.coa?.name,
          },
          {
            name: "Debit",
            value: converter.format(data?.debt_amount),
          },
        ];

  return (
    <Modal isVisible={visible} onBackdropPress={backdropPress} deviceHeight={deviceHeight} deviceWidth={deviceWidth}>
      <View style={styles.container}>
        <View style={{ gap: 5 }}>
          {detailArr.map((item, index) => {
            return (
              <View key={index}>
                <Text>{item.name}:</Text>
                <Text>{item.value}</Text>
              </View>
            );
          })}
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
          <Button padding={5} onPress={onClose}>
            <Text style={{ color: "#FFFFFF" }}>Close</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
});
