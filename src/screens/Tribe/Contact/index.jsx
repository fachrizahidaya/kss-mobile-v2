import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native";

import ContactList from "../../../components/Tribe/Contact/ContactList";
import Tabs from "../../../layouts/Tabs";
import Input from "../../../styles/forms/Input";
import Screen from "../../../layouts/Screen";
import { Colors } from "../../../styles/Color";
import { useContact } from "./hooks/useContact";

const Contact = () => {
  const {
    contacts,
    unattendContacts,
    attendContacts,
    alpaContacts,
    filteredDataArray,
    inputToShow,
    number,
    tabValue,
    hasBeenScrolled,
    navigation,
    userSelector,
    employeeDataIsFetching,
    employeeDataIsLoading,
    refetchEmployeeData,
    fetchMoreEmployeeContact,
    handleClearSearch,
    handleSearch,
    tabs,
    onChangeNumber,
    handleChangeTab,
    handleSearchContact,
    setInputToShow,
    setSearchInput,
    setHasBeenScrolled,
  } = useContact();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Screen screenTitle="Contact">
        <View style={styles.searchContainer}>
          <Input
            value={inputToShow}
            fieldName="search"
            startIcon="magnify"
            endIcon={inputToShow && "close-circle-outline"}
            onPressEndIcon={handleClearSearch}
            onChangeText={handleSearch}
            placeHolder="Search"
            height={40}
          />
          <Tabs
            tabs={tabs}
            value={tabValue}
            onChange={handleChangeTab}
            onChangeNumber={onChangeNumber}
            withIcon={true}
          />
        </View>

        {/* Content here */}
        <ContactList
          data={contacts}
          filteredData={filteredDataArray}
          hasBeenScrolled={hasBeenScrolled}
          setHasBeenScrolled={setHasBeenScrolled}
          handleFetchMoreContact={fetchMoreEmployeeContact}
          refetch={refetchEmployeeData}
          isFetching={employeeDataIsFetching}
          isLoading={employeeDataIsLoading}
          navigation={navigation}
          userSelector={userSelector}
          tabValue={tabValue}
          number={number}
          setInputToShow={setInputToShow}
          setSearchInput={setSearchInput}
          searchContactHandler={handleSearchContact}
          unattendData={unattendContacts}
          attendData={attendContacts}
          alpaData={alpaContacts}
        />
      </Screen>
    </TouchableWithoutFeedback>
  );
};

export default Contact;

const styles = StyleSheet.create({
  searchContainer: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    gap: 10,
    borderTopColor: Colors.borderGrey,
    backgroundColor: Colors.secondary,
  },
});
