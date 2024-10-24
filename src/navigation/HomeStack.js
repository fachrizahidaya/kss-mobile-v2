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
import Logout from "../screens/Authentication/Logout";
import Notification from "../screens/Notification";

// Band Screens
import ProjectDetailScreen from "../screens/Band/Project/ProjectDetail/[projectId]";
import ProjectTaskScreen from "../screens/Band/Project/ProjectTask";
import TaskDetailScreen from "../screens/Band/Task/TaskDetail/[taskId]";
import ProjectForm from "../screens/Band/Form/ProjectForm";
import TaskForm from "../screens/Band/Form/TaskForm";
import NoteForm from "../screens/Band/Form/NoteForm";
import GlobalSearch from "../screens/Band/GlobalSearch";

// Tribe Screens
import NewPost from "../screens/Tribe/Feed/NewPost/NewPost";
import EmployeeProfileScreen from "../screens/Tribe/Employee/[employeeId]";
import NewLeaveRequest from "../screens/Tribe/Leave/NewLeaveRequest/NewLeaveRequest";
import TeamLeave from "../screens/Tribe/Leave/TeamLeave/TeamLeave";
import NewReimbursement from "../screens/Tribe/Reimbursement/NewReimbursement/NewReimbursement";
import KPIScreen from "../screens/Tribe/Performance/KPI/KPIScreen";
import AppraisalScreen from "../screens/Tribe/Performance/Appraisal/AppraisalScreen";
import KPIReview from "../screens/Tribe/Performance/Review/KPIReview";
import GlobalSearchTribe from "../screens/Tribe/GlobalSearch";
import Post from "../screens/Tribe/Feed/[postId]";
import AppraisalReview from "../screens/Tribe/Performance/Review/AppraisalReview";
import Comment from "../screens/Tribe/Performance/Review/Comment";
import PerformanceResult from "../screens/Tribe/Performance/Result/PerformanceResult";
import AppraisalResult from "../screens/Tribe/Performance/Result/AppraisalResult";
import KPIResult from "../screens/Tribe/Performance/Result/KPIResult";
import CommentResult from "../screens/Tribe/Performance/Result/CommentResult";
import Conclusion from "../screens/Tribe/Performance/Result/Conclusion";
import KPIList from "../screens/Tribe/Performance/KPI/KPIList";
import AppraisalList from "../screens/Tribe/Performance/Appraisal/AppraisalList";
import KPIAppraisalReview from "../screens/Tribe/Performance/Review/KPIAppraisalReview";
import PerformanceListScreen from "../screens/Tribe/Performance/Result/PerformanceListScreen";
import Attendance from "../screens/Tribe/Attendance";

// Settings Screens
import SettingScreen from "../screens/Setting";
import MyProfile from "../screens/Setting/Account/MyProfile";
import Account from "../screens/Setting/Account";
import Company from "../screens/Setting/Account/Company";
import Subscription from "../screens/Setting/Account/Subscription";
import Payment from "../screens/Setting/Account/Payment";
import ChangePassword from "../screens/Setting/ChangePassword";
import FrequentlyAskedQuestions from "../screens/Setting/FAQ";
import FAQDetail from "../screens/Setting/FAQ/FAQDetail";
import PrivacyPolicy from "../screens/Setting/Legal/PrivacyPolicy";
import TermsAndConditions from "../screens/Setting/Legal/TermsAndConditions";
import ReminderSetting from "../screens/Setting/Reminder/ReminderSetting";

