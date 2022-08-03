import React, { useState, useEffect, useContext } from "react";
import AllPostForm from "./AllPostForm";
import { allPostApi } from "../../api/post";
import GlobalContext from "../../context/GlobalContext";

const AllPost = () => {
  const [arrayAllPost, setArrayAllPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [, , contextMiddleware] = useContext(GlobalContext);
  const [page, setPage] = useState(8);
  const [pageLength, setPageLength] = useState("");

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
          setPageLength(res.posts.length);
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
    setPageLength(filtered.length);
    return filtered.slice(currentPage, currentPage + 8);
  };

  const nextPage = () => {
    setPage(page + 8);
    if (
      arrayAllPost.filter((post) => post.title.toLowerCase().includes(search))
        .length >
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
    if (e.target.value === "") {
      setPageLength(arrayAllPost.length);
    }
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
        page={page}
        pageLength={pageLength}
      />
    </>
  );
};

export default AllPost;
