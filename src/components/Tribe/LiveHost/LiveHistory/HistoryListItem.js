import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CustomCard from "../../../../layouts/CustomCard";
import { Colors } from "../../../../styles/Color";
import { TextProps } from "../../../../styles/CustomStylings";
import CustomBadge from "../../../../styles/CustomBadge";
import SessionAchievement from "../Host/SessionAchievement";
import { useLoading } from "../../../../hooks/useLoading";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import axiosInstance from "../../../../config/api";

const HistoryListItem = ({
  id,
  index,
  length,
  date,
  begin_time,
  end_time,
  brand,
  hosts,
  formatter,
  real_achievement,
  host,
  session_name,
  host_name,
  host_type,
  refetch,
  updateAccess,
  achievementSubmitted,
}) => {
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const achievementSheet = useRef();

  var achievementString = real_achievement?.toString();

  const { toggle: toggleUpdateProcess, isLoading: updateProcessIsLoading } = useLoading(false);

  const { toggle, isOpen } = useDisclosure(false);

  const handleAchievementSheet = () => {
    if (host) {
      achievementSheet.current?.show();
    }
  };

  const handleUpdateAchievement = async (data) => {
    try {
      toggleUpdateProcess();
      const res = await axiosInstance.patch(`/hr/ecom-live-history/session/${id}/achievement`, data);
      setRequestType("post");
      refetch();
      toggle();
      // achievementSheet.current?.hide();
      toggleUpdateProcess();
    } catch (err) {
      console.log(err);
      setRequestType("error");
      setErrorMessage(err.response.data.message);
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
    <CustomCard index={index} length={length} gap={8}>
      <View style={{ gap: 8 }}>
        <View style={{ gap: 4 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>
              {session_name}, {begin_time} - {end_time}
            </Text>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 12 }]}>{date}</Text>
          </View>
          <Text
            style={[TextProps, { maxWidth: 300, overflow: "hidden", fontWeight: "600" }]}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            {brand || "-"}
          </Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 5 }}>
          {host ? (
            <CustomBadge
              key={index}
              description={`${host_name} - ${host_type}`}
              backgroundColor={Colors.primary}
              textColor={Colors.fontLight}
            />
          ) : null}
        </View>
        <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-end", gap: 8 }}>
          <View style={{ gap: 3, alignItems: "flex-end" }}>
            <Text style={[TextProps, { opacity: 0.5, fontSize: 10 }]}>Achievement</Text>
            <Text style={[TextProps, { fontWeight: "600", fontSize: 16 }]}>
              {formatter.format(real_achievement) || 0}
            </Text>
          </View>
          {updateAccess && host && achievementSubmitted === 0 && (
            <TouchableOpacity style={styles.wrapper} onPress={handleAchievementSheet}>
              <MaterialCommunityIcons name="pencil" size={10} color={Colors.iconDark} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <SessionAchievement
        reference={achievementSheet}
        isLoading={updateProcessIsLoading}
        formik={formik}
        achievementString={achievementString}
        toggleAlert={toggle}
        alertIsOpen={isOpen}
        requestType={requestType}
        error={errorMessage}
      />
    </CustomCard>
  );
};

export default HistoryListItem;

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.borderGrey,
    backgroundColor: Colors.secondary,
    position: "relative",
  },
});
