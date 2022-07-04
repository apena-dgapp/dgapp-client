import React, { useState, useEffect } from "react";
import EmployeeDirectoryForm from "./EmployeeDirectoryForm";
import { getAllPersons } from "../../api/person";
import { useHistory } from "react-router-dom";

const EmployeeDirectory = () => {
  const [arrayAllPersons, setArrayAllPersons] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const history = useHistory();

  useEffect(() => {
    let unmounted = false;

    getAllPersons()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setArrayAllPersons((arrayAllPersons) => [...arrayAllPersons, ...res]);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, []);

  const filteredArryPersons = () => {
    if (search.length === 0)
      return arrayAllPersons.slice(currentPage, currentPage + 8);
    const filtered = arrayAllPersons.filter((persons) =>
      persons.fullName.toLowerCase().includes(search)
    );
    return filtered.slice(currentPage, currentPage + 8);
  };

  const nextPage = () => {
    if (
      arrayAllPersons.filter((persons) =>
        persons.fullName.toLowerCase().includes(search)
      ).length >
      currentPage + 8
    )
      setCurrentPage(currentPage + 8);
  };

  const backPage = () => {
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
      />
    </>
  );
};

export default EmployeeDirectory;