// Nest Screens
import ChatRoom from "../screens/Chat/ChatRoom/[userId]";
import ChatList from "../screens/Chat";
import AddGroupParticipant from "../screens/Chat/AddGroupParticipant/AddGroupParticipant";
import GroupFormScreen from "../screens/Chat/AddGroupParticipant/GroupFormScreen";
import AddPersonalChat from "../screens/Chat/AddPersonalChat/AddPersonalChat";
import ContactDetail from "../screens/Chat/ContactDetail/[userId]";
import EditGroupProfile from "../screens/Chat/EditGroupProfile/EditGroupProfile";
import Media from "../screens/Chat/ContactDetail/Media";
import ChatProjectTask from "../screens/Chat/ChatProjectTask";
import ProjectDetail from "../screens/Chat/ProjectDetail/[projectId]";
import TaskDetail from "../screens/Chat/TaskDetail/[taskId]";
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
import DownPayment from "../screens/Coin/Sales/DownPayment";
import Supplier from "../screens/Coin/Purchase/Supplier";
import NewSupplier from "../screens/Coin/Purchase/NewSupplier";
import NewCustomer from "../screens/Coin/Sales/NewCustomer";
import Inventory from "../screens/Coin/Inventory";
import Reminder from "../screens/Coin/Reminder";
import Activity from "../screens/Coin/Activity";
import ItemWarehouse from "../screens/Coin/Inventory/ItemWarehouse";
import ItemMinimum from "../screens/Coin/Inventory/ItemMinimum";
import Ledger from "../screens/Coin/Ledger";
import Journal from "../screens/Coin/Ledger/Journal";
import JournalLog from "../screens/Coin/Ledger/JournalLog";
import COA from "../screens/Coin/Ledger/COA";
import AccountHistory from "../screens/Coin/Ledger/AccountHistory";
import CashBank from "../screens/Coin/CashBank";
import PaymentScreen from "../screens/Coin/CashBank/PaymentScreen";
import Receipt from "../screens/Coin/CashBank/Receipt";
import BankHistory from "../screens/Coin/CashBank/BankHistory";
import BankTransfer from "../screens/Coin/CashBank/BankTransfer";
import Items from "../screens/Coin/Inventory/Items";
import PurchaseDownPayment from "../screens/Coin/Purchase/PurchaseDownPayment";
import PurchaseInvoice from "../screens/Coin/Purchase/PurchaseInvoice";
import PurchasePayment from "../screens/Coin/Purchase/PurchasePayment";
import Quotation from "../screens/Coin/Sales/Quotation";
import SalesReceipt from "../screens/Coin/Sales/SalesReceipt";
import Warehouse from "../screens/Coin/Inventory/Warehouse";
import StockOpname from "../screens/Coin/Inventory/StockOpname";
import ItemTransfer from "../screens/Coin/Inventory/ItemTransfer";
import ReceiveItemTransfer from "../screens/Coin/Inventory/ReceiveItemTransfer";
import PurchaseOrderDetail from "../screens/Coin/Purchase/[purchaseOrderId]";
import SalesOrderDetail from "../screens/Coin/Sales/[salesOrderId]";
import ReceiptPurchaseOrderDetail from "../screens/Coin/Purchase/[receiptPurchaseOrderId]";
import DeliveryOrderDetail from "../screens/Coin/Sales/[deliveryOrderId]";
import InvoiceDetail from "../screens/Coin/Sales/[invoiceId]";
import SupplierDetail from "../screens/Coin/Purchase/[supplierId]";
import JournalDetail from "../screens/Coin/Ledger/[journalId]";
import JournalLogDetail from "../screens/Coin/Ledger/[journalLogId]";
import COADetail from "../screens/Coin/Ledger/[coaId]";
import PaymentDetail from "../screens/Coin/CashBank/[paymentId]";
import ReceiptDetail from "../screens/Coin/CashBank/[receiptId]";
import BankTransferDetail from "../screens/Coin/CashBank/[bankTransferId]";
import ItemDetail from "../screens/Coin/Inventory/[itemId]";
import PurchaseInvoiceDetail from "../screens/Coin/Purchase/[purchaseInvoiceId]";
import PurchasePaymentDetail from "../screens/Coin/Purchase/[purchasePaymentId]";
import PurchaseDownPaymentDetail from "../screens/Coin/Purchase/[purchaseDownPaymentId]";
import QuotationDetail from "../screens/Coin/Sales/[quotationId]";
import DownPaymentDetail from "../screens/Coin/Sales/[downPaymentId]";
import SalesReceiptDetail from "../screens/Coin/Sales/[salesReceiptId]";
import StockOpnameDetail from "../screens/Coin/Inventory/[stockOpnameId]";
import ItemTransferDetail from "../screens/Coin/Inventory/[itemTransferId]";
import CustomerDetail from "../screens/Coin/Sales/[customerId]";
import ReceiveItemTransferDetail from "../screens/Coin/Inventory/[receiveItemTransferId]";

