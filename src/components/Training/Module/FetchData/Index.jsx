import { useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const urlAPI = process.env.REACT_APP_API;

export const FetchCourse = ({
  courseId,
  setCourseData,
  setLoading,
  loading,
}) => {
  const { error, data, status } = useQuery(
    "Courses",
    () => {
      return fetch(`${urlAPI}course/get/${courseId}`).then((res) => {
        return res.json();
      });
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (status === "loading") return;
    if (error) return;
    setCourseData(data);
    setLoading({ ...loading, course: false });
  }, [data, error]);

  return null;
};

export const FetchSection = ({
  courseId,
  setSectionData,
  setLoading,
  loading,
}) => {
  const { status, error, data } = useQuery(
    "Section",
    () => {
      return fetch(`${urlAPI}section/getall/${courseId}`).then((res) => {
        return res.json();
      });
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (status === "loading") return;
    if (error) return;
    setSectionData(data);
    setLoading({ ...loading, section: false });
  }, [data, error]);

  return null;
};

export const FetchContent = ({
  courseId,
  setContentData,
  setLoading,
  loading,
}) => {
  const { status, error, data } = useQuery(
    "Content",
    () => {
      return fetch(`${urlAPI}content/getall/${courseId}`).then((res) => {
        return res.json();
      });
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (status === "loading") return;
    if (error) return;
    setContentData(data);
    setLoading({ ...loading, content: false });
  }, [data, error]);

  return null;
};
