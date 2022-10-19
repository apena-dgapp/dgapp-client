import React from "react";

const BirthdayCard = ({ employeeProfile, arrayBirthday }) => {
  return (
    <>
      <div className="birthdayToday">
        <div className="birthdayCard">
          <div className="cardFront">
            <h3 className="happy">FELICIDADES!</h3>
            <div className="balloons">
              <div className="balloonOne" />
              <div className="balloonTwo" />
              <div className="balloonThree" />
              <div className="balloonFour" />
            </div>
          </div>
          <div className="cardInside">
            <h3 className="back">CUMPLEAÑOS DE HOY</h3>
            <div className="birthday-today-cont">
              <p className="birthdayCard-cont">
                Te deseamos toda la felicidad del mundo, que nunca te falte la
                salud y el amor, y que todos tus sueños se hagan realidad. Que
                disfrutes de tu cumpleaños en grande y que no se te olvide dar
                gracias a Dios por tado lo bueno que hay en tu vida.
              </p>
            </div>
            {arrayBirthday.map((file) => {
              const day = file.birthdayDate.split("-");
              const date = file.birthdayDate;
              const day2 = new Date(date).getDate() + 1;
              const month = new Date(day).getMonth() + 1;
              const currentMonth = new Date().getMonth() + 1;
              const currentday = new Date().getDate();

              const firstN = file.firstName.split(" ");
              const lastN = file.lastName.split(" ");
              const firstNSplit = firstN[0];
              const lastNSplit = lastN[0];

              const date1 = currentMonth + "-" + currentday;
              const date2 = month + "-" + day2;

              return date1 === date2 ? (
                <div
                  key={file.personId}
                  id={file.personId}
                  onClick={employeeProfile}
                >
                  <p className="birthday-today-name">
                    &#127880; {firstNSplit + " " + lastNSplit}
                  </p>
                  <p className="birthday-today-position">{file.position}</p>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BirthdayCard;
