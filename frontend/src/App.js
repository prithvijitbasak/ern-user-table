import React, { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import axios from "axios";
import AddingConfirmationBox from "./components/AddingConfirmationBox";
import UpdationConfirmationBox from "./components/UpdationConfirmationBox";
import DeleteConfirmation from "./components/DeleteConfirmation";
import DeletionConfirmationBox from "./components/DeletionConfirmationBox";

const App = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formKey, setFormKey] = useState();
  const [addingComponentVisibility, setAddingComponentVisibility] =
    useState(false);
  const [deleteConfirmationVisibility, setDeleteConfirmationVisibility] =
    useState(false);
  const [deleteConfirmationIndex, setDeleteConfirmationIndex] = useState(null);
  const [confirmUpdation, setConfirmUpdation] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);


  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleVisibility = () => {
    setShowForm(!showForm);
    setFormKey(formKey + 1);
  };

  const handleUserClick = () => {
    setSelectedUser(null);
    toggleVisibility();
  };

  const addUser = (userData) => {
    setData([...data, userData]);
    axios
      .post("http://localhost:5000/api/data", userData)
      .then(() => {
        // fetchData();
        // setShowForm(false);
        toggleVisibility();
        setAddingComponentVisibility(true);
        setTimeout(() => {
          setAddingComponentVisibility(false);
        }, 3000);
      })

      .catch((error) => {
        console.error("Error adding data: ", error);
      });
  };

  const handleEdit = (index) => {
    setSelectedUser(data[index]);
    toggleVisibility();
  };

  const updateUser = (updatedUser) => {
    const selectedIndex = data.indexOf(selectedUser);
    if (selectedIndex !== -1) {
      const updatedUsers = [...data];
      updatedUsers[selectedIndex].key = data[selectedIndex].key;
      updatedUsers[selectedIndex].firstName = updatedUser.firstName;
      updatedUsers[selectedIndex].lastName = updatedUser.lastName;
      updatedUsers[selectedIndex].email = updatedUser.email;
      // console.log(selectedIndex);
      // console.log(updatedUsers[selectedIndex].key);
      // console.log(updatedUsers[selectedIndex].firstName);
      // console.log(updatedUsers[selectedIndex].lastName);
      // console.log(updatedUsers[selectedIndex].email);
      axios
        .post("http://localhost:5000/api/update", {
          updatedData: updatedUsers,
          editIndex: selectedIndex,
          key: data[selectedIndex].key,
        })
        .then(() => {
          setShowForm(false);
          setConfirmUpdation(true);
          setTimeout(() => {
            setConfirmUpdation(false);
          }, 3000);
        })
        .catch((error) => {
          console.error("Error updating data: ", error);
        });
    } else {
      console.error("Selected user not found in data.");
    }
    toggleVisibility();
  };

  const handleDelete = () => {
    axios
      .post(`http://localhost:5000/api/delete`, {
        index: deleteConfirmationIndex,
      })
      .then(() => {
        fetchData();
        setDeleteConfirmationVisibility(false);
        setConfirmDeletion(true);
        setTimeout(() => {
          setConfirmDeletion(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error deleting data: ", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {showForm && (
        <UserForm
          key={formKey}
          visibility={toggleVisibility}
          addUser={addUser}
          selectedUser={selectedUser}
          updateUser={updateUser}
        />
      )}
      {addingComponentVisibility && <AddingConfirmationBox />}
      {confirmUpdation && <UpdationConfirmationBox />}
      {deleteConfirmationVisibility && (
        <DeleteConfirmation
          deleteRow={handleDelete}
          cancelDeletion={() => {
            setDeleteConfirmationVisibility(false);
          }}
        />
      )}
      {confirmDeletion && <DeletionConfirmationBox />}
      <div className="mx-auto px-4 py-8">
        <div className="flex items-center justify-between py-2">
          <h1 className="text-xl font-bold mb-2">User Information</h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white py-2 px-4 my-2 rounded-md flex items-center transition duration-200 active:scale-95"
            onClick={handleUserClick}
          >
            <span className="mr-1">+</span>Add User
          </button>
        </div>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full rounded shadow">
            <table className="min-w-full">
              <thead className="bg-gray-200 border-b-2 border-gray-200">
                <tr>
                  <th className="py-2 text-sm font-semibold tracking-wide text-center border border-gray-300">
                    User ID
                  </th>
                  <th className="py-2 text-sm font-semibold tracking-wide text-center border border-gray-300">
                    First Name
                  </th>
                  <th className="py-2 text-sm font-semibold tracking-wide text-center border border-gray-300">
                    Last Name
                  </th>
                  <th className="py-2 text-sm font-semibold tracking-wide text-center border border-gray-300">
                    Email
                  </th>
                  <th className="py-2 text-sm font-semibold tracking-wide text-center border border-gray-300">
                    Edit
                  </th>
                  <th className="py-2 text-sm font-semibold tracking-wide text-center border border-gray-300">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody id="tableBody">
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center border px-4 py-2">{item.key}</td>
                    <td className="text-center border px-4 py-2">
                      {item.firstName}
                    </td>
                    <td className="text-center border px-4 py-2">
                      {item.lastName}
                    </td>
                    <td className="text-center border px-4 py-2">
                      {item.email}
                    </td>
                    <td className="text-center border px-4 py-2">
                      <button
                        className="rounded bg-green-500 px-3 transition duration-300 hover:scale-110 active:scale-90 uppercase"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="text-center border px-4 py-2">
                      <button
                        className="rounded bg-red-500 px-3 transition duration-300 hover:scale-110 active:scale-90 uppercase"
                        onClick={() => {
                          setDeleteConfirmationIndex(index);
                          setDeleteConfirmationVisibility(true);
                          // console.log(deleteConfirmationIndex);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
