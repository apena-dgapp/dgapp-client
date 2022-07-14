import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
// useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     }, 5000);
//   }, []);
const Spinner = ({ loading }) => {
  return (
    <div className="spinner-container">
      <ClipLoader color="36D7B7" loading={loading} size={150} />
    </div>
  );
};

export default Spinner;
