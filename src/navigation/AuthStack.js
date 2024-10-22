import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Authentication/Login";
import AuthenticationLoading from "../screens/Authentication/AuthenticationLoading";
import Launch from "../screens/Authentication/Launch";
import CompanyEntry from "../screens/Authentication/CompanyEntry";
import ForgotPassword from "../screens/Authentication/ForgotPassword";
import OTPVerification from "../screens/Authentication/OTPVerification";
import ResetPassword from "../screens/Authentication/ResetPassword";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    // Includes screens before user log in
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="On Boarding" component={Launch} />
      <Stack.Screen name="Company" component={CompanyEntry} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Forgot Password" component={ForgotPassword} />
      <Stack.Screen name="OTP Verification" component={OTPVerification} />
      <Stack.Screen name="Reset Password" component={ResetPassword} />
      <Stack.Screen name="Loading" component={AuthenticationLoading} />
    </Stack.Navigator>
  );
};

export default AuthStack;
