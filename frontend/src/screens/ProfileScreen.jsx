import React from "react";
import { Image } from "react-bootstrap";
import testImage from "../assets/warehouse.png";

const ProfileScreen = () => {
  return (
    <div className="col-sm-8 col-xl-6 bg-white m-auto">
      <div className="align-items-center">
        <Image
          fluid
          src={testImage}
          className=" shadow-lg rounded-circle w-50 "
        ></Image>
      </div>
      <div>Norbu Delma</div>
    </div>
  );
};

export default ProfileScreen;
