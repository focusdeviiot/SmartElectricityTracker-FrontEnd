import React, { useEffect, useState } from "react";
import TableCustom, {
  ColumnsTableCustom,
  OptionTableCustom,
} from "../../components/TableCustom";
import { INIT_PAGINATE, PAGINATE } from "../../models/pagination";
import AsyncButton from "../../components/AsyncButton/AsyncButton";
import { AiOutlineUserAdd } from "react-icons/ai";
// import { FaSearchengin, FaTrashCan } from "react-icons/fa6";
import { IoSaveOutline } from "react-icons/io5";
import { FaKey, FaUser, FaUserTag, FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { set } from "date-fns";

enum DiglogType {
  ADD = "ADD",
  EDIT = "EDIT",
}

const UsersPage: React.FC<any> = () => {
  const [openDialog, setOpenDialog] = useState<null | DiglogType>(null);
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
        .min(5, "Username must be at least 5 characters")
        .max(50, "Username must be less than 50 characters"),
      name: z.string().max(50, "Name must be less than 50 characters"),
      password: z
        .string()
        // .min(5, "Password must be at least 5 characters")
        .max(50, "Password must be less than 50 characters")
        .refine((data) => data.length >= 1 && data.length <= 5, {
          message: "Password must be at least 5 characters",
        }),
      confirm_password: z
        .string()
        .max(50, "Password must be less than 50 characters")
        .refine((data) => data === getValues().password, {
          message: "Password and Confirm Password must be the same",
        }),
      role: z.string().refine((data) => data === "USER" || data === "ADMIN", {
        message: "Role must be USER or ADMIN",
      }),
    })
    .required();

  type FormFields = z.infer<typeof schema>;
  const formOptions = { resolver: zodResolver(schema) };
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormFields>(formOptions);

  const actionTable = (row: any, field: string) => {
    return (
      <div key={field} className="flex justify-center gap-2">
        <AsyncButton
          className="mb-1 btn-outline border-none shadow-none hover:bg-gray-500"
          title="Edit"
          type="button"
          onClick={() => Promise.resolve(console.log("Edit", row))}
        >
          <FaRegEdit className="w-6 h-6"/>
        </AsyncButton>
        <AsyncButton
          className="btn-error btn-outline border-none shadow-none text-base-100 hover:bg-base-300"
          title="Delete"
          type="button"
          onClick={() => Promise.resolve(console.log("Delete", row))}
        >
          <MdDeleteForever className="w-6 h-6"/>
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
      title: "Action",
      field: "action",
      columns: {
        className: "w-40 text-center",
      },
      rows: {
        className: "w-40 text-center whitespace-nowrap",
        rowRender: actionTable,
      },
    },
  ];

  const handlePageNumber = async (page: PAGINATE) => {
    console.log(page);
    setPaginate(page);
    // setSearchBK((prev) => ({ ...prev, pageable: page }));
  };

  const handleAddUser = async () => {
    setOpenDialog(DiglogType.ADD);
  };

  const handleSave = async () => {
    reset();
    setOpenDialog(null);
    console.log(getValues());
  };

  const handleCancel = async () => {
    reset();
    setOpenDialog(null);
  };

  useEffect(() => {
    const data = Array.from({ length: 10 }, (v, i) => {
      return {
        no: i + 1,
        username: `user_${i + 1}`,
        name: `Name ${i + 1}`,
        role: "USER",
      };
    });
    setDataTable(data);
    setPaginate((prev) => ({ ...prev, totalElements: 100 }));
  }, []);

  const DialogAddUser = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-base-200 bg-opacity-30 backdrop-blur-sm"></div>
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Add User</h3>
          <form
            onSubmit={handleSubmit(handleSave)}
            onReset={handleCancel}
            className="flex flex-col items-center gap-2 mt-4"
          >
            <div className="flex flex-col gap-1 w-72">
              <label className="flex">
                Username
                <p className="text-red-500">&nbsp;*</p>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <FaUser className="w-3 h-3 opacity-70" />
                <input
                  {...register("username")}
                  type="username"
                  className={`grow ${
                    errors.username?.message && "border-red-500"
                  }`}
                />
              </label>
              {errors.username?.message && (
                <p className="text-xs text-red-500 ml-1 mt-1">
                  {errors.username?.message.toString()}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 w-72">
              <label className="flex">Name</label>
              <label className="input input-bordered flex items-center gap-2">
                <FaUserTag className="w-3 h-3 opacity-70" />
                <input
                  {...register("name")}
                  type="name"
                  className={`grow ${errors.name?.message && "border-red-500"}`}
                />
              </label>
              {errors.name?.message && (
                <p className="text-xs text-red-500 ml-1 mt-1">
                  {errors.name?.message.toString()}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 w-72">
              <label className="flex">
                Role<p className="text-red-500">&nbsp;*</p>
              </label>
              <select
                {...register("role")}
                className={`select select-bordered w-full max-w-xs ${
                  errors.role?.message && "border-red-500"
                }`}
                title="Select Role"
              >
                <option disabled selected>
                  Select Role
                </option>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              {errors.role?.message && (
                <p className="text-xs text-red-500 ml-1 mt-1">
                  {errors.role?.message.toString()}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 w-72">
              <label className="flex">
                Password <p className="text-red-500">&nbsp;*</p>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <FaKey className="w-3 h-3 opacity-70" />
                <input
                  {...register("password")}
                  type="password"
                  className={`grow ${
                    errors.password?.message && "border-red-500"
                  }`}
                />
              </label>
              {errors.password?.message && (
                <p className="text-xs text-red-500 ml-1 mt-1">
                  {errors.password?.message.toString()}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 w-72">
              <label className="flex">
                Confirm Password <p className="text-red-500">&nbsp;*</p>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <FaKey className="w-3 h-3 opacity-70" />
                <input
                  {...register("confirm_password")}
                  type="confirm_password"
                  className={`grow ${
                    errors.password?.confirm_password && "border-red-500"
                  }`}
                />
              </label>
              {errors.confirm_password?.message && (
                <p className="text-xs text-red-500 ml-1 mt-1">
                  {errors.confirm_password?.message.toString()}
                </p>
              )}
            </div>

            <div className="modal-action w-full">
              <AsyncButton
                className="mb-1 bg-gray-400 border-none shadow-none hover:bg-gray-500 w-28"
                title="Clear"
                type="reset"
                // loading={loading}
              >
                Cancel
              </AsyncButton>
              <AsyncButton
                className="mb-1 w-28"
                title="Search"
                type="submit"
                // loading={loading}
              >
                <IoSaveOutline className="h-4 w-4" /> Save
              </AsyncButton>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center">User Management</h2>
      <p className="text-center text-gray-400">Manage your users</p>

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

      {openDialog && <DialogAddUser />}
    </>
  );
};

export default UsersPage;
