import axios from "axios";
const URI = `${process.env.REACT_APP_API}/record/`;

const useUpdateRecord = (data) => {

  if (0 === data.state && (0 !== data.videoId)) {

    const fetchData = async () => {
      try {
        await axios.post(URI,
          {
            courseId: data.courseId,
            videoId: data.videoId,
            employeeId: data.employeeId,
            checked: !data.checked
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    return (!data.checked ? +1 : -1)
  }
};

export default useUpdateRecord;
