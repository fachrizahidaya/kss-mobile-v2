import { useCallback, useRef, useState } from "react";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useMutation } from "react-query";

import { RefreshControl } from "react-native-gesture-handler";
import { FlatList, Keyboard, Pressable, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Skeleton } from "moti/skeleton";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useFetch } from "../../../hooks/useFetch";
import NoteItem from "../../../components/Band/Note/NoteItem/NoteItem";
import axiosInstance from "../../../config/api";
import ConfirmationModal from "../../../styles/modals/ConfirmationModal";
import { useDisclosure } from "../../../hooks/useDisclosure";
import NoteFilter from "../../../components/Band/Note/NoteFilter/NoteFilter";
import useCheckAccess from "../../../hooks/useCheckAccess";
import { SkeletonCommonProps } from "../../../styles/CustomStylings";
import AlertModal from "../../../styles/modals/AlertModal";
import Screen from "../../../layouts/Screen";
import FloatingButton from "../../../styles/buttons/FloatingButton";

const Notes = () => {
  const navigation = useNavigation();
  const firstTimeRef = useRef(true);
  const [noteToDelete, setNoteToDelete] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [hideIcon, setHideIcon] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [requestType, setRequestType] = useState("");

  const scrollOffsetY = useRef(0);
  const SCROLL_THRESHOLD = 20;

  const { isOpen: deleteModalIsOpen, toggle: toggleDeleteModal } = useDisclosure(false);
  const { isOpen: isSuccess, toggle: toggleSuccess } = useDisclosure(false);

  const createCheckAccess = useCheckAccess("create", "Notes");
  const { data: notes, isLoading, refetch } = useFetch("/pm/notes");

  const openDeleteModalHandler = (note) => {
    setNoteToDelete(note);
    toggleDeleteModal();
  };

  const openNewNoteFormHandler = () => {
    navigation.navigate("Note Form", {
      noteData: null,
      refresh: refetch,
      refreshFunc: true,
    });
  };

  const openEditFormHandler = (note) => {
    navigation.navigate("Note Form", {
      noteData: note,
      refresh: refetch,
      refreshFunc: true,
    });
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

  const {
    mutate,
    isLoading: pinIsLoading,
    variables,
  } = useMutation(
    (note) => {
      return axiosInstance.patch(`/pm/notes/${note.id}/${note.status}`);
    },
    {
      onSuccess: () => {
        refetch();
        setRequestType("patch");
        toggleSuccess();
      },
      onError: (error) => {
        setRequestType("error");
        setErrorMessage(error);
        toggleSuccess();
      },
    }
  );

  let optimisticList = [];
  const index = filteredData?.findIndex((note) => note.id === variables?.id);

  if (variables?.status === "pinned") {
    optimisticList =
      index !== -1
        ? [...filteredData?.slice(0, index), { ...variables, pinned: 1 }, ...filteredData?.slice(index + 1)]
        : [...filteredData, { ...variables, pinned: 1 }];
  } else {
    optimisticList =
      index !== -1
        ? [...filteredData?.slice(0, index), { ...variables, pinned: 0 }, ...filteredData?.slice(index + 1)]
        : [...filteredData, { ...variables, pinned: 0 }];
  }

  const renderList = pinIsLoading ? optimisticList : filteredData;

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }
      refetch();
    }, [refetch])
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Screen screenTitle="Notes">
        <View style={styles.searchContainer}>
          <NoteFilter data={notes?.data} setFilteredData={setFilteredData} />
        </View>

        <View style={{ flex: 1 }}>
          {!isLoading ? (
            <FlatList
              refreshControl={<RefreshControl refreshing={false} onRefresh={refetch} />}
              data={renderList}
              keyExtractor={(item, index) => index}
              onScroll={scrollHandler}
              renderItem={({ item }) => (
                <NoteItem
                  note={item}
                  id={item.id}
                  title={item.title}
                  date={item.created_at}
                  isPinned={item.pinned}
                  onPress={mutate}
                  openDeleteModal={openDeleteModalHandler}
                  openEditForm={openEditFormHandler}
                  index={index}
                  length={renderList.length}
                />
              )}
            />
          ) : (
            <Skeleton width="100%" height={270} radius={10} {...SkeletonCommonProps} />
          )}
        </View>

        {!hideIcon ? (
          createCheckAccess ? (
            <FloatingButton icon="plus" handlePress={openNewNoteFormHandler} />
          ) : null
        ) : null}

        <ConfirmationModal
          isOpen={deleteModalIsOpen}
          toggle={toggleDeleteModal}
          apiUrl={`/pm/notes/${noteToDelete?.id}`}
          header="Delete Note"
          description={`Are you sure want to delete ${noteToDelete?.title}?`}
          hasSuccessFunc={true}
          onSuccess={refetch}
          toggleOtherModal={toggleSuccess}
          success={success}
          setSuccess={setSuccess}
          setError={setErrorMessage}
          setRequestType={setRequestType}
        />

        <AlertModal
          isOpen={isSuccess}
          toggle={toggleSuccess}
          title={
            requestType === "patch" ? "Note updated!" : requestType === "remove" ? "Note deleted!" : "Process error!"
          }
          description={
            requestType === "patch" || "remove" ? "Data successfully saved" : errorMessage || "Please try again later"
          }
          type={requestType === "patch" || "remove" ? "success" : "danger"}
        />
      </Screen>
    </TouchableWithoutFeedback>
  );
};

export default Notes;

const styles = StyleSheet.create({
  hoverButton: {
    position: "absolute",
    right: 10,
    bottom: 30,
    borderRadius: 50,
    backgroundColor: "#377893",
    padding: 15,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  searchContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
});
