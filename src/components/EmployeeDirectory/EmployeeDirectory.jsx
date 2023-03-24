import React, { useState, useEffect } from "react";
import EmployeeDirectoryForm from "./EmployeeDirectoryForm";
import { getAllPersons, getDirectory } from "../../api/person";
import { getAlldepartament } from "../../api/department";
import { useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const EmployeeDirectory = () => {
  const [arrayDepartament, setArrayDepartament] = useState();
  const [searchDep, setSearchDep] = useState("");
  const [departamentList, setDepartamentList] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState([]);
  const [male, setMale] = useState([]);
  const [female, setFemale] = useState([]);
  const [maleTotal, setMaleTotal] = useState([]);
  const [femaleTotal, setFemaleTotal] = useState([]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [related, setRelated] = useState("");
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    let unmounted = false;

    // setLoading(true);

    getDirectory(currentPage, 8, related, departamentList, searchDep)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setItems(res);
          setPageCount(res.count / 8);
          if (searchDep !== "" || searchDep !== "todos") {
            setMale(res.rows?.filter((item) => item.gender === "Masculino"));
            setFemale(res.rows?.filter((item) => item.gender === "Femenino"));
          }
          setTotal(res.count)

          // setTimeout(() => {
          //   if (res) {
          //     setLoading(false);
          //   }
          // }, 2500);
          // setPageCount(Math.round(res.count / 4));
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, [currentPage, related, searchDep, arrayDepartament, departamentList]);

  useEffect(() => {
    let unmounted = false;

    getAlldepartament()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setArrayDepartament(res);
          res.map((item) => {
            return (
              setDepartamentList((departamentList) => [...departamentList, item.name])
            )
          })
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
          setMaleTotal(res?.filter((item) => item.gender === "Masculino"));
          setFemaleTotal(res?.filter((item) => item.gender === "Femenino"));
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
    setSearchDep(e);
  };

  const onSearchChange = (e) => {
    setCurrentPage(0);
    setRelated(e.target.value);
  };

  const goToProfile = (props) => {
    // console.log(props)
    if (props.id !== 0) {
      navigate(`/perfil/${props.name}`, {
        state: props.id,
      });
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected)
  }

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <ClipLoader color="#113250" loading={loading} size={150} />
        </div>
      ) : (
        <EmployeeDirectoryForm
          handlePageClick={handlePageClick}
          items={items}
          pageCount={pageCount}
          setRelated={setRelated}
          onSearchChange={onSearchChange}
          search={related}
          goToProfile={goToProfile}
          arrayDepartament={arrayDepartament}
          filterDep={filterDep}
          searchDep={searchDep}
          male={male}
          female={female}
          maleTotal={maleTotal}
          femaleTotal={femaleTotal}
          total={total}
        />
      )}
    </>
  );
};

export default EmployeeDirectory;
