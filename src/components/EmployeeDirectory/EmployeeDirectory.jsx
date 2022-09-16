import React, { useState, useEffect } from "react";
import EmployeeDirectoryForm from "./EmployeeDirectoryForm";
import { getAllPersons } from "../../api/person";
import { getAlldepartament } from "../../api/department";
import { useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const EmployeeDirectory = () => {
  const [arrayAllPersons, setArrayAllPersons] = useState([]);
  const [arrayDepartament, setArrayDepartament] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [searchDep, setSearchDep] = useState("");
  const history = useHistory();
  const [page, setPage] = useState(8);
  const [pageLength, setPageLength] = useState("");
  const [loading, seLoading] = useState(false);

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

    getAllPersons()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setArrayAllPersons((arrayAllPersons) => [...arrayAllPersons, ...res]);
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
        setPageLength(arrayAllPersons.length);
      }
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
      {loading ? (
        <div className="spinner-container">
          <ClipLoader color="#113250" loading={loading} size={150} />
        </div>
      ) : (
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
      )}
    </>
  );
};

export default EmployeeDirectory;
