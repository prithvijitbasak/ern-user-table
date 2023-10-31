import React from "react";

const DeleteConfirmation = (props) => {
  return (
    <>
      <div
        className="flex items-center justify-between"
        id="deleteConfirmation"
      >
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="max-w-md w-full mx-4 py-4 bg-white rounded-lg shadow-md border border-gray-300">
            <p className="text-center font-bold">
              The record will be deleted permanently !!!
            </p>
            <p className="text-center font-bold">
              Are you sure you want to delete ???
            </p>
            <div className="flex justify-end mt-6">
              <button
                className="bg-green-500 border rounded-md px-3 py-1 me-4 transition hover:bg-green-600 hover:scale-105 active:scale-95 text-center font-semibold"
                id="deleteNoButton"
                onClick={props.cancelDeletion}
              >
                NO
              </button>
              <button
                className="bg-red-500 border rounded-md px-3 py-1 me-4 transition hover:bg-red-600 hover:scale-105 active:scale-95 text-center font-semibold"
                id="deleteYesButton"
                onClick={props.deleteRow}
              >
                YES
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmation;
