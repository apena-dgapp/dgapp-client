import React, { useState, useEffect } from "react";
import TrainingForm from "./TrainingForm";
import { getCourses } from "../../api/course";
import { getAlldepartament } from "../../api/department";
import { useNavigate } from "react-router-dom";  
import ClipLoader from "react-spinners/ClipLoader";
import Cookies from "universal-cookie";
// import useGetData from "../../hooks/useGetData";
import axios from 'axios'

const Training = () => {
  const [courses, setCourses] = useState([]);
  const [arrayDepartament, setArrayDepartament] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [searchDep, setSearchDep] = useState("");
  const navigate = useNavigate();
  const [page, setPage] = useState(8);
  const [pageLength, setPageLength] = useState("");
  const [loading, seLoading] = useState(false);
 
 
  const cookies = new Cookies();

  function updateView(courseId, views) {
    axios({
      method: 'put',
      url: `${process.env.REACT_APP_API}/course/${courseId}`,
      data: {
        views: views + 1
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function getVideoId(url) {
    const id = url?.split("v=")[1]?.split("&");
    return id[0];
  }

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      seLoading(true);
    }
    setTimeout(() => {
      if (!unmounted) {
        seLoading(false);
      }
    }, 1500);
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    let unmounted = false;

    getAlldepartament()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setArrayDepartament(res);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

      getCourses()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setCourses((courses) => [...courses, ...res]);
          setPageLength(res.length);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, []);

  const filterDep = (e) => {
    setCurrentPage(0);
    if (pageLength > 8) {
      setPage(8);
    }
    if (e) {
      setSearchDep(e);
      if (e === "todos") {
        setPageLength(courses.length);
      }
    }
  };

  const filterArrayCourses = () => {
    if (searchDep === "todos" || searchDep === "" || searchDep === undefined) {
      if (search.length === 0)
        return courses.slice(currentPage, currentPage + 8);
      const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(search)
      );
      return filtered.slice(currentPage, currentPage + 8);
    } else {
      let filterDeparatment = [];
      for (let i = 0; i < courses.length; i++) {
        var currentNumber = courses[i];

        if (currentNumber.Departament.name === searchDep) {
          filterDeparatment.push(currentNumber);
        }
      }
      setPageLength(filterDeparatment.length);

      if (search.length === 0 && filterDeparatment.length !== 0)
        return filterDeparatment.slice(currentPage, currentPage + 8);
      const filtered = filterDeparatment.filter((persons) =>
        persons.fullName.toLowerCase().includes(search)
      );

      return filtered.slice(currentPage, currentPage + 8);
    }
  };
  const nextPage = () => {
    setPage(page + 8);
    if (
      courses.filter((course) =>
      course.title.toLowerCase().includes(search)
      ).length >
      currentPage + 8
    )
      setCurrentPage(currentPage + 8);
  };
  const backPage = () => {
    setPage(page - 8);
    if (currentPage > 0) {
      setCurrentPage(currentPage - 8);
    }
  };

  const onSearchChange = (e) => {
    setCurrentPage(0);
    setSearch(e.target.value.toLowerCase());
  };


  const goToNew = () => { 
      navigate("/entrenamiento/curso/crear");
  };

  const goToCourse = (props) => {
    let videoCookie = cookies.get(`courseId:${props.id}:lastVideo`);
    if(videoCookie) {
      navigate(`/entrenamiento/curso/${props.id}/${videoCookie}`)
    } 
    else {
      axios.get(`${process.env.REACT_APP_API}/video/firstVideo/${props.id}`)
      .then(res => {
        const url = getVideoId(res.data[0].link);
        navigate(`/entrenamiento/curso/${props.id}/${url}`)
      })
    }
    
    updateView(props.courseId, props.views)
    
  }

  const goToEdit = (id) => { 
    navigate(`/entrenamiento/curso/${id}/edit`);
  };

  return (
    <>
    {loading ? (
        <div className="spinner-container">
          <ClipLoader color="#113250" loading={loading} size={150} />
        </div>
      ) : (
      <TrainingForm
        filterArrayCourses={filterArrayCourses}
        nextPage={nextPage}
        backPage={backPage}
        onSearchChange={onSearchChange}
        search={search}
        arrayDepartament={arrayDepartament}
        filterDep={filterDep}
        searchDep={searchDep}
        pageLength={pageLength}
        page={page}
        goToNew={goToNew}
        goToEdit={goToEdit}
        goToCourse={goToCourse}
      />
      )}
    </>
  );
};

export default Training;
