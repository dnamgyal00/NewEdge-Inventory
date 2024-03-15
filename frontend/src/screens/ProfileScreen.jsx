import React from "react";
import { Image } from "react-bootstrap";
import testImage from "../assets/warehouse.png";
import { useAuth } from "react-oidc-context";

const ProfileScreen = () => {
  const auth = useAuth();

  const { user } = auth;
  return (
    <div className="col-sm-8 col-xl-6 bg-white m-auto py-3">
      <div className="d-flex justify-content-center">
        <Image
          fluid
          src={testImage}
          className=" shadow-lg rounded-circle w-50 "
        ></Image>
      </div>
      <div className="d-flex flex-column align-items-center pt-4">
        {/* <h6>Inventory Manager</h6> */}
        <h6>Name: {user.profile.name}</h6>
        <h6>Email: {user.profile.email}</h6>

        {/* <p>Admin</p> */}
      </div>
    </div>
  );
};

export default ProfileScreen;
