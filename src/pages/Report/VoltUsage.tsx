import { useEffect, useState } from "react";
import LineChart from "../../components/LineChart.tsx/LineChart";
import Datepicker, { DateRangeType } from "react-tailwindcss-datepicker";
import AsyncButton from "../../components/AsyncButton/AsyncButton";
import { IoMdLogIn } from "react-icons/io";

const VoltUsage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [value, setValue] = useState<DateRangeType>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  useEffect(() => {
    const fetchVoltUsage = async () => {
      try {
        // const response = { data: [] };
        // setVoltUsage(response.data);

        setTimeout(() => {
          setLoading(false);
        }, 200);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVoltUsage();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-center">Volt Usage</h2>
      <p className="text-center text-gray-400">
        Report of your electricity usage in volts
      </p>

      <div className="mt-12 flex flex-wrap justify-center items-end gap-6 m-4 ">
        <div className="flex flex-col w-60 gap-2">
          <label>Report date range</label>
          <Datepicker
            primaryColor="violet"
            startWeekOn="mon"
            placeholder="Select Date Range"
            value={value}
            onChange={handleValueChange}
            showShortcuts={true}
            readOnly={true}
            displayFormat="DD/MM/YYYY"
          />
        </div>
        <div className="flex gap-3">
          <AsyncButton
            className="mb-1 bg-gray-400 border-none shadow-none hover:bg-gray-500"
            title="Login"
            type="submit"
            // loading={loading}
          >
            <IoMdLogIn className="h-4 w-4" /> Clear
          </AsyncButton>
          <AsyncButton
            className="mb-1"
            title="Login"
            type="submit"
            // loading={loading}
          >
            <IoMdLogIn className="h-4 w-4" /> Search
          </AsyncButton>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        {loading ? (
          <span className="loading loading-spinner loading-lg text-primary h-60"></span>
        ) : (
          <div className="w-full xl:w-[980px]">
            <LineChart />
          </div>
        )}
      </div>
    </div>
  );
};

export default VoltUsage;