// Silo Screens
import CourierPickupScreen from "../screens/Silo/CourierPickup";
import SiloTab from "./tabs/SiloTab";
import Courier from "../screens/Silo/Courier";
import CourierPickupScan from "../screens/Silo/CourierPickup/CourierPickupScan";
import AttendanceScreen from "../screens/Tribe/Attendance/AttendanceScreen";

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
        component={ChatList}
        options={{
          gestureEnabled: true,
          header: () => <Header />,
        }}
      />

      <Stack.Screen name="Chat Room" component={ChatRoom} options={{ headerShown: false }} />

      <Stack.Screen name="Group Participant" component={AddGroupParticipant} options={{ headerShown: false }} />

      <Stack.Screen name="Group Form" component={GroupFormScreen} options={{ headerShown: false }} />

      <Stack.Screen name="New Chat" component={AddPersonalChat} options={{ headerShown: false }} />

      <Stack.Screen name="User Detail" component={ContactDetail} options={{ headerShown: false }} />

      <Stack.Screen name="Edit Group" component={EditGroupProfile} options={{ headerShown: false }} />

      <Stack.Screen name="Media" component={Media} options={{ headerShown: false }} />

      <Stack.Screen name="Project Screen" component={ChatProjectTask} options={{ headerShown: false }} />

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

      <Stack.Screen name="Employee KPI" component={KPIList} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Employee Appraisal" component={AppraisalList} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Employee Review" component={KPIAppraisalReview} options={{ header: () => <Header /> }} />

      <Stack.Screen
        name="Performance Result"
        component={PerformanceListScreen}
        options={{ header: () => <Header /> }}
      />

      <Stack.Screen name="KPI Detail" component={KPIScreen} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Appraisal Detail" component={AppraisalScreen} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Review KPI Detail" component={KPIReview} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Review Appraisal Detail" component={AppraisalReview} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Comment Detail" component={Comment} options={{ header: () => <Header /> }} />

      <Stack.Screen
        name="Confirmed Comment Detail"
        component={PerformanceResult}
        options={{ header: () => <Header /> }}
      />

      <Stack.Screen name="KPI Employee" component={KPIResult} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Appraisal Employee" component={AppraisalResult} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Comment Employee" component={CommentResult} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Conclusion Screen" component={Conclusion} options={{ header: () => <Header /> }} />

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

      <Stack.Screen name="Reminder Setting" component={ReminderSetting} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Attendance Screen" component={AttendanceScreen} options={{ header: () => <Header /> }} />

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

      <Stack.Screen
        name="Purchase Invoice Detail"
        component={PurchaseInvoiceDetail}
        options={{ header: () => <Header /> }}
      />

      <Stack.Screen
        name="Purchase Payment Detail"
        component={PurchasePaymentDetail}
        options={{ header: () => <Header /> }}
      />

      <Stack.Screen
        name="Purchase Down Payment Detail"
        component={PurchaseDownPaymentDetail}
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

      <Stack.Screen name="Customer Detail" component={CustomerDetail} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Down Payment" component={DownPayment} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Supplier" component={Supplier} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Supplier Detail" component={SupplierDetail} options={{ header: () => <Header /> }} />

      <Stack.Screen name="New Supplier" component={NewSupplier} options={{ header: () => <Header /> }} />

      <Stack.Screen name="New Customer" component={NewCustomer} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Inventory" component={Inventory} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Reminder" component={Reminder} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Activity" component={Activity} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Item Warehouse" component={ItemWarehouse} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Item Minimum" component={ItemMinimum} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Ledger" component={Ledger} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Cash Bank" component={CashBank} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Journal" component={Journal} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Journal Log" component={JournalLog} options={{ header: () => <Header /> }} />

      <Stack.Screen name="COA" component={COA} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Account History" component={AccountHistory} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Payment" component={PaymentScreen} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Receipt" component={Receipt} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Bank History" component={BankHistory} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Bank Transfer" component={BankTransfer} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Journal Detail" component={JournalDetail} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Payment Detail" component={PaymentDetail} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Receipt Detail" component={ReceiptDetail} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Journal Log Detail" component={JournalLogDetail} options={{ header: () => <Header /> }} />

      <Stack.Screen name="COA Detail" component={COADetail} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Bank Transfer Detail" component={BankTransferDetail} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Items" component={Items} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Items Detail" component={ItemDetail} options={{ header: () => <Header /> }} />

      <Stack.Screen
        name="Purchase Down Payment"
        component={PurchaseDownPayment}
        options={{ header: () => <Header /> }}
      />

      <Stack.Screen name="Purchase Invoice" component={PurchaseInvoice} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Purchase Payment" component={PurchasePayment} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Quotation" component={Quotation} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Quotation Detail" component={QuotationDetail} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Down Payment Detail" component={DownPaymentDetail} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Sales Receipt" component={SalesReceipt} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Sales Receipt Detail" component={SalesReceiptDetail} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Warehouse" component={Warehouse} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Stock Opname" component={StockOpname} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Stock Opname Detail" component={StockOpnameDetail} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Item Transfer" component={ItemTransfer} options={{ header: () => <Header /> }} />

      <Stack.Screen name="Item Transfer Detail" component={ItemTransferDetail} options={{ header: () => <Header /> }} />

      <Stack.Screen
        name="Receive Item Detail"
        component={ReceiveItemTransferDetail}
        options={{ header: () => <Header /> }}
      />

      <Stack.Screen
        name="Receive Item Transfer"
        component={ReceiveItemTransfer}
        options={{ header: () => <Header /> }}
      />

      {/* Silo Screens */}
      <Stack.Screen name="Courier Pickup" component={CourierPickupScreen} options={{ header: () => <Header /> }} />
      <Stack.Screen name="Entry Session" component={CourierPickupScan} options={{ header: () => <Header /> }} />
      <Stack.Screen name="Courier" component={Courier} options={{ header: () => <Header /> }} />
    </Stack.Navigator>
  );
};

export default HomeStack;
