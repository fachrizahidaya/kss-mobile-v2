import { useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFormik } from "formik";

import { useFetch } from "../../../../hooks/useFetch";
import Screen from "../../../../layouts/Screen";
import ScheduleDetailList from "../../../../components/Tribe/LiveHost/LiveSchedule/ScheduleDetailList";
import ScheduleAchievement from "../../../../components/Tribe/LiveHost/LiveSchedule/ScheduleAchievement";
import axiosInstance from "../../../../config/api";
import { useLoading } from "../../../../hooks/useLoading";

const ScheduleDetail = () => {
  const [achievement, setAchievement] = useState(0);

  const navigation = useNavigation();
  const route = useRoute();
  const achievementSheet = useRef();

  const { id } = route.params;

  const { toggle: toggleUpdateProcess, isLoading: updateProcessIsLoading } = useLoading(false);

  const { data, isLoading, refetch } = useFetch(`/hr/ecom-live-schedule/${id}`);

  const handleAchievementSheet = () => {
    achievementSheet.current?.show();
  };

  const handleUpdateAchievement = async () => {
    try {
      toggleUpdateProcess();
      const res = await axiosInstance.patch(`/hr/ecom-live-schedule/session/${id}`, { real_achievement: achievement });
      achievementSheet.current?.hide();
      toggleUpdateProcess();
    } catch (err) {
      console.log(err);
      toggleUpdateProcess();
    }
  };

  return (
    <Screen screenTitle={"Schedule"} returnButton={true} onPress={() => navigation.goBack()}>
      <ScheduleDetailList
        data={data?.data?.session}
        isLoading={isLoading}
        refetch={refetch}
        navigation={navigation}
        handleOpenSheet={handleAchievementSheet}
        handleUpdate={handleUpdateAchievement}
        processIsLoading={updateProcessIsLoading}
        reference={achievementSheet}
        achievement={achievement}
        handleCurrentAchievement={setAchievement}
      />
      {/* <ScheduleAchievement
        reference={achievementSheet}
        real_achievement={achievement}
        handleUpdate={handleUpdateAchievement}
        isLoading={updateProcessIsLoading}
      /> */}
    </Screen>
  );
};

export default ScheduleDetail;
