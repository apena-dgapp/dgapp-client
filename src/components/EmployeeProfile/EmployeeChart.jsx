import React, { useEffect, useState, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { getFollowers } from "../../api/person";
import { useHistory } from "react-router-dom";
import Images from "../../common/images";

const EmployeeChart = (state) => {
  const [contextState] = useContext(GlobalContext);
  const [followersChart, setFollowersChart] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let unmounted = false;

    getFollowers(contextState.token, state.location.state.id)
      .then((res) => {
        if (res.status >= 400) throw new alert.err("error usuario incorrecto");
        return res.json();
      })

      .then((res) => {
        if (!unmounted) {
          setFollowersChart(res);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, [contextState.token, state.location.state.id]);

  const goToProfile = (e, id) => {
    if (id !== 0) {
      e.preventDefault();
      history.push({
        pathname: "./employeeprofile",
        state: id,
      });
    }
  };

  const goTochart = () => {
    if (state.location.state.fullName) {
      history.push({
        pathname: "./employeechart",
        state: state.location.state.id,
      });
    }
  };

  return (
    <>
      <div className="tree-container">
        {/* <div className="allPostTitle-cont">
  <div className='allPostTitle'>Organization Chart</div>
</div> */}

        <div className="tree">
          <ul>
            <li>
              <a
                href={state.location.state.idReportTo === 0 ? null : "#/"}
                onClick={(e) => goToProfile(e, state.location.state.idReportTo)}
                className="img-first"
                // href="#/"
              >
                {state.location.state.id === 1 ? (
                  <img src={Images.ministerio} alt="" />
                ) : (
                  <img
                    src={
                      state.location.state.photoReportTo
                        ? state.location.state.photoReportTo
                        : Images.noImg
                    }
                    alt=""
                  />
                )}
                {/* <img
                  src={
                    state.location.state.photoReportTo
                      ? state.location.state.photoReportTo
                      : Images.noImg
                  }
                  alt=""
                /> */}
                <p className="img-departament">
                  {state.location.state.departamentReportTo}
                </p>
                {state.location.state.id === 1 ? (
                  <span>Ministerio de la Presidencia</span>
                ) : (
                  <span>{state.location.state.fullNameReportTo}</span>
                )}

                {/* <span>{state.location.state.fullNameReportTo}</span> */}
                <p className="img-position">
                  {state.location.state.positionReportTo}
                </p>
              </a>
              <ul>
                <li>
                  <a
                    onClick={(e) => goToProfile(e, state.location.state.id)}
                    // onClick={goTochart}
                    className="img-second"
                    href="#/"
                  >
                    <img
                      // onClick={(e) => goToProfile(e, state.location.state.id)}
                      src={
                        state.location.state.photo
                          ? state.location.state.photo
                          : Images.noImg
                      }
                      alt=""
                    />
                    <p className="img-departament">
                      {state.location.state.departament}
                    </p>
                    <span>{state.location.state.fullName}</span>
                    <p className="img-position">
                      {state.location.state.position}
                    </p>
                  </a>
                  <ul>
                    {followersChart.map((follower) => {
                      return (
                        <li
                          id={follower.personId}
                          key={follower.personId}
                          onClick={(e) => goToProfile(e, follower.personId)}
                        >
                          <a href="#/">
                            <img
                              className="img-last"
                              src={
                                follower.photo ? follower.photo : Images.noImg
                              }
                              alt=""
                            />
                            <p className="img-departament-last">
                              {follower.Departament.name}
                            </p>
                            <span className="last-name">
                              {follower.firstName.split(" ")[0] +
                                " " +
                                follower.lastName.split(" ")[0]}
                            </span>
                            <p className="img-position-last">
                              {follower.position}
                            </p>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default EmployeeChart;
