import { useNavigation } from "@react-navigation/core";

import { StyleSheet, View, Text, Linking } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import { useFetch } from "../../../hooks/useFetch";
import EmployeeLeaveDashboard from "../../../components/Tribe/MyInformation/EmployeeLeaveDashboard";
import EmployeeInformation from "../../../components/Tribe/MyInformation/EmployeeInformation";
import SupervisorInformation from "../../../components/Tribe/MyInformation/SupervisorInformation";
import { TextProps } from "../../../styles/CustomStylings";
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";

const MyInformation = () => {
  const navigation = useNavigation();

  const {
    data: profile,
    isFetching: profileIsFetching,
    refetch: refetchProfile,
  } = useFetch("/hr/my-profile");

  const leaveStatusArr = [
    {
      id: 1,
      name: "Available Leave",
      icon: "clipboard-outline",
      qty: profile?.data?.leave_quota,
      backgroundColor: Colors.borderGrey,
      iconColor: Colors.primary,
      onPress: () =>
        navigation.navigate("New Leave Request", {
          employeeId: profile?.data?.id,
        }),
    },
    {
      id: 2,
      name: "Pending Approval",
      icon: "clipboard-pulse-outline",
      qty: profile?.data?.pending_leave_request,
      backgroundColor: "#FAF6E8",
      iconColor: "#FFD240",
      onPress: () => navigation.navigate("Leave Requests"),
    },
    {
      id: 3,
      name: "Approved",
      icon: "clipboard-check-outline",
      qty: profile?.data?.approved_leave_request,
      backgroundColor: "#E9F5EC",
      iconColor: "#49C96D",
      onPress: () => navigation.navigate("Leave Requests"),
    },
  ];

  /**
   * Handle press icon call
   * @param {*} phone
   */
  const handleCallButton = (phone) => {
    Linking.openURL(phone).catch((err) => console.log(err));
  };

  return (
    <Screen screenTitle="My Information">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={profileIsFetching} onRefresh={refetchProfile} />
        }
      >
        <View style={styles.content}>
          {!profile?.data ? (
            <View style={{ alignItems: "center", justifyContent: "center", gap: 5 }}>
              <Text style={[{ fontSize: 12 }, TextProps]}>No Data</Text>
            </View>
          ) : (
            <>
              <EmployeeLeaveDashboard leaveStatus={leaveStatusArr} />
              <View style={{ gap: 20 }}>
                <EmployeeInformation
                  id={profile?.data?.id}
                  name={profile?.data?.name}
                  position={profile?.data?.job_history?.position?.name}
                  email={profile?.data?.email}
                  phone={profile?.data?.phone_number}
                  image={profile?.data?.image}
                  navigation={navigation}
                />
                <SupervisorInformation
                  supervisorId={profile?.data?.supervisor_employee_id}
                  supervisorName={
                    profile?.data?.job_history?.position?.supervisor?.employee_supervisor
                      ?.employee?.name
                  }
                  supervisorPhone={
                    profile?.data?.job_history?.position?.supervisor?.employee_supervisor
                      ?.employee?.phone_number
                  }
                  supervisorEmail={
                    profile?.data?.job_history?.position?.supervisor?.employee_supervisor
                      ?.employee?.email
                  }
                  supervisorImage={profile?.data?.supervisor_image}
                  supervisorPosition={
                    profile?.data?.job_history?.position?.supervisor?.name
                  }
                  refetch={refetchProfile}
                  id={profile?.data?.id}
                  navigation={navigation}
                  onClickCall={handleCallButton}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
};

export default MyInformation;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 10,
    marginVertical: 14,
  },
});
