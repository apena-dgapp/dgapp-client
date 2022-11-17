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
          <div className="window-birthday">
            <div className="birthdayModal-text-content" onClick={modalToggle}>
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
