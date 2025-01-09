import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { SheetManager } from "react-native-actions-sheet";

import { Pressable, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Skeleton } from "moti/skeleton";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import TeamSelection from "../../../components/Band/MyTeam/TeamSelection/TeamSelection";
import { useFetch } from "../../../hooks/useFetch";
import MemberListItem from "../../../components/Band/MyTeam/MemberListItem/MemberListItem";
import { useDisclosure } from "../../../hooks/useDisclosure";
import ConfirmationModal from "../../../styles/modals/ConfirmationModal";
import TeamForm from "../../../components/Band/MyTeam/TeamForm/TeamForm";
import AddMemberModal from "../../../components/Band/shared/AddMemberModal/AddMemberModal";
import axiosInstance from "../../../config/api";
import useCheckAccess from "../../../hooks/useCheckAccess";
import Button from "../../../styles/forms/Button";
import { SkeletonCommonProps, TextProps } from "../../../styles/CustomStylings";
import AlertModal from "../../../styles/modals/AlertModal";
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";

const MyTeam = ({ route }) => {
  const [selectedTeamId, setSelectedTeamId] = useState(0);
  const [team, setTeam] = useState({});
  const [memberToRemove, setMemberToRemove] = useState({});
  const [hideIcon, setHideIcon] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [requestType, setRequestType] = useState("");
  const [success, setSuccess] = useState(false);

  const userSelector = useSelector((state) => state.auth);

  const navigation = useNavigation();
  const { passedTeam } = route.params;

  const { isOpen: deleteModalIsOpen, toggle: toggleDeleteModal } =
    useDisclosure(false);
  const { isOpen: newTeamFormIsOpen, toggle: toggleNewTeamForm } =
    useDisclosure(false);
  const { isOpen: editTeamFormIsOpen, toggle: toggleEditTeamForm } =
    useDisclosure(false);
  const { isOpen: addMemberModalIsOpen, toggle: toggleAddMemberModal } =
    useDisclosure(false);
  const { isOpen: removeMemberModalIsOpen, toggle: toggleRemoveMemberModal } =
    useDisclosure(false);
  const { isOpen: successIsOpen, toggle: toggleSuccess } = useDisclosure(false);

  const createCheckAccess = useCheckAccess("create", "My Team");
  const editCheckAccess = useCheckAccess("update", "My Team");
  const deleteCheckAccess = useCheckAccess("delete", "My Team");
  const createProjectCheckAccess = useCheckAccess("create", "Projects");
  const scrollOffsetY = useRef(0);
  const SCROLL_THRESHOLD = 20;

  const openNewTeamFormHandler = () => {
    toggleNewTeamForm();
  };

  const openEditTeamFormHandler = () => {
    toggleEditTeamForm();
  };

  const openMemberModalHandler = () => {
    toggleAddMemberModal();
  };

  const openRemoveMemberModalHandler = (member) => {
    setMemberToRemove(member);
    toggleRemoveMemberModal();
  };

  const onPressTeam = useCallback(
    (teamId) => {
      setSelectedTeamId(teamId);
      const selectedTeam = teams?.data?.filter((item) => {
        return item.id === teamId;
      });
      setTeam(selectedTeam[0] || null);
    },
    [selectedTeamId]
  );

  const {
    data: teams,
    isLoading: teamIsLoading,
    refetch: refetchTeam,
  } = useFetch("/pm/teams");

  const {
    data: members,
    isLoading: membersIsLoading,
    refetch: refetchMembers,
  } = useFetch(selectedTeamId && `/pm/teams/${selectedTeamId}/members`, [
    selectedTeamId,
  ]);

  const renderEditOptionSheet = () => {
    SheetManager.show("form-sheet", {
      payload: {
        children: (
          <View style={styles.menu}>
            <View style={styles.wrapper}>
              {team ? (
                <>
                  {createProjectCheckAccess ? (
                    <Pressable
                      onPress={async () => {
                        await SheetManager.hide("form-sheet");
                        navigation.navigate("Project Form", {
                          projectData: null,
                          teamMembers: members?.data,
                        });
                      }}
                      style={styles.menuItem}
                    >
                      <Text style={[TextProps, { fontSize: 16 }]}>
                        Create project with this team{" "}
                      </Text>
                      <MaterialCommunityIcons
                        name="lightning-bolt"
                        size={20}
                        color={Colors.primary}
                      />
                    </Pressable>
                  ) : null}

                  {team?.owner_id === userSelector.id ? (
                    editCheckAccess ? (
                      <>
                        <Pressable
                          onPress={async () => {
                            await SheetManager.hide("form-sheet");
                            openMemberModalHandler();
                          }}
                          style={styles.menuItem}
                        >
                          <Text style={[TextProps, { fontSize: 16 }]}>
                            Add new member to this team
                          </Text>
                          <MaterialCommunityIcons
                            name="account-plus"
                            size={20}
                            color={Colors.primary}
                          />
                        </Pressable>

                        <Pressable
                          onPress={async () => {
                            await SheetManager.hide("form-sheet");
                            openEditTeamFormHandler();
                          }}
                          style={styles.menuItem}
                        >
                          <Text style={[TextProps, { fontSize: 16 }]}>
                            Edit this team
                          </Text>
                          <MaterialCommunityIcons
                            name="file-edit"
                            size={20}
                            color={Colors.primary}
                          />
                        </Pressable>
                      </>
                    ) : null
                  ) : null}
                </>
              ) : null}
            </View>

            {team?.owner_id === userSelector.id ? (
              <View style={styles.wrapper}>
                {deleteCheckAccess ? (
                  <Pressable
                    onPress={async () => {
                      await SheetManager.hide("form-sheet");
                      toggleDeleteModal();
                    }}
                    style={[styles.menuItem, { marginTop: 3 }]}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: Colors.danger,
                      }}
                    >
                      Delete this team
                    </Text>
                    <MaterialCommunityIcons
                      name="trash-can-outline"
                      color={Colors.danger}
                      size={20}
                    />
                  </Pressable>
                ) : null}
              </View>
            ) : null}
          </View>
        ),
      },
    });
  };

  const renderCreateOptionSheet = () =>
    SheetManager.show("form-sheet", {
      payload: {
        children: (
          <View style={styles.menu}>
            <View style={styles.wrapper}>
              {createCheckAccess && (
                <Pressable
                  onPress={async () => {
                    await SheetManager.hide("form-sheet");
                    openNewTeamFormHandler();
                  }}
                  style={styles.menuItem}
                >
                  <Text style={[TextProps, { fontSize: 16 }]}>
                    Create new team
                  </Text>
                  <MaterialCommunityIcons
                    name="account-group"
                    size={20}
                    color={Colors.primary}
                  />
                </Pressable>
              )}
            </View>
          </View>
        ),
      },
    });

  const handleTeamDeleteSuccess = () => {
    refetchTeam();
    setTeam({});
    setSelectedTeamId(0);
    setRequestType("remove");
    SheetManager.hide("form-sheet");
  };

  /**
   * Handles add member to team
   * @param {Array} users - user ids to add to the team
   */
  const addNewMember = async (users, setIsLoading) => {
    try {
      for (let i = 0; i < users.length; i++) {
        await axiosInstance.post("/pm/teams/members", {
          team_id: selectedTeamId,
          user_id: users[i],
        });
      }
      refetchMembers();
      setIsLoading(false);
      setRequestType("post");
      toggleAddMemberModal();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorMessage(error.response.data.message);
      setRequestType("error");
      toggleAddMemberModal();
    }
  };

  const scrollHandler = (event) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;
    const offsetDifference = currentOffsetY - scrollOffsetY.current;

    if (Math.abs(offsetDifference) < SCROLL_THRESHOLD) {
      return; // Ignore minor scrolls
    }

    if (currentOffsetY > scrollOffsetY.current) {
      if (scrollDirection !== "down") {
        setHideIcon(true); // Scrolling down
        setScrollDirection("down");
      }
    } else {
      if (scrollDirection !== "up") {
        setHideIcon(false); // Scrolling up
        setScrollDirection("up");
      }
    }

    scrollOffsetY.current = currentOffsetY;
  };

  useEffect(() => {
    if (teams?.data?.length > 0) {
      setSelectedTeamId(teams?.data[0]?.id);
      setTeam(teams?.data[0]);
    }
  }, [teamIsLoading]);

  // if user accessed the my team screen from global search
  useEffect(() => {
    if (passedTeam) {
      setSelectedTeamId(passedTeam.id);
      setTeam(passedTeam);
    }
  }, [passedTeam]);

  return (
    <Screen screenTitle="My Team">
      <View style={styles.searchContainer}>
        {!teamIsLoading ? (
          teams?.data?.length > 0 ? (
            <TeamSelection
              onChange={onPressTeam}
              selectedTeam={team}
              teams={teams?.data}
            />
          ) : createCheckAccess ? (
            <View style={{ alignItems: "center", gap: 10 }}>
              <Text style={[{ fontSize: 22 }, TextProps]}>
                You don't have teams yet...
              </Text>
              <Button onPress={toggleNewTeamForm}>
                <Text style={{ color: Colors.fontLight }}>Create here</Text>
              </Button>
            </View>
          ) : null
        ) : (
          <Skeleton
            width="100%"
            height={40}
            radius="round"
            {...SkeletonCommonProps}
          />
        )}
      </View>

      <View style={{ flex: 1 }}>
        {selectedTeamId ? (
          !membersIsLoading ? (
            <FlashList
              data={members?.data}
              keyExtractor={(item) => item.id}
              estimatedItemSize={200}
              onScroll={scrollHandler}
              renderItem={({ item, index }) => (
                <MemberListItem
                  key={index}
                  member={item}
                  name={item.user_name}
                  image={item.image}
                  email={item.email}
                  totalProjects={item.total_project}
                  totalTasks={item.total_task}
                  master={team?.owner_name}
                  loggedInUser={userSelector.name}
                  openRemoveMemberModal={openRemoveMemberModalHandler}
                  index={index}
                  length={members?.data?.length}
                />
              )}
            />
          ) : (
            <Skeleton
              width="100%"
              height={10}
              radius="round"
              {...SkeletonCommonProps}
            />
          )
        ) : (
          <>
            {teams?.data?.length > 0 ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <Text style={[{ fontSize: 22 }, TextProps]}>
                  Select team to show
                </Text>
              </View>
            ) : null}
          </>
        )}
      </View>

      {!hideIcon ? (
        <>
          <Pressable style={styles.editButton} onPress={renderEditOptionSheet}>
            <MaterialCommunityIcons
              name="pencil"
              color={Colors.iconLight}
              size={30}
            />
          </Pressable>

          <Pressable
            style={styles.hoverButton}
            onPress={renderCreateOptionSheet}
          >
            <MaterialCommunityIcons
              name="plus"
              color={Colors.iconLight}
              size={30}
            />
          </Pressable>
        </>
      ) : null}

      {/* New team form */}
      <TeamForm
        isOpen={newTeamFormIsOpen}
        refetch={refetchTeam}
        toggle={toggleNewTeamForm}
        setSelectedTeam={setTeam}
        setSelectedTeamId={setSelectedTeamId}
        toggleOtherModal={toggleSuccess}
        setRequestType={setRequestType}
        setErrorMessage={setErrorMessage}
        success={success}
        setSuccess={setSuccess}
      />

      {/* Edit team form */}
      <TeamForm
        isOpen={editTeamFormIsOpen}
        teamData={team}
        refetch={refetchTeam}
        toggle={toggleEditTeamForm}
        setSelectedTeam={setTeam}
        toggleOtherModal={toggleSuccess}
        setRequestType={setRequestType}
        setErrorMessage={setErrorMessage}
        success={success}
        setSuccess={setSuccess}
      />

      {/* Add member modal */}
      <AddMemberModal
        header="Add Member"
        isOpen={addMemberModalIsOpen}
        onClose={toggleAddMemberModal}
        onPressHandler={addNewMember}
        success={success}
        setSuccess={setSuccess}
        toggleOtherModal={toggleSuccess}
      />

      {/* Remove member confirmation modal */}
      <ConfirmationModal
        isOpen={removeMemberModalIsOpen}
        toggle={toggleRemoveMemberModal}
        apiUrl={`/pm/teams/members/${memberToRemove?.id}`}
        header="Remove Member"
        description={`Are you sure want to remove ${memberToRemove?.user_name} from the team?`}
        hasSuccessFunc={true}
        onSuccess={refetchMembers}
        toggleOtherModal={toggleSuccess}
        success={success}
        setSuccess={setSuccess}
        setRequestType={setRequestType}
        setError={setErrorMessage}
      />

      {/* Delete team confirmation modal */}
      <ConfirmationModal
        isOpen={deleteModalIsOpen}
        toggle={toggleDeleteModal}
        apiUrl={`/pm/teams/${selectedTeamId}`}
        header="Delete Team"
        description={`Are you sure want to delete team ${team?.name}`}
        hasSuccessFunc={true}
        onSuccess={handleTeamDeleteSuccess}
        toggleOtherModal={toggleSuccess}
        success={success}
        setSuccess={setSuccess}
        setRequestType={setRequestType}
        setError={setErrorMessage}
      />

      <AlertModal
        isOpen={successIsOpen}
        toggle={toggleSuccess}
        title={
          requestType === "post"
            ? "Data added!"
            : requestType === "remove" || "patch"
            ? "Changes saved!"
            : "Process error!"
        }
        description={
          requestType === "post"
            ? "New data added"
            : requestType === "remove" || "patch"
            ? "Data successfully saved"
            : errorMessage || "Please try again later"
        }
        type={
          requestType === "post"
            ? "info"
            : requestType === "remove" || "patch"
            ? "success"
            : "danger"
        }
      />
    </Screen>
  );
};

export default MyTeam;

const styles = StyleSheet.create({
  hoverButton: {
    position: "absolute",
    right: 10,
    bottom: 30,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    padding: 15,
    borderWidth: 3,
    borderColor: Colors.borderWhite,
  },
  editButton: {
    position: "absolute",
    right: 10,
    bottom: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    padding: 15,
    borderWidth: 3,
    borderColor: Colors.borderWhite,
  },
  menu: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: -20,
  },
  wrapper: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderWhite,
  },
  searchContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: Colors.borderGrey,
    backgroundColor: Colors.secondary,
  },
});
