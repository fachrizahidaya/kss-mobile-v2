import dayjs from "dayjs";

import { Text, View } from "react-native";

import { TextProps } from "../../../styles/CustomStylings";
import CustomBadge from "../../../styles/CustomBadge";
import { Colors } from "../../../styles/Color";
import ApprovalCard from "../shared/ApprovalCard";

const ApprovalItem = ({
<<<<<<< HEAD
<<<<<<< HEAD
  id,
=======
  description,
>>>>>>> 27c0a3f5 (feat: pending approval)
=======
>>>>>>> 5ff79603 (fix:)
  index,
  length,
  request,
  date,
<<<<<<< HEAD
<<<<<<< HEAD
  forSick,
  navigation,
  kind,
  status,
  approvalCreator,
  loggedInEmployee,
  handleSelectApproval,
}) => {
  return (
    <ApprovalCard
      id={id}
=======
  type,
=======
>>>>>>> 5ff79603 (fix:)
  forSick,
  navigation,
  kind,
  status,
  approvalCreator,
  loggedInEmployee,
}) => {
  return (
    <ApprovalCard
>>>>>>> 27c0a3f5 (feat: pending approval)
      index={index}
      length={length}
      navigation={navigation}
      forSick={forSick}
      date={date}
<<<<<<< HEAD
<<<<<<< HEAD
      kind={kind}
      approvalCreator={approvalCreator}
      loggedInEmployee={loggedInEmployee}
<<<<<<< HEAD
      handleSelectApproval={handleSelectApproval}
=======
>>>>>>> 27c0a3f5 (feat: pending approval)
=======
      kind={kind}
      approvalCreator={approvalCreator}
>>>>>>> f2850a25 (fix: pending approval, add section task)
=======
>>>>>>> 5ff79603 (fix:)
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
<<<<<<< HEAD
<<<<<<< HEAD
      <Text style={[TextProps, { fontSize: 12, fontWeight: "700" }]} numberOfLines={1}>
        {status}
      </Text>
      <Text numberOfLines={2} ellipsizeMode="tail" style={[TextProps, { fontSize: 12 }]}>
=======
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
>>>>>>> 27c0a3f5 (feat: pending approval)
=======
      <Text style={[TextProps, { fontSize: 12, fontWeight: "700" }]} numberOfLines={1}>
        {status}
      </Text>
      <Text numberOfLines={2} ellipsizeMode="tail" style={[TextProps, { fontSize: 12 }]}>
>>>>>>> 5ff79603 (fix:)
        {request}
      </Text>
    </ApprovalCard>
  );
};

export default ApprovalItem;
