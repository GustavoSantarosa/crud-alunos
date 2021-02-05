import React from "react";

const LogoutButton = () => {
  return (
    <button
      id="buttonLogout"
      type="submit"
      className="btn btn-info"
      onClick={() => window.location.replace("/login")}
    >
      Sair
    </button>
  );
};

export default LogoutButton;
