import { useRef, useState } from "react";
import { useFormik } from "formik";

import { Text } from "react-native";
import CustomCard from "../../../../layouts/CustomCard";
import { TextProps } from "../../../../styles/CustomStylings";
import { useLoading } from "../../../../hooks/useLoading";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import axiosInstance from "../../../../config/api";

const SessionListItem = ({ index, length, name, begin_time, end_time, real_achievement, id, refetch }) => {
  return (
    <CustomCard index={index} length={length} gap={8}>
      <Text style={[TextProps]}>{name}</Text>
      <Text style={[TextProps]}>{`${begin_time} - ${end_time}` || "-"}</Text>
    </CustomCard>
  );
};

export default SessionListItem;
