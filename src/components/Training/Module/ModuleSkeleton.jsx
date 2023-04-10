import React from "react";

export const NavbarSkeleton = () => {
  return (
    <div className="skeleton-navbar">
      <div className="title skeleton"></div>
    </div>
  );
};

export const ContentModuleSkeleton = () => {
  return <div className="skeleton-content-module skeleton"></div>;
};

export const DescriptionSkeleton = () => {
  return (
    <div className="skeleton-module-left-side">
      <div className="skeleton-content-profile">
        <div className="format">
          <div className="profile-image skeleton"></div>
          <div className="profile-text">
            <div className="title skeleton"></div>
            <div className="paragraph skeleton"></div>
            <div className="paragraph skeleton"></div>
            <div className="paragraph skeleton"></div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};
export const CourseSkeleton = () => {
  return (
    <div className="skeleton-module-left-side">
      <div className="skeleton-info-course">
        <div className="about-course">
          <div className="title skeleton"></div>
          <div className="paragraph skeleton"></div>
          <div className="paragraph skeleton"></div>
          <div className="paragraph skeleton"></div>
          <div className="paragraph skeleton"></div>
          <div className="paragraph skeleton"></div>
        </div>
        <div className="multiple">
          <div className="paragraph skeleton"></div>
          <div className="paragraph skeleton"></div>
          <div className="paragraph skeleton"></div>
          <div className="paragraph skeleton"></div>
        </div>
      </div>
    </div>
  );
};

export const SectionSkeleton = () => {
  return (
    <div className="skeleton-section">
      <div className="title skeleton"></div>
      <div className="paragrahp skeleton"></div>
    </div>
  );
};

export const ElementSkeleton = () => {
  return (
    <div className="skeleton-element">
      <div className="title skeleton"></div>
      <div className="paragrahp skeleton"></div>
    </div>
  );
};
