import { AppState } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import useCheckAccess from "../../../hooks/useCheckAccess";
import { setModule } from "../../../redux/reducer/module";
import { useDisclosure } from "../../../hooks/useDisclosure";

export const useBand = () => {
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [lastClock, setLastClock] = useState("");

  const dispatch = useDispatch();
  const createProjectAccess = useCheckAccess("create", "Projects");
  const createTaskAccess = useCheckAccess("create", "Tasks");
  const createNoteAccess = useCheckAccess("create", "Notes");
  const menuSelector = useSelector((state) => state.user_menu);

  const { isOpen: isSuccessProject, toggle: toggleSuccessProject } = useDisclosure(false);
  const { isOpen: isSuccessTask, toggle: toggleSuccessTask } = useDisclosure(false);
  const { isOpen: isSuccessNote, toggle: toggleSuccessNote } = useDisclosure(false);

  const items = [
    {
      icons: "view-grid-outline",
      title: `New Project ${createProjectAccess ? "" : "(No access)"}`,
      screen: createProjectAccess ? "Project Form" : "Dashboard",
    },
    {
      icons: "plus",
      title: `New Task | Ad Hoc ${createTaskAccess ? "" : "(No access)"}`,
      screen: createTaskAccess ? "Task Form" : "Dashboard",
    },
    {
      icons: "pencil-outline",
      title: `New Notes ${createNoteAccess ? "" : "(No access)"}`,
      screen: createNoteAccess ? "Note Form" : "Dashboard",
    },
  ];

  const handleNavigateToTribe = () => {
    dispatch(setModule("TRIBE"));
  };

  const screensToRender = () => {
    return menuSelector.user_menu.menu?.filter((screen) => {
      return screen.name !== "Dashboard";
    });
  };

  return {
    requestType,
    setRequestType,
    errorMessage,
    setErrorMessage,
    isSuccessProject,
    toggleSuccessProject,
    isSuccessTask,
    toggleSuccessTask,
    isSuccessNote,
    toggleSuccessNote,
    items,
    handleNavigateToTribe,
    menuSelector,
    screensToRender,
  };
};
