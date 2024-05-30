import { useState } from "react";
import TableCustom, {
  ColumnsTableCustom,
  OptionTableCustom,
} from "../../components/TableCustom";
import { INIT_PAGINATE, PAGINATE } from "../../models/pagination";
import AsyncButton from "../../components/AsyncButton/AsyncButton";
import { AiOutlineUserAdd } from "react-icons/ai";

const UsersPage: React.FC = () => {
  const [dataTable, setDataTable] = useState<any>([]);
  const [paginate, setPaginate] = useState<PAGINATE>(() => INIT_PAGINATE);
  const optionTableCustom: OptionTableCustom = {
    placeholder: "ไม่พบข้อมูล",
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
      field: "doc_id",
      columns: {
        className: "text-left",
      },
      rows: {
        className: "text-left whitespace-nowrap",
      },
    },
    {
      title: "Name",
      field: "doc_id",
      columns: {
        className: "text-left",
      },
      rows: {
        className: "text-left whitespace-nowrap",
      },
    },
    {
      title: "Role",
      field: "doc_id",
      columns: {
        className: "text-left",
      },
      rows: {
        className: "text-left whitespace-nowrap",
      },
    },
  ];

  const handlePageNumber = async (page: PAGINATE) => {
    // setSearchBK((prev) => ({ ...prev, pageable: page }));
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center">User Management</h2>
      <p className="text-center text-gray-400">Manage your users</p>

      <div className="mt-10 mb-2 flex justify-end">
        <AsyncButton title="Login" type="submit">
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
    </>
  );
};

export default UsersPage;
