import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Skeleton } from "moti/skeleton";
import { SheetManager } from "react-native-actions-sheet";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { card } from "../../../styles/Card";
import { SkeletonCommonProps, TextProps } from "../../../styles/CustomStylings";
import LoadingBar from "../shared/LoadingBar";
import CustomDateTimePicker from "../../../styles/CustomDateTimePicker";

const SalesAndPurchaseCard = ({ currencyConverter, converter }) => {
  const dataArr = [
    {
      title: "Sales",
      value: 800000000,
      icon: null,
      paid: 350000000,
      notPaid: 2000000000,
      overdue: 1300000000,
    },
    {
      title: "Purchase",
      value: 400000000,
      icon: null,
      paid: 50000000,
      notPaid: 5000000000,
      overdue: 3500000000,
    },
  ];

  return (
    <View style={styles.container}>
      {/* {!invoiceIsLoading ? ( */}
      <Pressable style={[card.card, { flex: 1 }]}>
        <View style={{ gap: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={[TextProps]}>{dataArr[0].title}</Text>
            <Pressable
              style={styles.wrapper}
              onPress={() =>
                SheetManager.show("form-sheet", {
                  payload: {
                    children: (
                      <View style={styles.content}>
                        <View style={{ gap: 5 }}>
                          <CustomDateTimePicker
                            unlimitStartDate={true}
                            width="100%"
                            //   defaultValue={startDate ? startDate : null}
                            //   onChange={startDateChangeHandler}
                            title="Begin Date"
                          />
                        </View>
                        <View style={{ gap: 5 }}>
                          <CustomDateTimePicker
                            unlimitStartDate={true}
                            width="100%"
                            //   defaultValue={startDate ? startDate : null}
                            //   onChange={startDateChangeHandler}
                            title="End Date"
                          />
                        </View>
                      </View>
                    ),
                  },
                })
              }
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <MaterialCommunityIcons name="tune-variant" size={15} color="#3F434A" />
              </View>
            </Pressable>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={[TextProps, { color: "#8A9099" }]}>This Month</Text>
            <Text style={[TextProps]}>{converter(dataArr[0].value)}</Text>
          </View>
          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={[TextProps, { fontSize: 10 }]}>{"Paid"}</Text>
              <Text style={[TextProps, { fontSize: 10 }]}>{"Unpaid"}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={[TextProps, { fontSize: 10 }]}>{converter(dataArr[0].paid)}</Text>
              <Text style={[TextProps, { fontSize: 10 }]}>{converter(dataArr[0].value - dataArr[0].paid)}</Text>
            </View>
          </View>

          <LoadingBar total={dataArr[0].value} paid={dataArr[0].paid} unpaid={dataArr[0].value - dataArr[0].paid} />
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={[TextProps, { color: "#8A9099" }]}>Today</Text>
            <Text style={[TextProps]}>{converter(dataArr[0].notPaid)}</Text>
          </View>
          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={[TextProps, { fontSize: 10 }]}>{"Underdue"}</Text>
              <Text style={[TextProps, { fontSize: 10 }]}>{"Overdue"}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={[TextProps, { fontSize: 10 }]}>{converter(dataArr[0].notPaid - dataArr[0].overdue)}</Text>
              <Text style={[TextProps, { fontSize: 10 }]}>{converter(dataArr[0].overdue)}</Text>
            </View>
          </View>
          <LoadingBar
            total={dataArr[0].notPaid}
            paid={dataArr[0].notPaid - dataArr[0].overdue}
            unpaid={dataArr[0].overdue}
            asToday={true}
          />
        </View>
      </Pressable>
      {/* ) : ( */}
      {/* <Skeleton width={width / 2 - 20} height={160} radius={20} {...SkeletonCommonProps} /> */}
      {/* )} */}

      {/* {!customerIsLoading ? ( */}
      <Pressable style={[card.card, { flex: 1 }]}>
        <View style={{ gap: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 15, justifyContent: "space-between" }}>
            <Text style={[TextProps]}>{dataArr[1].title}</Text>
            <Pressable
              style={styles.wrapper}
              onPress={() =>
                SheetManager.show("form-sheet", {
                  payload: {
                    children: (
                      <View style={styles.content}>
                        <View style={{ gap: 5 }}>
                          <CustomDateTimePicker
                            unlimitStartDate={true}
                            width="100%"
                            //   defaultValue={startDate ? startDate : null}
                            //   onChange={startDateChangeHandler}
                            title="Begin Date"
                          />
                        </View>
                        <View style={{ gap: 5 }}>
                          <CustomDateTimePicker
                            unlimitStartDate={true}
                            width="100%"
                            //   defaultValue={startDate ? startDate : null}
                            //   onChange={startDateChangeHandler}
                            title="End Date"
                          />
                        </View>
                      </View>
                    ),
                  },
                })
              }
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <MaterialCommunityIcons name="tune-variant" size={15} color="#3F434A" />
              </View>
            </Pressable>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={[TextProps, { color: "#8A9099" }]}>This Month</Text>
            <Text style={[TextProps]}>{converter(dataArr[1].value)}</Text>
          </View>
          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={[TextProps, { fontSize: 10 }]}>{"Paid"}</Text>
              <Text style={[TextProps, { fontSize: 10 }]}>{"Unpaid"}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={[TextProps, { fontSize: 10 }]}>{converter(dataArr[1].paid)}</Text>
              <Text style={[TextProps, { fontSize: 10 }]}>{converter(dataArr[1].value - dataArr[1].paid)}</Text>
            </View>
          </View>
          <LoadingBar total={dataArr[1].value} paid={dataArr[1].paid} unpaid={dataArr[1].value - dataArr[1].paid} />
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={[TextProps, { color: "#8A9099" }]}>Today</Text>
            <Text style={[TextProps]}>{converter(dataArr[1].notPaid)}</Text>
          </View>
          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={[TextProps, { fontSize: 10 }]}>{"Underdue"}</Text>
              <Text style={[TextProps, { fontSize: 10 }]}>{"Overdue"}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={[TextProps, { fontSize: 10 }]}>{converter(dataArr[1].notPaid - dataArr[1].overdue)}</Text>
              <Text style={[TextProps, { fontSize: 10 }]}>{converter(dataArr[1].overdue)}</Text>
            </View>
          </View>
          <LoadingBar
            total={dataArr[1].notPaid}
            paid={dataArr[1].notPaid - dataArr[1].overdue}
            unpaid={dataArr[1].overdue}
            asToday={true}
          />
        </View>
      </Pressable>
      {/* ) : ( */}
      {/* <Skeleton width={width / 2 - 20} height={160} radius={20} {...SkeletonCommonProps} /> */}
      {/* )} */}
    </View>
  );
};

export default SalesAndPurchaseCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    flex: 1,
  },
  content: {
    gap: 21,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: -20,
  },
  wrapper: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E9EB",
    backgroundColor: "#FFFFFF",
  },
});
