import { useState } from "react";
import MenuForm from "./MenuForm";
import "./Index.scss";
import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import WindowsPDF from "./WindowsPDF/Index";
import ImageViewer from "../../../common/components/ImageViewer/ImageViewer";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import MenuSkeleton from "./MenuSkeleton";

const queryClient = new QueryClient();

const Index = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState([]);
  const urlAPI = process.env.REACT_APP_API

  const [show, setShow] = useState({
    pdf: false,
    profile: false,
    example: false,
  });

  const [visible, setVisible] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState([]);

  function RenameArrayForGallery(array) {
    try {
      const newArray = array.map((data) => {
        if (!data?.content) return data;
        let src = data?.content;
        data.src = src;
        delete data?.content;
        return data;
      });
      return newArray;
    } catch (error) {
      console.error("Error en la funcion RenameArrayForGallery");
    }
  }

  function FetchContentCourse() {
    const {
      isLoading,
      error,
      data,
    } = useQuery(`ContentCourse-${selectedCourseId}`, () =>
      fetch(
        `${urlAPI}course/material/getall/images/${selectedCourseId}`
      ).then((res) => res.json())
    );

    if (isLoading)
      return (
        <>
          <div className="background-loading"></div>
          <span className="loader"></span>
        </>
      );

    if (error) return "An error has occurred: " + error.message;

    if (data.length > 0) {
      return (
        <ImageViewer
          visible={visible}
          setVisible={setVisible}
          arrayImg={RenameArrayForGallery(data)}
          length={data.length - 1}
        />
      );
    } else {
      setVisible(false);
      return null;
    }
  }

  function FetchPersonalProfile() {
    const {
      isLoading,
      error,
      data,
    } = useQuery(`ContentCourse-${selectedCourseId}`, () =>
      fetch(
        `${urlAPI}course/material/getall/profile/${selectedCourseId}`
      ).then((res) => res.json())
    );

    if (isLoading || !data.length > 0)
      return (
        <>
          <div className="background-loading"></div>
          <span className="loader"></span>
        </>
      );

      
    if (error) return "An error has occurred: " + error.message;
    
    if (!data.length > 0) {
      setShow({ ...show, profile: false });
      return null;
    }
    return <WindowsPDF data={data} show={show} setShow={setShow} />;
  }

  function FetchMenuModules() {
    const { status, error, data } = useQuery("Menu modules", () => {
      return fetch(`${urlAPI}course/getall`).then((res) => {
        return res.json();
      });
    });

    return (
      <>
        {status === "loading" || !data ? (
          <MenuSkeleton />
        ) : (
          status === "success" && setCourseData(data)
        )}
      </>
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <>
      <QueryClientProvider client={queryClient}>
        {visible && <FetchContentCourse />}
        {show?.profile && <FetchPersonalProfile />}
        <FetchMenuModules />
        {courseData.length > 0 && (
            <MenuForm
              navigate={navigate}
              courseData={courseData}
              show={show}
              setShow={setShow}
              setVisible={setVisible}
              setSelectedCourseId={setSelectedCourseId}
            />
          )}
      </QueryClientProvider>
    </>
  );
};

export default Index;
