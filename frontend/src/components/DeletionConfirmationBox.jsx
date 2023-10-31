import React from "react";

const DeletionConfirmationBox = () => {
  return (
    <>
      <div className="w-full absolute inline-flex justify-center items-center z-999" id="deletedConfirmation">
        <div className="flex justify-center items-center text-center my-2 px-3 border border-red-500 rounded-md bg-red-200 z-999">
          <p className="text-center inline-flex justify-center items-center">
            <span className="mx-2 text-white">
              <box-icon name="check"></box-icon>
            </span>
            Data deleted successfully.
          </p>
        </div>
      </div>
    </>
  );
};

export default DeletionConfirmationBox;
