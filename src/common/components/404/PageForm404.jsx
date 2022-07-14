import React from "react";
import { FormattedMessage } from "react-intl";
import { BsEmojiFrown } from "react-icons/bs";

const PageForm404 = () => {
  return (
    <>
      <div className="container-page404">
        <i className="bs bs-emojifrown" />
        <BsEmojiFrown size="10rem" color="#787A91" />
        <p className="title-page404">
          <FormattedMessage id={"page404.title"} defaultMessage={"404"} />
        </p>
        <p className="subtitle-page404">
          <FormattedMessage
            id={"page404.subtitle"}
            defaultMessage={"Page not found!"}
          />
        </p>
      </div>
    </>
  );
};

export default PageForm404;
