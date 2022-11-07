import React, { useState, useEffect } from "react";
import TrainingForm from "./TrainingForm";
import { getCourses } from "../../api/course";
import { getAlldepartament } from "../../api/department";
import { useHistory } from "react-router-dom";

const Training = () => {
  const [courses, setCourses] = useState([]);
  const [arrayDepartament, setArrayDepartament] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [searchDep, setSearchDep] = useState("");
  const history = useHistory();
  const [page, setPage] = useState(8);
  const [pageLength, setPageLength] = useState("");

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
    if (e) {
      setSearchDep(e);
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
      courses.filter((persons) =>
        persons.fullName.toLowerCase().includes(search)
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

  const goToProfile = (e, id) => {
    if (id !== 0) {
      e.preventDefault();
      history.push({
        pathname: "./perfil",
        state: id,
      });
    }
  };

  return (
    <>
      <TrainingForm
        filterArrayCourses={filterArrayCourses}
        nextPage={nextPage}
        backPage={backPage}
        onSearchChange={onSearchChange}
        search={search}
        goToProfile={goToProfile}
        arrayDepartament={arrayDepartament}
        filterDep={filterDep}
        searchDep={searchDep}
        pageLength={pageLength}
        page={page}
      />
    </>
  );
};

export default Training;
