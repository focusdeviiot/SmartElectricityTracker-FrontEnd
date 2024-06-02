import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AsyncButton from "../../../components/AsyncButton/AsyncButton";
import { IoSaveOutline } from "react-icons/io5";
import { FaKey, FaUser, FaUserTag } from "react-icons/fa";

export interface DialogAddUserProps {
  setOpenDialog: (value: null | DiglogType) => void;
}

export enum DiglogType {
  ADD = "ADD",
  EDIT = "EDIT",
}

const DialogUserForm: React.FC<DialogAddUserProps> = ({
  //   openDialog,
  setOpenDialog,
}) => {
  const schema = z.object({
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
      .refine((data) => data.length < 1 || data.length >= 5, {
        message: "Password must be at least 5 characters",
      }),
    confirm_password: z
      .string()
      .max(50, "Password must be less than 50 characters"),
    role: z.string().refine((data) => data === "USER" || data === "ADMIN", {
      message: "Role must be USER or ADMIN",
    }),
  });

  type FormFields = z.infer<typeof schema>;
  const formOptions = { resolver: zodResolver(schema) };
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormFields>(formOptions);

  const handleSave = async () => {
    const data = getValues();
    console.log(data);
    if (data.password !== data.confirm_password) {
      setError("confirm_password", {
        type: "manual",
        message: "Password and Confirm Password must be the same",
      });

      return;
    }

    reset();
    setOpenDialog(null);
  };

  const handleCancel = async () => {
    reset();
    setOpenDialog(null);
  };

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
            <label
              className={`input input-bordered flex items-center gap-2 ${
                errors.username?.message && "input-error"
              }`}
            >
              <FaUser className="w-3 h-3 opacity-70" />
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

          <div className="flex flex-col gap-1 w-72">
            <label className="flex">Name</label>
            <label
              className={`input input-bordered flex items-center gap-2 ${
                errors.name?.message && "input-error"
              }`}
            >
              <FaUserTag className="w-3 h-3 opacity-70" />
              <input {...register("name")} type="name" className="grow" />
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
                errors.role?.message && "select-error"
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
            <label
              className={`input input-bordered flex items-center gap-2 ${
                errors.password?.message && "input-error"
              }`}
            >
              <FaKey className="w-3 h-3 opacity-70" />
              <input
                {...register("password")}
                type="password"
                className="grow"
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
              Confirm password <p className="text-red-500">&nbsp;*</p>
            </label>
            <label
              className={`input input-bordered flex items-center gap-2 ${
                errors.confirm_password?.message && "input-error"
              }`}
            >
              <FaKey className="w-3 h-3 opacity-70" />
              <input
                {...register("confirm_password")}
                title="confirm_password"
                type="password"
                className="grow"
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

export default DialogUserForm;
