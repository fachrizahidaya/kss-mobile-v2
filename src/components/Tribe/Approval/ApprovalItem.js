import dayjs from "dayjs";

import { Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomBadge from "../../../styles/CustomBadge";
import { Colors } from "../../../styles/Color";
import ApprovalCard from "../shared/ApprovalCard";

const ApprovalItem = ({
  description,
  index,
  length,
  request,
  date,
  type,
  forSick,
  navigation,
  kind,
  status,
  approvalCreator,
}) => {
  return (
    <ApprovalCard
      index={index}
      length={length}
      navigation={navigation}
      forSick={forSick}
      date={date}
      kind={kind}
      approvalCreator={approvalCreator}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={[TextProps, { fontSize: 12, fontWeight: "700" }]}
            numberOfLines={1}
          >
            {dayjs(date).format("DD MMM YYYY")}
          </Text>
        </View>
        <CustomBadge backgroundColor={Colors.borderGrey} description={kind} />
      </View>
      <Text
        style={[TextProps, { fontSize: 12, fontWeight: "700" }]}
        numberOfLines={1}
      >
        {status}
      </Text>
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={[TextProps, { fontSize: 12 }]}
      >
        {request}
      </Text>
    </ApprovalCard>
  );
};

export default ApprovalItem;
