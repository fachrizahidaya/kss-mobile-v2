import { memo, useEffect, useState } from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../styles/Color";

/**
 * @param {Object} data - The data object containing pagination information.
 * @param {function} setCurrentPage - Function to set the current page.
 * @param {number} currentPage - The current page number.
 */
const Pagination = ({ data, setCurrentPage, currentPage }) => {
  // State to store pagination array
  const [pagination, setPagination] = useState([]);

  // Generate pagination array based on data and current page
  const paginationHandler = () => {
    const totalPage = data?.data?.last_page;
    let arrayPage = [];

    if (totalPage > 5) {
      if (currentPage > 1) {
        arrayPage.push(1);
        arrayPage.push("...");
      }

      arrayPage.push(currentPage);

      if (currentPage < totalPage) {
        arrayPage.push("...");
        arrayPage.push(totalPage);
      }
    } else {
      for (let i = 1; i <= totalPage; i++) {
        arrayPage.push(i);
      }
    }

    setPagination(arrayPage);
  };

  // Update pagination array when data changes
  useEffect(() => {
    paginationHandler();
  }, [data]);
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View style={{ flexDirection: "row", gap: 5 }}>
        {/* Previous page button */}
        <Pressable
          style={[styles.page, { backgroundColor: Colors.primary }]}
          disabled={currentPage == 1}
          onPress={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        >
          <MaterialCommunityIcons name="chevron-left" color={Colors.iconLight} size={20} />
        </Pressable>

        {/* Page number buttons */}
        {pagination.map((page, idx) => {
          return (
            <Pressable
              style={[
                styles.page,
                {
                  backgroundColor: currentPage !== page ? "#FAFAFA" : Colors.primary,
                  borderWidth: 1,
                  borderColor: currentPage !== page ? "#FAFAFA" : Colors.primary,
                },
              ]}
              key={idx}
              onPress={() => (page !== "..." ? setCurrentPage(page) : null)}
            >
              <Text
                style={{
                  color: currentPage !== page ? Colors.primary : Colors.secondary,
                }}
              >
                {page}
              </Text>
            </Pressable>
          );
        })}

        {/* Next page button */}
        <Pressable
          style={[styles.page, { backgroundColor: Colors.primary }]}
          disabled={currentPage == data?.data?.last_page}
          onPress={() => pagination?.length > 1 && setCurrentPage(currentPage + 1)}
        >
          <MaterialCommunityIcons name="chevron-right" color={Colors.iconLight} size={20} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    borderRadius: 10,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default memo(Pagination);
