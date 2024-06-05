import AsyncButton from "../../../components/AsyncButton/AsyncButton";
import { IoSaveOutline } from "react-icons/io5";
// import { FaKey, FaUser, FaUserTag } from "react-icons/fa";
import { useEffect, useState } from "react";
import { DeviceID } from "../../../models/device";
import { updateUserDevice } from "../../../api/api";
import { useAlert } from "../../../contexts/AlertContext";

export interface DialogUserDeviceList {
  user_id: string;
  device_id?: string[];
}

export interface OpenDialogDataDevice extends DialogUserDeviceList {
  username: string;
}

export interface DialogSetDeviceProps {
  openDialog: null | OpenDialogDataDevice;
  setOpenDialog: (value: null | OpenDialogDataDevice) => void;
}

const DialogSetDevice: React.FC<DialogSetDeviceProps> = ({
  openDialog,
  setOpenDialog,
}) => {
  const { showAlert } = useAlert();
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
    if (!openDialog?.user_id) return;

    const device_id: string[] = [];
    if (device01) device_id.push(DeviceID.DEVICE1);
    if (device02) device_id.push(DeviceID.DEVICE2);
    if (device03) device_id.push(DeviceID.DEVICE3);

    const dataUpdate: DialogUserDeviceList = {
      user_id: openDialog?.user_id ?? "",
      device_id,
    };

    try {
      const response = await updateUserDevice(dataUpdate);
      if (response?.success === true) {
        showAlert("Device updated successfully", "success");
        setOpenDialog(null);
      }
    } catch (error: any) {
      console.error(error);
      showAlert(`Failed to update device ${error?.response.data.message}`, "error");
    }
  };

  const handleCancel = async () => {
    setOpenDialog(null);
  };

  useEffect(() => {
    if (openDialog?.device_id) {
      setDevice01(openDialog?.device_id.includes(DeviceID.DEVICE1));
      setDevice02(openDialog?.device_id.includes(DeviceID.DEVICE2));
      setDevice03(openDialog?.device_id.includes(DeviceID.DEVICE3));
    } else {
      setDevice01(false);
      setDevice02(false);
      setDevice03(false);
    }

    return () => {
      setDevice01(false);
      setDevice02(false);
      setDevice03(false);
    };
  }, [openDialog]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-base-200 bg-opacity-30 backdrop-blur-sm"></div>
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Setting Device</h3>
        <p className="flex justify-center text-gray-400">
          Setting devices for username :
          <p className="font-bold text-gray-300">
            &nbsp;{openDialog?.username}
          </p>
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

export default DialogSetDevice;
