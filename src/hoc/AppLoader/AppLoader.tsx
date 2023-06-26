import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/UI/Loader/Loader";
import { autoLogin } from "../../store/auth";
import { getQuizesDataStatus, getQuizesLoadingStatus, loadQuizesList } from "../../store/quizes";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch<any>();
  const quizesDataStatus = useSelector(getQuizesDataStatus());
  const quizesStatusLoading = useSelector(getQuizesLoadingStatus());

  useEffect(() => {
    if (!quizesDataStatus) dispatch(loadQuizesList());
    dispatch(autoLogin());
  }, [quizesDataStatus, dispatch]);
  if (quizesStatusLoading) return <Loader />;

  return children;
};
// AppLoader.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node
//   ])
// };

export default AppLoader;
