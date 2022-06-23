import React, { useState, useEffect, useContext } from "react";
import EmployeeDirectoryForm from "./EmployeeDirectoryForm";
import { getAllPersons } from "../../api/person";
import GlobalContext from "../../context/GlobalContext";
import { useHistory } from "react-router-dom";

const EmployeeDirectory = () => {
  const [contextState] = useContext(GlobalContext);
  const [arrayAllPersons, setArrayAllPersons] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const history = useHistory();

  useEffect(() => {
    let unmounted = false;

    getAllPersons(contextState.token)
      .then((res) => {
        if (res.status >= 400) throw new alert.err("error usuario incorrecto");
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
  }, [contextState.token]);

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
