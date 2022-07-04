import React, { useState, useEffect } from "react";
import AllPostForm from "./AllPostForm";
import { allPostApi } from "../../api/post";

const AllPost = () => {
  const [arrayAllPost, setArrayAllPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let unmounted = false;

    allPostApi()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setArrayAllPost((arrayAllPost) => [...arrayAllPost, ...res.posts]);
        }
      })
      .catch((err) => {
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
