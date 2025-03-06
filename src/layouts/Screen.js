import { SafeAreaView, StyleSheet } from "react-native";
import ScreenHeader from "./ScreenHeader";
import PageHeader from "./PageHeader";
import { Colors } from "../styles/Color";

const Screen = ({
  screenTitle,
  children,
  childrenHeader,
  returnButton,
  subTitle,
  withLoading,
  isLoading,
  onPress,
  backgroundColor,
}) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: backgroundColor ? backgroundColor : null },
      ]}
    >
<<<<<<< HEAD
<<<<<<< HEAD
      <PageHeader
=======
      {/* {mainScreen ? ( */}
      {/* <ScreenHeader screenTitle={screenTitle} companyName={companyName} children={childrenHeader} /> */}
      {/* ) : ( */}
<<<<<<< HEAD
      {/* <PageHeader
>>>>>>> bbc1e628 (fix:)
=======
=======
>>>>>>> 028674de (chore: update necessary)
      <PageHeader
>>>>>>> 686361ba (fix: screen header)
        title={screenTitle}
        withReturnButton={returnButton}
        subTitle={subTitle}
        withLoading={withLoading}
        isLoading={isLoading}
        onPress={onPress}
        children={childrenHeader}
<<<<<<< HEAD
<<<<<<< HEAD
      />
<<<<<<< HEAD
=======
      /> */}
=======
      />
>>>>>>> 686361ba (fix: screen header)
      {/* )} */}
>>>>>>> bbc1e628 (fix:)
=======
>>>>>>> 028674de (chore: update necessary)
      {children}
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
    position: "relative",
  },
});
