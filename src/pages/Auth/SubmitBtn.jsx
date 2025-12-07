import React from "react";
import useAuth from "../../hooks/useAuth";

const SubmitBtn = ({ txt }) => {
    // console.log('clicked')
  const { loading } = useAuth();
  return (
    <button className="btn btn-secondary mt-5">
      {loading ? (
        <span className="loading loading-bars loading-xl"></span>
      ) : (
        txt
      )}
    </button>
  );
};

export default SubmitBtn;
