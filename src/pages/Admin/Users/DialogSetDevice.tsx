import AsyncButton from "../../../components/AsyncButton/AsyncButton";
import { IoSaveOutline } from "react-icons/io5";
// import { FaKey, FaUser, FaUserTag } from "react-icons/fa";
import { useState } from "react";

export interface DialogAddUserProps {
  openDialog: null | string;
  setOpenDialog: (value: null | string) => void;
}

const DialogUserForm: React.FC<DialogAddUserProps> = ({
  openDialog,
  setOpenDialog,
}) => {
  const [device01, setDevice01] = useState(false);
  const [device02, setDevice02] = useState(false);
  const [device03, setDevice03] = useState(false);

  const handleDevice01Change = (event) => {
    setDevice01(event.target.checked);
  };

  const handleDevice02Change = (event) => {
    setDevice02(event.target.checked);
  };

  const handleDevice03Change = (event) => {
    setDevice03(event.target.checked);
  };

  const handleSave = async () => {
    setOpenDialog(null);
  };

  const handleCancel = async () => {
    setOpenDialog(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-base-200 bg-opacity-30 backdrop-blur-sm"></div>
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Setting Device</h3>
        <p className="flex justify-center text-gray-400">
          Setting devices for username :{" "}
          <p className="font-bold text-gray-300">&nbsp;{openDialog}</p>
        </p>

        <div className="m-4 flex flex-col items-center">
          <div className="form-control w-52">
            <label className="cursor-pointer label">
              <span className="label-text">DEVICE-01</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={device01}
                onChange={handleDevice01Change}
              />
            </label>
          </div>
          <div className="form-control w-52">
            <label className="cursor-pointer label">
              <span className="label-text">DEVICE-02</span>
              <input
                type="checkbox"
                className="toggle toggle-secondary"
                checked={device02}
                onChange={handleDevice02Change}
              />
            </label>
          </div>
          <div className="form-control w-52">
            <label className="cursor-pointer label">
              <span className="label-text">DEVICE-03</span>
              <input
                type="checkbox"
                className="toggle toggle-accent"
                checked={device03}
                onChange={handleDevice03Change}
              />
            </label>
          </div>
        </div>

        <div className="modal-action w-full">
          <AsyncButton
            className="mb-1 bg-gray-400 border-none shadow-none hover:bg-gray-500 w-28"
            title="Clear"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </AsyncButton>
          <AsyncButton
            className="mb-1 w-28"
            title="Search"
            type="button"
            onClick={handleSave}
          >
            <IoSaveOutline className="h-4 w-4" /> Save
          </AsyncButton>
        </div>
      </div>
    </div>
  );
};

export default DialogUserForm;
