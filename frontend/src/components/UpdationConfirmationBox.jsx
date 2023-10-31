import React from "react";

const UpdationConfirmationBox = () => {
  return (
    <>
      <div class="w-full absolute inline-flex justify-center items-center z-999" id="updatedConfirmation">
        <div class="flex justify-center items-center text-center my-2 px-3 border border-green-500 rounded-md bg-green-200 z-999">
          <p class="text-center inline-flex justify-center items-center">
            <span class="mx-2 text-white">
              <box-icon name="check"></box-icon>
            </span>
            Data updated successfully.
          </p>
        </div>
      </div>
    </>
  );
};

export default UpdationConfirmationBox;
