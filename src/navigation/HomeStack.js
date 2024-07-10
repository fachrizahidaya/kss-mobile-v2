import { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";

import { useSelector } from "react-redux";

import Header from "../layouts/Header";
import BandTab from "./tabs/BandTab";
import TribeTab from "./tabs/TribeTab";
import CoinTab from "./tabs/CoinTab";

// Independent Screens
import Logout from "../screens/Logout";
import Notification from "../screens/Notification";

// Band Screens
import ProjectDetailScreen from "../screens/Band/project/[projectId]";
import ProjectTaskScreen from "../screens/Band/project/project-task";
import TaskDetailScreen from "../screens/Band/task-detail/[taskId]";
import ProjectForm from "../screens/Band/ProjectForm";
import TaskForm from "../screens/Band/TaskForm";
import GlobalSearch from "../screens/Band/GlobalSearch";

// Tribe Screens
import NewPost from "../screens/Tribe/Feed/NewPost/NewPost";
import EmployeeProfileScreen from "../screens/Tribe/Employee/[employeeId]";
import NewLeaveRequest from "../screens/Tribe/Leave/NewLeaveRequest/NewLeaveRequest";
import TeamLeave from "../screens/Tribe/Leave/TeamLeave/TeamLeave";
import NewReimbursement from "../screens/Tribe/Reimbursement/NewReimbursement/NewReimbursement";
import KPIScreen from "../screens/Tribe/Performance/KPI/KPIScreen";
import AppraisalScreen from "../screens/Tribe/Performance/Appraisal/AppraisalScreen";
import KPIReviewScreen from "../screens/Tribe/Performance/Review/KPIReviewScreen";
import GlobalSearchTribe from "../screens/Tribe/GlobalSearch";
import Post from "../screens/Tribe/Feed/Post";
import AppraisalReviewScreen from "../screens/Tribe/Performance/Review/AppraisalReviewScreen";
import CommentScreen from "../screens/Tribe/Performance/Review/CommentScreen";
import PerformanceResultScreen from "../screens/Tribe/Performance/Result/PerformanceResultScreen";
import AppraisalResultScreen from "../screens/Tribe/Performance/Result/AppraisalResultScreen";
import KPIResultScreen from "../screens/Tribe/Performance/Result/KPIResultScreen";
import CommentResultScreen from "../screens/Tribe/Performance/Result/CommentResultScreen";
import ConclusionScreen from "../screens/Tribe/Performance/Result/ConclusionScreen";
import KPIListScreen from "../screens/Tribe/Performance/KPI/KPIListScreen";
import AppraisalListScreen from "../screens/Tribe/Performance/Appraisal/AppraisalListScreen";
import KPIAppraisalReviewScreen from "../screens/Tribe/Performance/Review/KPIAppraisalReviewScreen";
import PerformanceListScreen from "../screens/Tribe/Performance/Result/PerformanceListScreen";

// Settings Screens
import SettingScreen from "../screens/Setting";
import MyProfile from "../screens/Setting/Account/MyProfile";
import Account from "../screens/Setting/Account/Account";
import Company from "../screens/Setting/Account/Company";
import Subscription from "../screens/Setting/Account/Subscription";
import Payment from "../screens/Setting/Account/Payment";
import ChangePassword from "../screens/Setting/ChangePassword/ChangePassword";
import FrequentlyAskedQuestions from "../screens/Setting/FAQ";
import FAQDetail from "../screens/Setting/FAQ/FAQDetail";
import PrivacyPolicy from "../screens/Setting/Legal/PrivacyPolicy";
import TermsAndConditions from "../screens/Setting/Legal/TermsAndConditions";

// Nest Screens
import ChatRoom from "../screens/Chat/ChatRoom/ChatRoom";
import ChatListScreen from "../screens/Chat/ChatList/ChatListScreen";
import AddGroupParticipantScreen from "../screens/Chat/AddGroupParticipant/AddGroupParticipantScreen";
import GroupFormScreen from "../screens/Chat/AddGroupParticipant/GroupFormScreen";
import AddPersonalChatScreen from "../screens/Chat/AddPersonalChat/AddPersonalChatScreen";
import ContactDetail from "../screens/Chat/ContactDetail/ContactDetail";
import EditGroupProfile from "../screens/Chat/EditGroupProfile/EditGroupProfile";
import Media from "../screens/Chat/Media";
import NoteForm from "../screens/Band/NoteForm";
import ChatProjectTaskScreen from "../screens/Chat/ChatProjectTask/ChatProjectTaskScreen";
import ProjectDetail from "../screens/Chat/ProjectDetail/ProjectDetail";
import TaskDetail from "../screens/Chat/TaskDetail/TaskDetail";
import Forward from "../screens/Chat/Forward/Forward";

// Coin Screens
import Sales from "../screens/Coin/Sales";
import Purchase from "../screens/Coin/Purchase";
import PurchaseOrder from "../screens/Coin/Purchase/PurchaseOrder";
import ReceiptPurchaseOrder from "../screens/Coin/Purchase/ReceiptPurchaseOrder";
import SalesOrder from "../screens/Coin/Sales/SalesOrder";
import DeliveryOrder from "../screens/Coin/Sales/DeliveryOrder";
import Customer from "../screens/Coin/Sales/Customer";
import Invoice from "../screens/Coin/Sales/Invoice";
import PurchaseOrderDetail from "../screens/Coin/Purchase/PurchaseOrderDetail";
import SalesOrderDetail from "../screens/Coin/Sales/SalesOrderDetail";
import ReceiptPurchaseOrderDetail from "../screens/Coin/Purchase/ReceiptPurchaseOrderDetail";
import DeliveryOrderDetail from "../screens/Coin/Sales/DeliveryOrderDetail";
import InvoiceDetail from "../screens/Coin/Sales/InvoiceDetail";
import DownPayment from "../screens/Coin/Sales/DownPayment";
import Supplier from "../screens/Coin/Purchase/Supplier";
import NewSupplier from "../screens/Coin/Purchase/NewSupplier";
import NewCustomer from "../screens/Coin/Sales/NewCustomer";

// Silo Screens
import CourierPickupScreen from "../screens/Silo/CourierPickup";
import SiloTab from "./tabs/SiloTab";
import Courier from "../screens/Silo/Courier/Courier";
import CourierPickupScan from "../screens/Silo/CourierPickup/CourierPickupScan";

const Stack = createStackNavigator();

const HomeStack = () => {
  const moduleSelector = useSelector((state) => state.module);
  const navigation = useNavigation();
  navigation.removeListener();

  // Redirects user to chat room if app opens after pressing the push notification
  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then((message) => {
        if (message) {
          if (message.data.type === "personal" || message.data.type === "group") {
            const parsedIsPinnedObj = JSON.parse(message.data.is_pinned);
            const parsedUserObj = message.data.user && JSON.parse(message.data.user);
            navigation.navigate("Chat Room", {
              name: message.data.name,
              userId: message.data.user_id,
              roomId: message.data.chat_id,
              image: message.data.image,
              type: message.data.type,
              email: parsedUserObj?.email,
              active_member: message.data.active_member,
              isPinned: parsedIsPinnedObj,
              forwardedMessage: null,
            });
          }
        }
      });
  }, []);

  return (
    // Includes screens after user log in
    <Stack.Navigator>
      <Stack.Screen name="Module" options={{ header: () => <Header /> }}>
        {() => {
          if (moduleSelector.module_name === "BAND") {
            return <BandTab />;
          } else if (moduleSelector.module_name === "TRIBE") {
            return <TribeTab />;
          } else if (moduleSelector.module_name === "COIN") {
            return <CoinTab />;
          }
          // else if (moduleSelector.module_name === "SETTING") {
          //   return <SettingTab />;
          // }
          else if (moduleSelector.module_name === "SILO") {
            return <SiloTab />;
          } else {
            // Render a default component or handle unknown cases
            return <BandTab />;
          }
        }}
      </Stack.Screen>

      {/* Independent Screens */}
      <Stack.Screen name="Notification" component={Notification} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Log Out" component={Logout} options={{ headerShown: false, gestureEnabled: false }} />

      {/* Nest Screens */}
      <Stack.Screen
        name="Chat List"
        component={ChatListScreen}
        options={{
          gestureEnabled: true,
          header: () => <Header />,
        }}
      />

      <Stack.Screen name="Chat Room" component={ChatRoom} options={{ headerShown: false }} />

      <Stack.Screen name="Group Participant" component={AddGroupParticipantScreen} options={{ headerShown: false }} />

      <Stack.Screen name="Group Form" component={GroupFormScreen} options={{ headerShown: false }} />

      <Stack.Screen name="New Chat" component={AddPersonalChatScreen} options={{ headerShown: false }} />

      <Stack.Screen name="User Detail" component={ContactDetail} options={{ headerShown: false }} />

      <Stack.Screen name="Edit Group" component={EditGroupProfile} options={{ headerShown: false }} />

      <Stack.Screen name="Media" component={Media} options={{ headerShown: false }} />

      <Stack.Screen name="Project Screen" component={ChatProjectTaskScreen} options={{ headerShown: false }} />

      <Stack.Screen name="Project Detail Screen" component={ProjectDetail} options={{ headerShown: false }} />

      <Stack.Screen name="Task Detail Screen" component={TaskDetail} options={{ headerShown: false }} />

      <Stack.Screen name="Forward Screen" component={Forward} options={{ headerShown: false }} />

      {/* Band Screens */}
      <Stack.Screen name="Project Detail" component={ProjectDetailScreen} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Project Task" component={ProjectTaskScreen} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Task Detail" component={TaskDetailScreen} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Project Form" component={ProjectForm} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Task Form" component={TaskForm} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Note Form" component={NoteForm} options={{ header: () => <Header /> }} />

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Global Search" component={GlobalSearch} options={{ headerShown: false }} />
      </Stack.Group>

      {/* Tribe Screens */}
      <Stack.Screen name="New Feed" component={NewPost} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Employee Profile" component={EmployeeProfileScreen} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Post Screen" component={Post} options={{ header: () => <Header /> }} />

      <Stack.Screen name="New Leave Request" component={NewLeaveRequest} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Team Leave Request" component={TeamLeave} options={{ header: () => <Header /> }} />

      <Stack.Screen name="New Reimbursement" component={NewReimbursement} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Employee KPI" component={KPIListScreen} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Employee Appraisal" component={AppraisalListScreen} options={{ header: () => <Header /> }} />

      <Stack.Screen
        name="Employee Review"
        component={KPIAppraisalReviewScreen}
        options={{ header: () => <Header /> }}
      />

      <Stack.Screen
        name="Performance Result"
        component={PerformanceListScreen}
        options={{ header: () => <Header /> }}
      />

      <Stack.Screen name="KPI Detail" component={KPIScreen} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Appraisal Detail" component={AppraisalScreen} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Review KPI Detail" component={KPIReviewScreen} options={{ header: () => <Header /> }} />

      <Stack.Screen
        name="Review Appraisal Detail"
        component={AppraisalReviewScreen}
        options={{ header: () => <Header /> }}
      />

      <Stack.Screen name="Comment Detail" component={CommentScreen} options={{ header: () => <Header /> }} />

      <Stack.Screen
        name="Confirmed Comment Detail"
        component={PerformanceResultScreen}
        options={{ header: () => <Header /> }}
      />

      <Stack.Screen name="KPI Employee" component={KPIResultScreen} options={{ header: () => <Header /> }} />

      <Stack.Screen
        name="Appraisal Employee"
        component={AppraisalResultScreen}
        options={{ header: () => <Header /> }}
      />

      <Stack.Screen name="Comment Employee" component={CommentResultScreen} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Conclusion Screen" component={ConclusionScreen} options={{ header: () => <Header /> }} />

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Global Search Tribe" component={GlobalSearchTribe} options={{ headerShown: false }} />
      </Stack.Group>

      {/* Setting Screens */}
      <Stack.Screen name="Setting Screen" component={SettingScreen} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Account Screen" component={Account} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Profile Screen" component={MyProfile} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Company Screen" component={Company} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Subscription Screen" component={Subscription} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Payment Screen" component={Payment} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Change Password" component={ChangePassword} options={{ header: () => <Header /> }} />

      <Stack.Screen name="FAQ" component={FrequentlyAskedQuestions} options={{ header: () => <Header /> }} />

      <Stack.Screen name="FAQ Detail" component={FAQDetail} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Terms Conditions" component={TermsAndConditions} options={{ header: () => <Header /> }} />

      {/* Coin Screens */}
      <Stack.Screen name="Sales" component={Sales} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Purchase" component={Purchase} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Purchase Order" component={PurchaseOrder} options={{ header: () => <Header /> }} />

      <Stack.Screen
        name="Purchase Order Detail"
        component={PurchaseOrderDetail}
        options={{ header: () => <Header /> }}
      />

      <Stack.Screen
        name="Receipt Purchase Order"
        component={ReceiptPurchaseOrder}
        options={{ header: () => <Header /> }}
      />

      <Stack.Screen
        name="Receipt Purchase Order Detail"
        component={ReceiptPurchaseOrderDetail}
        options={{ header: () => <Header /> }}
      />

      <Stack.Screen name="Sales Order" component={SalesOrder} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Sales Order Detail" component={SalesOrderDetail} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Delivery Order" component={DeliveryOrder} options={{ header: () => <Header /> }} />

      <Stack.Screen
        name="Delivery Order Detail"
        component={DeliveryOrderDetail}
        options={{ header: () => <Header /> }}
      />

      <Stack.Screen name="Invoice" component={Invoice} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Invoice Detail" component={InvoiceDetail} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Customer" component={Customer} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Down Payment" component={DownPayment} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Supplier" component={Supplier} options={{ header: () => <Header /> }} />

      <Stack.Screen name="New Supplier" component={NewSupplier} options={{ header: () => <Header /> }} />

      <Stack.Screen name="New Customer" component={NewCustomer} options={{ header: () => <Header /> }} />

      {/* Silo Screens */}
      <Stack.Screen name="Courier Pickup" component={CourierPickupScreen} options={{ header: () => <Header /> }} />
      <Stack.Screen name="Entry Session" component={CourierPickupScan} options={{ header: () => <Header /> }} />
      <Stack.Screen name="Courier" component={Courier} options={{ header: () => <Header /> }} />
    </Stack.Navigator>
  );
};

export default HomeStack;
