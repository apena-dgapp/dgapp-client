import React, { useEffect, useState } from "react";
import { getFollowers } from "../../api/person";
import { useHistory } from "react-router-dom";
import Images from "../../common/images";
import { getOnePerson } from "../../api/person";

const EmployeeChart = (state) => {
  const [followersChart, setFollowersChart] = useState([]);
  const [profile, setProfile] = useState(state.location.state);
  const [reportsTo, setReportsTo] = useState("");
  const [profileChart, setProfileChart] = useState({
    id: "",
    fullName: "",
    position: "",
    departament: "",
    photo: "",
    idReportTo: "",
    fullNameReportTo: "",
    positionReportTo: "",
    departamentReportTo: "",
    photoReportTo: "",
  });

  const history = useHistory();

  useEffect(() => {
    let unmounted = false;

    getFollowers(profile.id)
      .then((res) => {
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
  }, [profile.id]);

  // useEffect(() => {
  //   let unmounted = false;
  //   if (!unmounted) {
  //     if (reportsTo && profileChart) {
  //       const firstN = profileChart.firstName.split(" ");
  //       const lastN = profileChart.lastName.split(" ");
  //       var firstNSplit = firstN[0];
  //       var lastNSplit = lastN[0];

  //       const first = reportsTo.firstName.split(" ");
  //       const last = reportsTo.lastName.split(" ");
  //       var reportsTofirstN = first[0];
  //       var reportsTolastN = last[0];
  //       // var reportsToPosition = reportsTo.position;
  //       // var reportsToPhoto = reportsTo.photo;

  //       setProfileChart({
  //         id: profileChart.personId,
  //         fullName: `${firstNSplit} ${lastNSplit}`,
  //         position: profileChart.position,
  //         departament: profileChart ? profileChart.Departament.name : null,
  //         photo: profileChart.photo,
  //         idReportTo: reportsTo ? reportsTo.personId : 0,
  //         fullNameReportTo: reportsTo
  //           ? `${reportsTofirstN} ${reportsTolastN}`
  //           : null,
  //         positionReportTo: reportsTo ? reportsTo.position : null,
  //         departamentReportTo: reportsTo ? reportsTo.Departament.name : null,
  //         photoReportTo: reportsTo ? reportsTo.photo : Images.noImg,
  //       });
  //       // setProfile(profileChart);
  //     }
  //   }
  //   return () => {
  //     unmounted = true;
  //   };
  // }, [profileChart, reportsTo]);

  const goToProfile = (e, id) => {
    if (id !== 0) {
      e.preventDefault();
      history.push({
        pathname: "./employeeprofile",
        state: id,
      });
    }
  };

  const goTochart = (e, id) => {
    //   e.preventDefault();
    //   // window.location.reload();
    setProfile({
      id: id,
    });
    getOnePerson(id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setProfileChart(res);
        getOnePerson(res.reportsTo)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            setReportsTo(res);
          })
          .catch((err) => {
            console.error(err.status);
          });
      })
      .catch((err) => {
        console.error(err.status);
      });

    // console.log(profileChart);
    // console.log(reportsTo);
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
                href={profile.idReportTo === 0 ? null : "#/"}
                onClick={(e) => goToProfile(e, profile.idReportTo)}
                className="img-first"
                // href="#/"
              >
                {profile.id === 1 ? (
                  <img src={Images.ministerio} alt="" />
                ) : (
                  <img
                    src={
                      profile.photoReportTo
                        ? profile.photoReportTo
                        : Images.noImg
                    }
                    alt=""
                  />
                )}
                {/* <img
                  src={
                    profile.photoReportTo
                      ? profile.photoReportTo
                      : Images.noImg
                  }
                  alt=""
                /> */}
                <p className="img-departament">{profile.departamentReportTo}</p>
                {profile.id === 1 ? (
                  <span>Ministerio de la Presidencia</span>
                ) : (
                  <span>{profile.fullNameReportTo}</span>
                )}

                {/* <span>{profile.fullNameReportTo}</span> */}
                <p className="img-position">{profile.positionReportTo}</p>
              </a>
              <ul>
                <li>
                  <a
                    // onClick={(e) => goToProfile(e, profile.id)}
                    // onClick={(e) => goTochart(e, profile.id)}
                    className="img-second"
                    href="#/"
                  >
                    <img
                      onClick={(e) => goToProfile(e, profile.id)}
                      src={profile.photo ? profile.photo : Images.noImg}
                      alt=""
                    />
                    <p className="img-departament">{profile.departament}</p>
                    <span>{profile.fullName}</span>
                    <p className="img-position">{profile.position}</p>
                  </a>
                  <ul>
                    {followersChart.map((follower) => {
                      return (
                        <li
                          id={follower.personId}
                          key={follower.personId}
                          // onClick={(e) => goToProfile(e, follower.personId)}
                          onClick={(e) => goTochart(e, follower.personId)}
                        >
                          <a href="#/">
                            <img
                              onClick={(e) => goToProfile(e, follower.personId)}
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
