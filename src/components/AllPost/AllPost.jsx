import React, { useState, useEffect } from "react";
import AllPostForm from "./AllPostForm";
import { getPost } from "../../api/post";
import ClipLoader from "react-spinners/ClipLoader";

const AllPost = () => {
  const [arrayAllPost, setArrayAllPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
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

    getPost(["Noticia", "Portada Principal"])
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setArrayAllPost((arrayAllPost) => [...arrayAllPost, ...res.posts]);
          setPageLength(res.posts.length);
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
      {loading ? (
        <div className="spinner-container">
          <ClipLoader color="#113250" loading={loading} size={150} />
        </div>
      ) : (
        <AllPostForm
          filteredArryPost={filteredArryPost}
          nextPage={nextPage}
          backPage={backPage}
          onSearchChange={onSearchChange}
          search={search}
          page={page}
          pageLength={pageLength}
        />
      )}
    </>
  );
};

export default AllPost;
