import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import LoadingScreen from "../screens/LoadingScreen";
import LaunchScreen from "../screens/LaunchScreen";
import CompanyScreen from "../screens/CompanyScreen";
import ForgotPassword from "../screens/ForgotPassword";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    // Includes screens before user log in
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="On Boarding" component={LaunchScreen} />
      <Stack.Screen name="Company" component={CompanyScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Forgot Password" component={ForgotPassword} />
      <Stack.Screen name="Loading" component={LoadingScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
