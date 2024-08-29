import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { SheetManager } from "react-native-actions-sheet";

import { Pressable, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AvatarPlaceholder from "../../../../../styles/AvatarPlaceholder";
import ConfirmationModal from "../../../../../styles/modals/ConfirmationModal";
import { useDisclosure } from "../../../../../hooks/useDisclosure";
import axiosInstance from "../../../../../config/api";
import AddMemberModal from "../../../shared/AddMemberModal/AddMemberModal";
import { useFetch } from "../../../../../hooks/useFetch";
import { TextProps } from "../../../../../styles/CustomStylings";
import AlertModal from "../../../../../styles/modals/AlertModal";

const PeopleSection = ({
  observers,
  responsibleArr,
  ownerId,
  ownerName,
  ownerImage,
  ownerEmail,
  refetchObservers,
  disabled,
  selectedTask,
  refetchResponsible,
  refetchTask,
}) => {
  const [selectedObserver, setSelectedObserver] = useState({});
  const [requestType, setRequestType] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const userSelector = useSelector((state) => state.auth);

  const { isOpen: deleteObserverModalIsOpen, toggle } = useDisclosure(false);
  const { isOpen: observerModalIsOpen, toggle: toggleObserverModal, close: closeObserverMocal } = useDisclosure(false);
  const { isOpen: alertIsOpen, toggle: toggleAlert } = useDisclosure(false);

  const { data: members } = useFetch(selectedTask?.project_id && `/pm/projects/${selectedTask?.project_id}/member`);

  const getSelectedObserver = (id) => {
    toggle();

    // Filter team members which has the same id value of the selected member
    const filteredObserver = observers?.filter((observer) => {
      return observer.id === id;
    });

    setSelectedObserver(filteredObserver[0]);
  };

  const renderOptionSheet = () => {
    if (!disabled) {
      SheetManager.show("form-sheet", {
        payload: {
          children: (
            <View style={{ gap: 21, paddingHorizontal: 20, paddingVertical: 16 }}>
              {members?.data?.length > 0 ? (
                members.data.map((member) => {
                  return (
                    <TouchableOpacity key={member.id} onPress={() => takeTask(member.user_id)}>
                      <Text style={TextProps}>{member.member_name}</Text>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <TouchableOpacity onPress={() => takeTask(userSelector.id)}>
                  <Text style={TextProps}>{userSelector.name}</Text>
                </TouchableOpacity>
              )}
            </View>
          ),
        },
      });
    }
  };

  /**
   * Handles take task as responsible
   */
  const takeTask = async (userId) => {
    try {
      if (selectedTask?.responsible_id) {
        await axiosInstance.patch(`/pm/tasks/responsible/${responsibleArr[0]?.id}`, {
          user_id: userId,
        });
      } else {
        await axiosInstance.post("/pm/tasks/responsible", {
          task_id: selectedTask.id,
          user_id: userId,
        });
      }
      refetchResponsible();
      refetchTask();
      setRequestType("post");
      toggleAlert();
      SheetManager.hide("form-sheet");
    } catch (error) {
      console.log(error);
      setRequestType("error");
      setErrorMessage(error.response.data.message);
      toggleAlert();
    }
  };

  /**
   * Handle assign observer to selected task
   * @param {Array} users - selected user id to add as observer
   */
  const addObserverToTask = async (users, setIsLoading) => {
    try {
      for (let i = 0; i < users.length; i++) {
        await axiosInstance.post("/pm/tasks/observer", {
          task_id: selectedTask.id,
          user_id: users[i],
        });
      }
      refetchObservers();
      setIsLoading(false);
      toggleObserverModal();
    } catch (error) {
      console.log(error);
      setRequestType("error");
      setErrorMessage(error.response.data.message);
      toggleAlert();
      setIsLoading(false);
      toggleObserverModal();
    }
  };

  return (
    <>
      <View style={{ gap: 20, marginHorizontal: 16 }}>
        {/* Responsible and creator */}
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, gap: 10 }}>
            <Text style={[{ fontWeight: "500" }, TextProps]}>ASSIGNED TO</Text>
            {responsibleArr?.length > 0 ? (
              responsibleArr.map((responsible) => {
                return (
                  <TouchableOpacity key={responsible.id} onPress={renderOptionSheet}>
                    <AvatarPlaceholder
                      name={responsible.responsible_name}
                      image={responsible.responsible_image}
                      size="sm"
                    />
                  </TouchableOpacity>
                );
              })
            ) : (
              <TouchableOpacity
                onPress={() =>
                  SheetManager.show("form-sheet", {
                    payload: {
                      children: (
                        <View style={{ gap: 21, paddingHorizontal: 20, paddingVertical: 16 }}>
                          {members?.data?.length > 0 ? (
                            members.data.map((member) => {
                              return (
                                <TouchableOpacity key={member.id} onPress={() => takeTask(member.user_id)}>
                                  <Text style={TextProps}>{member.member_name}</Text>
                                </TouchableOpacity>
                              );
                            })
                          ) : (
                            <TouchableOpacity onPress={() => takeTask(userSelector.id)}>
                              <Text style={TextProps}>{userSelector.name}</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      ),
                    },
                  })
                }
                style={{
                  backgroundColor: "#f1f2f3",
                  alignItems: "center",
                  alignSelf: "flex-start",
                  justifyContent: "center",
                  padding: 8,
                  borderRadius: 10,
                }}
              >
                <MaterialCommunityIcons name="plus" size={20} color="#3F434A" />
              </TouchableOpacity>
            )}
          </View>

          <View style={{ flex: 1, gap: 10 }}>
            <Text style={[{ fontWeight: "500" }, TextProps]}>CREATED BY</Text>

            {ownerId ? (
              <AvatarPlaceholder name={ownerName} image={ownerImage} email={ownerEmail} size="sm" isPressable={true} />
            ) : null}
          </View>
        </View>

        {/* Observers */}
        {!disabled || (disabled && observers?.length > 0) ? (
          <View style={{ flex: 1, gap: 10 }}>
            <Text style={[{ fontWeight: "500" }, TextProps]}>OBSERVER</Text>
            <View style={{ flexDirection: "row", gap: 2 }}>
              {observers?.length > 0 ? (
                <>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
                    {observers.map((observer) => {
                      return (
                        <Pressable
                          key={observer.id}
                          onPress={() => getSelectedObserver(observer.id)}
                          disabled={disabled}
                        >
                          <AvatarPlaceholder image={observer.observer_image} name={observer.observer_name} size="sm" />
                        </Pressable>
                      );
                    })}

                    {!disabled ? (
                      <TouchableOpacity
                        onPress={toggleObserverModal}
                        style={{
                          backgroundColor: "#f1f2f3",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 8,
                          borderRadius: 10,
                        }}
                      >
                        <MaterialCommunityIcons name="plus" size={20} color="#3F434A" />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </>
              ) : !disabled ? (
                <TouchableOpacity
                  onPress={toggleObserverModal}
                  style={{
                    backgroundColor: "#f1f2f3",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 8,
                    borderRadius: 10,
                  }}
                >
                  <MaterialCommunityIcons name="plus" size={20} color="#3F434A" />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        ) : null}
      </View>

      <AddMemberModal
        header="New Observer"
        isOpen={observerModalIsOpen}
        onClose={closeObserverMocal}
        onPressHandler={addObserverToTask}
      />

      <ConfirmationModal
        isOpen={deleteObserverModalIsOpen}
        toggle={toggle}
        apiUrl={`/pm/tasks/observer/${selectedObserver?.id}`}
        header="Remove Observer"
        description={`Are you sure want to remove ${selectedObserver?.observer_name}?`}
        hasSuccessFunc={true}
        onSuccess={refetchObservers}
        success={success}
        setSuccess={setSuccess}
        setError={setErrorMessage}
        setRequestType={setRequestType}
        toggleOtherModal={toggleAlert}
      />
      <AlertModal
        isOpen={alertIsOpen}
        toggle={toggleAlert}
        title={
          requestType === "post" ? "Task assigned!" : requestType === "remove" ? "Observer removed!" : "Process error!"
        }
        type={requestType === "post" ? "info" : requestType === "remove" ? "success" : "danger"}
        description={
          requestType === "post" || "remove" ? "Data successfully saved" : errorMessage || "Please try again later"
        }
      />
    </>
  );
};

export default memo(PeopleSection);
