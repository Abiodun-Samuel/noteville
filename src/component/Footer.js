import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <p className="text-center">Copyright ⓒ {year} Abiodun Samuel</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
