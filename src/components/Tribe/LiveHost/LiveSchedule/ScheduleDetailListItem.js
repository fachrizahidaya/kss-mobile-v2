import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import dayjs from "dayjs";

import { Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CustomCard from "../../../../layouts/CustomCard";
import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";
import ScheduleAchievement from "./ScheduleAchievement";
import { useLoading } from "../../../../hooks/useLoading";
import axiosInstance from "../../../../config/api";
import CustomBadge from "../../../../styles/CustomBadge";

const ScheduleDetailListItem = ({
  id,
  begin_time,
  brand,
  end_time,
  min_achievement,
  index,
  length,
  real_achievement,
  formatter,
  hosts,
  refetch,
  setRequestType,
  requestType,
  setError,
  error,
  toggle,
  date,
  isOpen,
}) => {
  const achievementSheet = useRef();

  var achievementString = real_achievement?.toString();

  const { toggle: toggleUpdateProcess, isLoading: updateProcessIsLoading } = useLoading(false);

  const handleAchievementSheet = () => {
    if (hosts?.length) {
      achievementSheet.current?.show();
    }
  };

  const handleUpdateAchievement = async (data) => {
    try {
      toggleUpdateProcess();
      const res = await axiosInstance.patch(`/hr/ecom-live-schedule/session/${id}/achievement`, data);
      setRequestType("post");
      refetch();
      toggle();
      // achievementSheet.current?.hide();
      toggleUpdateProcess();
    } catch (err) {
      console.log(err);
      setRequestType("error");
      setError(err.response.data.message);
      toggle();
      toggleUpdateProcess();
    }
  };

  const formik = useFormik({
    initialValues: {
      actual_achievement: achievementString || 0,
    },
    validationSchema: yup.object().shape({
      actual_achievement: yup.number().required("Value is required").min(0, "Value should not be negative"),
    }),
    onSubmit: (values) => {
      if (formik.isValid) {
        if (values.actual_achievement) {
          values.actual_achievement = Number(values.actual_achievement);
        } else {
          values.actual_achievement = null;
        }
        handleUpdateAchievement(values);
      }
    },
    enableReinitialize: true,
  });

  return (
    <CustomCard handlePress={handleAchievementSheet} index={index} length={length} gap={8}>
      <View style={{ gap: 8 }}>
        <View style={{ gap: 4 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text
              style={[TextProps, { maxWidth: 250, overflow: "hidden", fontWeight: "600" }]}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {brand || "-"}
            </Text>
            {hosts?.length > 0 && <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.iconDark} />}
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>
              {begin_time} - {end_time}
            </Text>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{dayjs(date).format("DD MMM YYYY")}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 5 }}>
          {hosts?.map((host, index) => {
            return (
              <CustomBadge
                key={index}
                description={host?.employee?.name}
                backgroundColor={Colors.primary}
                textColor={Colors.fontLight}
              />
            );
          })}
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
          <View style={{ gap: 3 }}>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Achievement</Text>
            <Text style={[TextProps, { textAlign: "right", fontWeight: "600", fontSize: 16 }]}>
              {formatter.format(real_achievement) || 0}
            </Text>
          </View>
        </View>
      </View>
      <ScheduleAchievement
        reference={achievementSheet}
        isLoading={updateProcessIsLoading}
        formik={formik}
        achievementString={achievementString}
        toggleAlert={toggle}
        alertIsOpen={isOpen}
        requestType={requestType}
        error={error}
      />
    </CustomCard>
  );
};

export default ScheduleDetailListItem;
