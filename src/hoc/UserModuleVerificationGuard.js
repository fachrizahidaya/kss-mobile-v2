import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Toast from "react-native-root-toast";

import axiosInstance from "../config/api";
import { login } from "../redux/reducer/auth";
import { push } from "../redux/reducer/user_menu";
import { ErrorToastProps } from "../styles/CustomStylings";
import { useFetch } from "../hooks/useFetch";

const UserModuleVerificationGuard = ({ children }) => {
  const dispatch = useDispatch();
  const moduleSelector = useSelector((state) => state.module);
  const userSelector = useSelector((state) => state.auth);

  const { data: modules } = useFetch(
    (moduleSelector.module_name !== "" || userSelector.user_role_menu !== "") &&
      "/auth/user-module"
  );

  const handleGetAllUserData = async () => {
    try {
      const res = await axiosInstance.post("/auth/module-access", {
        module_name: moduleSelector.module_name.toLowerCase(),
      });
      const userResponse = res.data.data;
      const updatedPayload = {
        ...userResponse,
        user_module: modules,
      };

      // Dispatch a login action with the newly provided user data
      dispatch(login(updatedPayload));
    } catch (error) {
      console.log(error);
      Toast.show(error?.response?.data?.message || "Network Error", ErrorToastProps);
    }
  };

  /**
   * Function to parse the user role menu and dispatch it to the Redux store.
   */
  const handleParseUserRoleMenu = () => {
    const userRoleMenu = JSON.parse(userSelector.user_role_menu);

    // Dispatch the user role menu to the Redux store
    dispatch(push(userRoleMenu));
  };

  useEffect(() => {
    if (moduleSelector.module_name !== "") {
      handleGetAllUserData();
    }
  }, [moduleSelector.module_name]);

  useEffect(() => {
    if (userSelector.user_role_menu) {
      handleParseUserRoleMenu();
    }
  }, [userSelector.user_role_menu]);

  return children;
};

export default UserModuleVerificationGuard;
