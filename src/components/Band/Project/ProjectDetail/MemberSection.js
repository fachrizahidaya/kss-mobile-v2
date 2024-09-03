import { memo, useState } from "react";
import { SheetManager } from "react-native-actions-sheet";

import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AddMemberModal from "../../shared/AddMemberModal/AddMemberModal";
import axiosInstance from "../../../../config/api";
import ConfirmationModal from "../../../../styles/modals/ConfirmationModal";
import AvatarPlaceholder from "../../../../styles/AvatarPlaceholder";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import { TextProps } from "../../../../styles/CustomStylings";
import AlertModal from "../../../../styles/modals/AlertModal";

const MemberSection = ({ projectId, projectData, members, refetchMember, isAllowed }) => {
  const [selectedMember, setSelectedMember] = useState({});
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [requestType, setRequestType] = useState("");

  const { isOpen: memberModalIsOpen, toggle: toggleMemberModal, close: closeMemberModal } = useDisclosure(false);
  const { isOpen: deleteMemberModalIsOpen, toggle } = useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const getSelectedMember = (id) => {
    toggle();

    // Filter team members which has the same id value of the selected member
    const filteredMember = members?.data.filter((member) => {
      return member.id === id;
    });

    setSelectedMember(filteredMember[0]);
  };

  /**
   * Add member to project handler
   * @param {Array} users - selected user id to add to project
   */
  const addMember = async (users, setIsLoading) => {
    try {
      for (let i = 0; i < users.length; i++) {
        await axiosInstance.post("/pm/projects/member", {
          project_id: projectId,
          user_id: users[i],
        });
      }
      setIsLoading(false);
      refetchMember();

      toggleMemberModal();
    } catch (error) {
      console.log(error);
      setRequestType("error");
      setErrorMessage(error.response.data.message);
      toggleAlert();
      setIsLoading(false);
      toggleMemberModal();
    }
  };

  return (
    <>
      <View style={{ gap: 18 }}>
        <View style={styles.header}>
          <Text style={[{ fontSize: 16, fontWeight: "500" }, TextProps]}>MEMBERS</Text>

          {isAllowed ? (
            <Pressable onPress={toggleMemberModal} style={styles.addMember}>
              <MaterialCommunityIcons name="plus" size={20} color="#3F434A" />
            </Pressable>
          ) : null}
        </View>

        <AddMemberModal
          header="Add Member"
          isOpen={memberModalIsOpen}
          onClose={closeMemberModal}
          onPressHandler={addMember}
        />

        {members?.data?.length > 0 ? (
          <View style={{ flex: 1 }}>
            <FlashList
              extraData={projectData?.owner_name}
              data={members?.data}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item?.id}
              onEndReachedThreshold={0.2}
              estimatedItemSize={204}
              horizontal
              renderItem={({ item }) => (
                <View style={styles.content}>
                  <View style={{ gap: 14, flexDirection: "row", alignItems: "center" }}>
                    <AvatarPlaceholder size="sm" name={item.member_name} image={item.member_image} />

                    <View>
                      <Text style={[{ fontWeight: "500" }, TextProps]}>{item?.member_name}</Text>
                      <Text style={{ fontWeight: "500", color: "#8A9099" }}>{item?.member_email}</Text>
                    </View>
                  </View>

                  {isAllowed ? (
                    item?.user_id !== projectData?.owner_id ? (
                      <Pressable
                        onPress={() =>
                          SheetManager.show("form-sheet", {
                            payload: {
                              children: (
                                <View style={styles.menu}>
                                  <View style={styles.wrapper}>
                                    <Pressable
                                      onPress={async () => {
                                        await SheetManager.hide("form-sheet");
                                        getSelectedMember(item.id);
                                      }}
                                      style={styles.menuItem}
                                    >
                                      <Text style={{ color: "red", fontSize: 16, fontWeight: "700" }}>
                                        Remove Member
                                      </Text>

                                      <MaterialCommunityIcons name="account-remove-outline" size={20} color="red" />
                                    </Pressable>
                                  </View>
                                </View>
                              ),
                            },
                          })
                        }
                      >
                        <MaterialCommunityIcons name="dots-vertical" size={20} color="#3F434A" />
                      </Pressable>
                    ) : null
                  ) : null}
                </View>
              )}
            />
          </View>
        ) : null}

        <ConfirmationModal
          isOpen={deleteMemberModalIsOpen}
          toggle={toggle}
          apiUrl={`/pm/projects/member/${selectedMember?.id}`}
          header="Remove Member"
          description={`Are you sure want to remove ${selectedMember?.member_name}?`}
          hasSuccessFunc={true}
          onSuccess={refetchMember}
          success={success}
          setError={setErrorMessage}
          setRequestType={setRequestType}
          setSuccess={setSuccess}
          toggleOtherModal={toggleAlert}
        />
      </View>
      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        title={requestType === "remove" ? "Member removed!" : "Process error!"}
        type={requestType === "remove" ? "success" : "danger"}
        description={requestType === "remove" ? "Data successfully saved" : errorMessage || "Please try again later"}
      />
    </>
  );
};

export default memo(MemberSection);

const styles = StyleSheet.create({
  menu: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: -20,
  },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 16 },
  wrapper: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  addMember: {
    backgroundColor: "#f1f2f3",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    gap: 20,
  },
});
