import { StyleSheet, Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomBadge from "../../../styles/CustomBadge";
import { Colors } from "../../../styles/Color";

const Header = ({ total_amount, doc_no, currency, status, date, title, backgroundColor, textColor }) => {
  return (
    <View style={[styles.container, { paddingTop: currency || total_amount ? 10 : null }]}>
      <View style={{ alignItems: "center", gap: 3 }}>
        {currency || total_amount ? (
          <Text style={[TextProps, { fontWeight: "600", fontSize: 28 }]}>
            {currency} {total_amount}
          </Text>
        ) : null}
        <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{doc_no ? `No. ${doc_no}` : "-"}</Text>
      </View>

      <View style={{ gap: 8 }}>
        {status ? (
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Status</Text>
            <CustomBadge description={status || "-"} backgroundColor={backgroundColor} textColor={textColor} />
          </View>
        ) : null}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{title} Date</Text>
          <Text style={[TextProps, { fontSize: 12 }]}>{date || "-"}</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGrey,
    gap: 16,
  },
});
