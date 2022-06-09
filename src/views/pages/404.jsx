import React, { Component, lazy } from "react";
import { ReactComponent as IconAlertTriangleFill } from "bootstrap-icons/icons/exclamation-triangle-fill.svg";

class NotFoundView extends Component {
  constructor(props) {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="container text-center p-5">
        <div className="display-1">
          <IconAlertTriangleFill className="i-va text-warning" />
          404
        </div>
        <h1 className="mb-3">Oops... Page Not Found!</h1>
        <div className="row justify-content-md-center"></div>
      </div>
    );
  }
}

export default NotFoundView;
