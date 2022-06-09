import React from "react";
import Portal from "../../../utils/Portal";
import BirthdayCard from "../Birthday/BirthdayCard";

const ModalBirthday = ({
  children,
  modalToggle,
  modalActive,
  arrayBirthday,
  employeeProfile,
}) => {
  return (
    <Portal>
      {modalActive && (
        <div className="wrapper-birthday">
          <div className="window-birthday" onClick={modalToggle}>
            <div className="birthdayModal-text-content">
              <BirthdayCard
                arrayBirthday={arrayBirthday}
                modalToggle={modalToggle}
                employeeProfile={employeeProfile}
              />
            </div>
            <div>{children}</div>
          </div>
          <div className="background-birthday"></div>
        </div>
      )}
    </Portal>
  );
};

export default ModalBirthday;
