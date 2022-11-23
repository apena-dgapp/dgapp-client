import React from "react";
import { GoMegaphone } from "react-icons/go";
import Card from "../../common/components/Card/Card";
import Input from "../../common/components/Input/Input";

const AllPostForm = ({
  filteredArryPost,
  nextPage,
  backPage,
  onSearchChange,
  search,
  page,
  pageLength,
}) => {
  return (
    <>
      <div className="allPostTitle-cont">
        <div className="allPostTitle">
          <span>
            <i className="go go-megaphone" />
            <GoMegaphone
              size="3rem"
              color="#79ADD4"
              style={{ transform: "rotate(-10deg)", marginBottom: "0.5rem" }}
            />
          </span>
          <p>
            NOTICIAS
          </p>
        </div>
      </div>

      <div className="allpost-input-cont">
        <div className="allpost-input">
          <Input
            id="search"
            name="searchpost"
            type="text"
            placeholder="Buscar noticias..."
            classInput="allpost-input-search"
            value={search}
            onChange={onSearchChange}
          />
        </div>
      </div>

      <div className="allPost-Container">
        <div className="grid-container">
          {filteredArryPost().map((post) => {
            return (
              <Card
                key={post.postId}
                id={post.postId}
                title={post.title}
                img={post.image}
                createdby={post.createdBy}
                description={post.description}
                date={post.createdAt}
                author={post.author}
              />
            );
          })}
        </div>
      </div>

      <div className="allpost-btn-cont">
        <div className="allpost-btns">
          <button
            onClick={backPage}
            className={page === 0 || page === 8 ? "btn-disabled" : "btn-back"}
            name="btn-back"
            type="submit"
            disabled={page === 0 || page === 8 ? true : false}
          >
            Anterior
          </button>
          <button
            onClick={nextPage}
            className={page < pageLength ? "btn-next" : "btn-disabled"}
            name="btn-next"
            type="submit"
            disabled={page < pageLength ? false : true}
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default AllPostForm;
