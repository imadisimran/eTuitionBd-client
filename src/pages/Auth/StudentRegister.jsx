import React from "react";

const StudentRegister = () => {
  return (
    <div>
      <form>
        <fieldset className="fieldset">
          <label className="label">First Name</label>
          <input type="text" className="input" placeholder="First Name" />
          <label className="label">Last Name</label>
          <input type="text" className="input" placeholder="Last Name" />
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" />
          <label className="label">Confirm Password</label>
          <input
            type="password"
            className="input"
            placeholder="Enter Password Again"
          />
          <input
            type="submit"
            value="Register"
            className="btn btn-secondary mt-5"
          />
        </fieldset>
      </form>
    </div>
  );
};

export default StudentRegister;
