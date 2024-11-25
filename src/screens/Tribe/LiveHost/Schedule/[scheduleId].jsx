import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useFetch } from "../../../../hooks/useFetch";
import Screen from "../../../../layouts/Screen";
import ScheduleDetailList from "../../../../components/Tribe/LiveHost/LiveSchedule/ScheduleDetailList";
import AlertModal from "../../../../styles/modals/AlertModal";
import { useDisclosure } from "../../../../hooks/useDisclosure";

const ScheduleDetail = () => {
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();

  const { id } = route.params;
  const { toggle, isOpen } = useDisclosure(false);

  const { data, isLoading, refetch } = useFetch(`/hr/ecom-live-schedule/${id}`);

  return (
    <Screen screenTitle={"Schedule"} returnButton={true} onPress={() => navigation.goBack()}>
      <ScheduleDetailList
        data={data?.data?.session}
        isLoading={isLoading}
        refetch={refetch}
        setError={setErrorMessage}
        setRequstType={setRequestType}
        toggleAlert={toggle}
        date={data?.data?.date}
        isOpen={isOpen}
        requestType={requestType}
        error={errorMessage}
      />
      <AlertModal
        toggle={toggle}
        isOpen={isOpen}
        type={requestType === "post" ? "info" : "danger"}
        title={requestType === "post" ? "Achievement updated!" : "Process error!"}
        description={requestType === "post" ? "Keep it up!" : errorMessage || "Please try again later"}
      />
    </Screen>
  );
};

export default ScheduleDetail;
