import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PiSmileySad } from "react-icons/pi";

export class Error404 extends Component {
  render() {
    return (
      <div>
        <div className="d-flex align-items-center justify-content-center text-center error-page pt-5 pb-4 h-100">
          <div className="row flex-grow">
            <div>
              <div className="row align-items-center d-flex flex-column">
                <div>
                  <h1 className="display-1 mt-5" style={{ fontSize: "7rem" }}>
                    4<PiSmileySad className="mb-2" />4
                  </h1>
                </div>
                <div>
                  <h4>SORRY!</h4>
                  <h6 className="font-weight-light mx-auto">
                    The page you’re looking for was not found.
                  </h6>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-12 text-center mt-xl-2">
                  <Link className="text-dark font-weight-medium" to="/">
                    Back to home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Error404;
