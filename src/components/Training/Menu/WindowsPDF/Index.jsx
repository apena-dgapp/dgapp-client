import React from "react";
import "./Index.scss";
import { Document, Page } from "react-pdf";

const Index = (props) => {
  return (
    <section className="windowspdf-section">
      <div
        className="windowspdf-background"
        onClick={() => {
          props.setShow({ ...props.show, profile: false });
        }}
      ></div>
      <div className="container">
        <iframe id="pdf1" src={props.data[0].content} />
      </div>
    </section>
  );
};

export default Index;
