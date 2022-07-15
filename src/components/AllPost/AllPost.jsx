import React, { useState, useEffect, useContext } from "react";
import AllPostForm from "./AllPostForm";
import { allPostApi } from "../../api/post";
import GlobalContext from "../../context/GlobalContext";

const AllPost = () => {
  const [arrayAllPost, setArrayAllPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [, , contextMiddleware] = useContext(GlobalContext);

  useEffect(() => {
    let unmounted = false;

    allPostApi()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        contextMiddleware.showSpinner(true);
        if (!unmounted) {
          setArrayAllPost((arrayAllPost) => [...arrayAllPost, ...res.posts]);
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

  const filteredArryPost = () => {
    if (search.length === 0)
      return arrayAllPost.slice(currentPage, currentPage + 8);
    const filtered = arrayAllPost.filter((post) =>
      post.title.toLowerCase().includes(search)
    );
    return filtered.slice(currentPage, currentPage + 8);
  };

  const nextPage = () => {
    if (
      arrayAllPost.filter((post) => post.title.toLowerCase().includes(search))
        .length >
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

  return (
    <>
      <AllPostForm
        filteredArryPost={filteredArryPost}
        nextPage={nextPage}
        backPage={backPage}
        onSearchChange={onSearchChange}
        search={search}
      />
    </>
  );
};

export default AllPost;
