import React, { useState, useEffect } from "react";

const UserForm = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.selectedUser === null) {
      props.addUser({ firstName, lastName, email });
    } else {
      props.updateUser({firstName: firstName, lastName: lastName, email: email });
    }
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  const handleXButtonClick = () => {
    clearForm();
    props.visibility();
  };

  useEffect(() => {
    if(props.selectedUser) {
      setFirstName(props.selectedUser.firstName);
      setLastName(props.selectedUser.lastName);
      setEmail(props.selectedUser.email);
    } else {
      clearForm();
    }
  }, [props.selectedUser]);

  return (
    <>
      <div className="flex items-center justify-between" id="formOverlay">
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="max-w-md w-full mx-4 bg-white rounded-lg shadow-md border border-gray-300">
            <div className="flex justify-end pe-2">
              <button
                className="bg-red-500 py-2 px-4 ms-10 my-2 rounded-full text-white text-xl font-semibold transition hover:bg-red-700 active:scale-95"
                id="closeFormButton"
                onClick={handleXButtonClick}
              >
                X
              </button>
            </div>
            <form
              action=""
              className="max-w-md mx-3 my-3"
              id="myForm"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="firstName"
                >
                  First Name
                </label>
                <input
                  className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="firstName"
                  title="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="firstName"
                >
                  Last Name
                </label>
                <input
                  className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  required
                  id="lastName"
                  title="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="firstName"
                >
                  Email
                </label>
                <input
                  className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  required
                  id="email"
                  title="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 hover:scale-105 active:scale-95 transition duration-200 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:outline-shadow"
                  type="submit"
                  value="submit"
                >
                  {props.selectedUser !== null ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserForm;
