import React, { useState, useEffect, useContext } from "react";
import EmployeeDirectoryForm from "./EmployeeDirectoryForm";
import { getAllPersons } from "../../api/person";
import { getAlldepartament } from "../../api/department";
import { useHistory } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";

const EmployeeDirectory = () => {
  const [arrayAllPersons, setArrayAllPersons] = useState([]);
  const [arrayDepartament, setArrayDepartament] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [searchDep, setSearchDep] = useState("");
  const history = useHistory();
  const [, , contextMiddleware] = useContext(GlobalContext);
  const [page, setPage] = useState(8);
  const [pageLength, setPageLength] = useState("");

  useEffect(() => {
    let unmounted = false;

    getAlldepartament()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        contextMiddleware.showSpinner(true);
        if (!unmounted) {
          setArrayDepartament(res);
        }
      })
      .catch((err) => {
        contextMiddleware.showSpinner(false);
        console.error(err.status);
      });

    getAllPersons()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setArrayAllPersons((arrayAllPersons) => [...arrayAllPersons, ...res]);
          setPageLength(res.length);
        }
        contextMiddleware.showSpinner(false);
      })
      .catch((err) => {
        contextMiddleware.showSpinner(false);
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, []);

  // let filterDeparatment = [];

  const filterDep = (e) => {
    if (e) {
      setSearchDep(e);
    }
  };

  const filteredArryPersons = () => {
    if (searchDep === "todos" || searchDep === "" || searchDep === undefined) {
      if (search.length === 0)
        return arrayAllPersons.slice(currentPage, currentPage + 8);
      const filtered = arrayAllPersons.filter((persons) =>
        persons.fullName.toLowerCase().includes(search)
      );
      return filtered.slice(currentPage, currentPage + 8);
    } else {
      let filterDeparatment = [];
      for (let i = 0; i < arrayAllPersons.length; i++) {
        var currentNumber = arrayAllPersons[i];
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
      arrayAllPersons.filter((persons) =>
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
        pathname: "./employeeprofile",
        state: id,
      });
    }
  };

  return (
    <>
      <EmployeeDirectoryForm
        filteredArryPersons={filteredArryPersons}
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

export default EmployeeDirectory;
