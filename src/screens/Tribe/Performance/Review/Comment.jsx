import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFormik } from "formik";
import * as yup from "yup";

import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useDisclosure } from "../../../../hooks/useDisclosure";
import { useLoading } from "../../../../hooks/useLoading";
import PageHeader from "../../../../styles/PageHeader";
import { useFetch } from "../../../../hooks/useFetch";
import axiosInstance from "../../../../config/api";
import ReturnConfirmationModal from "../../../../styles/modals/ReturnConfirmationModal";
import CommentDetailList from "../../../../components/Tribe/Performance/Review/CommentDetailList";
import CommentDetailItem from "../../../../components/Tribe/Performance/Review/CommentDetailItem";
import CommentForm from "../../../../components/Tribe/Performance/Review/CommentForm";
import ConfirmationModal from "../../../../styles/modals/ConfirmationModal";
import AlertModal from "../../../../styles/modals/AlertModal";
import EmptyPlaceholder from "../../../../styles/EmptyPlaceholder";
import CommentSaveButton from "../../../../components/Tribe/Performance/Review/CommentSaveButton";

const Comment = () => {
  const [commentValues, setCommentValues] = useState([]);
  const [employeeCommentValue, setEmployeeCommentValue] = useState([]);
  const [comment, setComment] = useState(null);
  const [requestType, setRequestType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const formScreenSheetRef = useRef(null);

  const { id } = route.params;

  const { isOpen: returnModalIsOpen, toggle: toggleReturnModal } = useDisclosure(false);
  const { isOpen: saveModalIsOpen, toggle: toggleSaveModal } = useDisclosure(false);
  const { isOpen: confirmationModalIsOpen, toggle: toggleConfirmationModal } = useDisclosure(false);
  const { isOpen: confirmedModalIsOpen, toggle: toggleConfirmedModal } = useDisclosure(false);

  const { isLoading: submitIsLoading, toggle: toggleSubmit } = useLoading(false);

  const { data: commentList, refetch: refetchCommentList } = useFetch(`/hr/employee-review/comment/${id}`);

  /**
   * Handle selected comment
   * @param {*} data
   * @param {*} value
   */
  const openSelectedComment = (data, value) => {
    setComment(data);
    formScreenSheetRef.current?.show();
  };
  const closeSelectedComment = () => {
    formScreenSheetRef.current?.hide();
  };

  const handleReturn = () => {
    if (differences.length === 0) {
      navigation.goBack();
    } else {
      toggleReturnModal();
    }
  };

  const getEmployeeCommentValue = (employee_comment_value) => {
    let employeeCommentValArr = [];
    if (Array.isArray(employee_comment_value)) {
      employee_comment_value.forEach((val) => {
        employeeCommentValArr.push({
          ...val?.performance_review_comment,
          id: val?.id,
          performance_review_comment_id: val?.performance_review_comment_id,
          comment: val?.comment,
        });
      });
    }
    return employeeCommentValArr;
  };

  /**
   * Handle update value of Comment item
   * @param {*} data
   */
  const employeeCommentValueUpdateHandler = (data) => {
    setEmployeeCommentValue((prevState) => {
      const index = prevState.findIndex(
        (employee_comment_val) =>
          employee_comment_val?.performance_review_comment_id === data?.performance_review_comment_id
      );
      const currentData = [...prevState];
      if (index > -1) {
        currentData[index].comment = data?.comment;
      } else {
        currentData.push(data);
      }
      return currentData;
    });
  };

  /**
   * Handle array of update Comment item
   */
  const sumUpCommentValue = () => {
    setCommentValues(() => {
      const employeeCommentValue = getEmployeeCommentValue(commentList?.data?.employee_review_comment_value);
      return [...employeeCommentValue];
    });
  };

  /**
   * Handle saved current comment value to be can saved or not
   * @param {*} commentValues
   * @param {*} employeeCommentValue
   * @returns
   */
  const compareCommentExisting = (commentValues, employeeCommentValue) => {
    let differences = [];

    for (let empComment of employeeCommentValue) {
      let commentValue = commentValues.find((comment) => comment.id === empComment.id);
      if (commentValue && commentValue.comment !== empComment.comment) {
        differences.push({
          id: empComment.id,
          difference: [empComment.comment, commentValue.comment],
        });
      }
    }

    return differences;
  };

  let differences = compareCommentExisting(commentValues, employeeCommentValue);

  /**
   * Handle save filled or updated Comment
   */
  const submitHandler = async () => {
    try {
      toggleSubmit();
      await axiosInstance.patch(`/hr/employee-review/comment/${commentList?.data?.id}`, {
        comment_value: employeeCommentValue,
      });
      setRequestType("patch");
      toggleSaveModal();
      refetchCommentList();
    } catch (err) {
      console.log(err);
      setRequestType("error");
      toggleSaveModal();
      toggleSubmit();
    } finally {
      toggleSubmit();
    }
  };

  /**
   * Handle create Comment value
   */
  const formik = useFormik({
    initialValues: {
      performance_review_comment_id: comment?.performance_review_comment_id || comment?.id,
      comment: comment?.comment || "",
    },
    validationSchema: yup.object().shape({
      comment: yup.string().required("Comment is required"),
    }),
    onSubmit: (values) => {
      if (formik.isValid) {
        employeeCommentValueUpdateHandler(values);
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (commentList?.data) {
      sumUpCommentValue();
      setEmployeeCommentValue(() => {
        const employeeCommentValue = getEmployeeCommentValue(commentList?.data?.employee_review_comment_value);
        return [...employeeCommentValue];
      });
    }
  }, [commentList?.data]);

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff", flex: 1 }}>
      <View style={styles.header}>
        <PageHeader
          width={200}
          title={<Text>{commentList?.data?.performance_review?.description}</Text>}
          backButton={true}
          onPress={handleReturn}
        />
        {commentValues.length > 0 ? (
          <CommentSaveButton isLoading={submitIsLoading} differences={differences} onSubmit={submitHandler} />
        ) : null}
      </View>

      <CommentDetailList
        dayjs={dayjs}
        begin_date={commentList?.data?.performance_review?.begin_date}
        end_date={commentList?.data?.performance_review?.end_date}
        name={commentList?.data?.employee?.name}
        title={commentList?.data?.performance_review?.description}
      />

      <View style={styles.container}>
        <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
          {commentValues && commentValues.length > 0 ? (
            commentValues.map((item, index) => {
              const correspondingEmployeeComment = employeeCommentValue.find((empComment) => empComment.id === item.id);
              return (
                <CommentDetailItem
                  key={index}
                  item={item}
                  description={item?.description}
                  handleOpen={openSelectedComment}
                  employeeCommentValue={correspondingEmployeeComment}
                  comment={item?.comment}
                />
              );
            })
          ) : (
            <View style={styles.content}>
              <EmptyPlaceholder height={250} width={250} text="No Data" />
            </View>
          )}
        </ScrollView>
      </View>
      {commentValues.length > 0 ? (
        <Pressable style={styles.confirmIcon} onPress={toggleConfirmationModal}>
          <MaterialCommunityIcons name="check" size={30} color="#FFFFFF" />
        </Pressable>
      ) : null}

      <ReturnConfirmationModal
        isOpen={returnModalIsOpen}
        toggle={toggleReturnModal}
        description="Are you sure want to return? Data changes will not be save."
        onPress={() => navigation.goBack()}
      />
      <CommentForm
        reference={formScreenSheetRef}
        description={comment?.description}
        formik={formik}
        handleClose={closeSelectedComment}
        comment={comment?.comment}
      />
      <ConfirmationModal
        isOpen={confirmationModalIsOpen}
        toggle={toggleConfirmationModal}
        isGet={true}
        isDelete={false}
        isPatch={false}
        apiUrl={`/hr/employee-review/comment/${id}/finish`}
        color="#377893"
        hasSuccessFunc={true}
        onSuccess={() => navigation.goBack()}
        description="Are you sure want to confirm this review?"
        toggleOtherModal={toggleConfirmedModal}
        success={success}
        setSuccess={setSuccess}
        setError={setErrorMessage}
        setRequestType={setRequestType}
      />
      <AlertModal
        isOpen={saveModalIsOpen}
        toggle={toggleSaveModal}
        type={requestType === "patch" ? "success" : "danger"}
        title={requestType === "patch" ? "Changes saved!" : "Process error!"}
        description={requestType === "patch" ? "Data successfully saved" : errorMessage || "Please try again later"}
      />

      <AlertModal
        isOpen={confirmedModalIsOpen}
        toggle={toggleConfirmedModal}
        type={requestType === "fetch" ? "success" : "danger"}
        title={requestType === "fetch" ? "Report submitted!" : "Process error!"}
        description={requestType === "fetch" ? "Your report is logged" : errorMessage || "Please try again later"}
      />
    </SafeAreaView>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  confirmIcon: {
    backgroundColor: "#377893",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 50,
    right: 15,
    zIndex: 2,
    borderRadius: 30,
    shadowOffset: 0,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  content: {
    marginTop: 20,
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
