import React, { useContext, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import GlobalContext from "../../../context/GlobalContext";

const Spinner = ({ showSpinner }) => {
  // const [contextState, , contextMiddleware] = useContext(GlobalContext);
  // useEffect(() => {
  //   console.log(contextState.isLoading);
  //   if ((contextState.isLoading = true)) {
  //     setTimeout(() => {}, 5000);
  //   }
  // }, [contextState]);
  return (
    <div className="spinner-container">
      <ClipLoader color="#36D7B7" loading={showSpinner} size={150} />
    </div>
  );
};

export default Spinner;
