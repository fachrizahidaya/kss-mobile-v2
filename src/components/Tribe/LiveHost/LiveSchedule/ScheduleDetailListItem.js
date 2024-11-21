import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CustomCard from "../../../../layouts/CustomCard";
import { TextProps } from "../../../../styles/CustomStylings";
import { Colors } from "../../../../styles/Color";
import ScheduleAchievement from "./ScheduleAchievement";
import { useLoading } from "../../../../hooks/useLoading";
import axiosInstance from "../../../../config/api";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import AlertModal from "../../../../styles/modals/AlertModal";
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
}) => {
  const [achievement, setAchievement] = useState(real_achievement);

  const achievementSheet = useRef();

  var achievementString = achievement?.toString();

  const { toggle: toggleUpdateProcess, isLoading: updateProcessIsLoading } = useLoading(false);
  const { toggle, isOpen } = useDisclosure(false);

  const handleAchievementSheet = () => {
    achievementSheet.current?.show();
  };

  const handleUpdateAchievement = async (data) => {
    try {
      toggleUpdateProcess();
      const res = await axiosInstance.patch(`/hr/ecom-live-schedule/session/${id}`, data);
      achievementSheet.current?.hide();
      toggleUpdateProcess();
    } catch (err) {
      console.log(err);
      toggleUpdateProcess();
    }
  };

  const formik = useFormik({
    initialValues: {
      real_achievement: achievementString || 0,
    },
    validationSchema: yup.object().shape({
      real_achievement: yup.number().required("Value is required").min(0, "Value should not be negative"),
    }),
    onSubmit: (values) => {
      if (formik.isValid) {
        if (values.real_achievement) {
          values.real_achievement = Number(values.real_achievement);
        } else {
          values.real_achievement = null;
        }
        handleUpdateAchievement(values);
      }
    },
    enableReinitialize: true,
  });

  return (
    <>
      <CustomCard handlePress={handleAchievementSheet} index={index} length={length} gap={8}>
        <View style={{ gap: 5 }}>
          <View style={{ gap: 3 }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text
                style={[TextProps, { maxWidth: 300, overflow: "hidden", fontWeight: "600" }]}
                ellipsizeMode="tail"
                numberOfLines={2}
              >
                {brand || "-"}
              </Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.iconDark} />
            </View>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>
              {begin_time} - {end_time}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ gap: 3 }}>
              <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Achievement</Text>
              <Text style={[TextProps, { fontWeight: "600" }]}>{formatter.format(real_achievement) || "-"}</Text>
            </View>
            <View style={{ gap: 3 }}>
              <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>Min. Achievement</Text>
              <Text style={[TextProps, { textAlign: "right", fontWeight: "600" }]}>{min_achievement || "-"}</Text>
            </View>
          </View>
        </View>
        <View style={{ flexWrap: "wrap" }}>
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
      </CustomCard>
      <ScheduleAchievement
        reference={achievementSheet}
        real_achievement={achievement ? achievement : "-"}
        current_achievement={real_achievement}
        isLoading={updateProcessIsLoading}
        formik={formik}
      />
      <AlertModal />
    </>
  );
};

export default ScheduleDetailListItem;
