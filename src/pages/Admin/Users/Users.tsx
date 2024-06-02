import React, { useEffect, useState } from "react";
import TableCustom, {
  ColumnsTableCustom,
  OptionTableCustom,
} from "../../../components/TableCustom";
import { INIT_PAGINATE, PAGINATE } from "../../../models/pagination";
import AsyncButton from "../../../components/AsyncButton/AsyncButton";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever, MdDeviceHub } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { faker } from "@faker-js/faker";
import { FaSearchengin, FaTrashCan } from "react-icons/fa6";
import DialogUserForm, { DiglogType } from "./DialogUserForm";
import DialogSetDevice from "./DialogSetDevice";
import { DeviceID } from "../../../models/device";
import { getUsersCountDevice } from "../../../api/api";
import { previousDay } from "date-fns/fp";

const UsersPage: React.FC<any> = () => {
  const [openDialog, setOpenDialog] = useState<null | DiglogType>(null);
  const [openDialogDevice, setOpenDialogDevice] = useState<null | string>(null);
  const [dataTable, setDataTable] = useState<any>([]);
  const [paginate, setPaginate] = useState<PAGINATE>(() => INIT_PAGINATE);
  const optionTableCustom: OptionTableCustom = {
    placeholder: "ไม่พบข้อมูล",
  };

  const schema = z
    .object({
      username: z
        .string()
        .regex(/^[a-zA-Z0-9]*$/, "Username must be alphanumeric")
        .max(50, "Username must be less than 50 characters"),
      name: z.string().max(50, "Name must be less than 50 characters"),
      role: z.string(),
      device_id: z.string(),
    })
    .required();

  type FormFields = z.infer<typeof schema>;
  const formOptions = { resolver: zodResolver(schema) };
  const defaultValues: FormFields = {
    username: "",
    name: "",
    role: "*",
    device_id: "*",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>({ ...formOptions, defaultValues });

  const [searchBK, setSearchBK] = useState<FormFields>(defaultValues); // search backup

  const numberOfDevices = (row: any, field: string) => {
    return (
      <AsyncButton
        key={field}
        className="btn btn-sm bg-slate-800 border-none shadow-none"
        type="button"
        onClick={() => Promise.resolve(setOpenDialogDevice(row["username"]))}
      >
        <div className="badge bg-base-300 text-primary font-bold">
          {row[field]}
        </div>
        <MdDeviceHub className="w-6 h-6 text-primary" />
      </AsyncButton>
    );
  };

  const actionTable = (row: any, field: string) => {
    return (
      <div key={field} className="flex justify-center gap-2">
        <AsyncButton
          className="mb-1 btn-outline border-none shadow-none hover:bg-gray-500"
          title="Edit"
          type="button"
          onClick={() => Promise.resolve(console.log("Edit", row))}
        >
          <FaRegEdit className="w-6 h-6" />
        </AsyncButton>
        <AsyncButton
          className="btn-error btn-outline border-none shadow-none text-base-100 hover:bg-base-300"
          title="Delete"
          type="button"
          onClick={() => Promise.resolve(console.log("Delete", row))}
        >
          <MdDeleteForever className="w-6 h-6" />
        </AsyncButton>
      </div>
    );
  };

  const columnsTableCustom: ColumnsTableCustom[] = [
    {
      title: "No.",
      field: "no",
      columns: {
        className: "text-center",
      },
      rows: {
        className: "text-center whitespace-nowrap",
      },
    },
    {
      title: "Username",
      field: "username",
      columns: {
        className: "text-left",
      },
      rows: {
        className: "text-left whitespace-nowrap",
      },
    },
    {
      title: "Name",
      field: "name",
      columns: {
        className: "text-left",
      },
      rows: {
        className: "text-left whitespace-nowrap",
      },
    },
    {
      title: "Role",
      field: "role",
      columns: {
        className: "text-left",
      },
      rows: {
        className: "text-left whitespace-nowrap",
      },
    },
    {
      title: "Number of Devices",
      field: "device_count",
      columns: {
        className: "w-32 text-center",
      },
      rows: {
        className: "w-32 text-center whitespace-nowrap",
        rowRender: numberOfDevices,
      },
    },
    {
      title: "Action",
      field: "action",
      columns: {
        className: "w-32 text-center",
      },
      rows: {
        className: "w-32 text-center whitespace-nowrap",
        rowRender: actionTable,
      },
    },
  ];

  const getSearch = async (data: any) => {
    console.log(data);
    try {
      const setData = { ...data, pageable: paginate };
      const resp = await getUsersCountDevice(setData);
      if (resp.success === false) return console.log(resp.message);
      const respDataList = resp.data.data_list;
      const respDataPageable = resp.data.pageable as PAGINATE;
      if (!respDataList) {
        setDataTable([]);
        setPaginate(INIT_PAGINATE);
      }
      const dataTable = respDataList.map((item: any, index: number) => ({
        ...item,
        no: respDataPageable.pageNumber * respDataPageable.pageSize + index + 1,
      }));
      setDataTable(dataTable);
      setPaginate(respDataPageable);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageNumber = async (page: PAGINATE) => {
    setSearchBK((prev) => ({ ...prev, pageable: page }));
  };

  const handleAddUser = async () => {
    setOpenDialog(DiglogType.ADD);
  };

  const handleOnSearch = async (data: FormFields) => {
    setSearchBK(data);
    console.log(data);
  };

  const handleOnClear = async () => {
    reset();
    setSearchBK(defaultValues);
  };

  useEffect(() => {
    getSearch(searchBK);
  }, [searchBK]);

  return (
    <>
      <h2 className="text-2xl font-bold text-center">User Management</h2>
      <p className="text-center text-gray-400">Manage your users</p>

      <form
        onSubmit={handleSubmit(handleOnSearch)}
        onReset={handleOnClear}
        className=""
      >
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex flex-col gap-1 w-52">
            <label className="flex">Username</label>
            <label
              className={`input input-bordered input-sm flex items-center gap-2 ${
                errors.username?.message && "input-error"
              }`}
            >
              <input
                {...register("username")}
                type="username"
                className="grow"
              />
            </label>
            {errors.username?.message && (
              <p className="text-xs text-red-500 ml-1 mt-1">
                {errors.username?.message.toString()}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 w-52">
            <label className="flex">Name</label>
            <label
              className={`input input-bordered input-sm flex items-center gap-2 ${
                errors.name?.message && "input-error"
              }`}
            >
              <input {...register("name")} type="name" className="grow" />
            </label>
            {errors.name?.message && (
              <p className="text-xs text-red-500 ml-1 mt-1">
                {errors.name?.message.toString()}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 w-52">
            <label className="flex">Role</label>
            <select
              {...register("role")}
              className={`select select-bordered select-sm w-full max-w-xs text-sm ${
                errors.role?.message && "select-error"
              }`}
              title="Select Role"
            >
              <option value="*">All Role</option>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
            {errors.role?.message && (
              <p className="text-xs text-red-500 ml-1 mt-1">
                {errors.role?.message.toString()}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 w-52">
            <label className="flex">Device ID</label>
            <select
              {...register("device_id")}
              className={`select select-bordered select-sm w-full max-w-xs text-sm ${
                errors.device_id?.message && "select-error"
              }`}
              title="Select Role"
            >
              <option value="*">All Device ID</option>
              {Object.values(DeviceID).map((device) => (
                <option key={device} value={device}>
                  {device}
                </option>
              ))}
            </select>
            {errors.device_id?.message && (
              <p className="text-xs text-red-500 ml-1 mt-1">
                {errors.device_id?.message.toString()}
              </p>
            )}
          </div>
        </div>

        <div className="m-4 flex justify-center gap-3">
          <AsyncButton
            className="mb-1 bg-gray-400 border-none shadow-none hover:bg-gray-500"
            title="Clear"
            type="reset"
            // loading={loading}
          >
            <FaTrashCan className="h-4 w-4" /> Clear
          </AsyncButton>
          <AsyncButton
            className="mb-1"
            title="Search"
            type="submit"
            // loading={loading}
          >
            <FaSearchengin className="h-4 w-4" /> Search
          </AsyncButton>
        </div>
      </form>

      <div className="mt-10 mb-2 flex justify-end">
        <AsyncButton title="Login" type="button" onClick={handleAddUser}>
          <AiOutlineUserAdd className="h-4 w-4" /> Add User
        </AsyncButton>
      </div>

      <TableCustom
        columns={columnsTableCustom}
        data={dataTable}
        option={optionTableCustom}
        paging={paginate}
        onChange={(page: any) => handlePageNumber(page)}
      />

      {openDialog && <DialogUserForm setOpenDialog={setOpenDialog} />}
      {openDialogDevice && (
        <DialogSetDevice
          setOpenDialog={setOpenDialogDevice}
          openDialog={openDialogDevice}
        />
      )}
    </>
  );
};

export default UsersPage;
