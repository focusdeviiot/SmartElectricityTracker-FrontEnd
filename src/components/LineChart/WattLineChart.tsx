// import LineChart, { LimitProps, LineChartProps } from "./LineChart";
import LineChart, { LimitProps, DatasetsProps } from "./LineChart";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import AsyncButton from "../AsyncButton/AsyncButton";
import { FaSearchengin } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { differenceInMonths, endOfDay, startOfDay } from "date-fns/fp";
import React from "react";

export interface WattLineChartProps {
  DeviceName: string;
  DeviceUuid?: string;
}

const WattLineChart: React.FC<WattLineChartProps> = ({
  DeviceName,
  // DeviceUuid,
}) => {
  const schema = z
    .object({
      dateRange: z
        .object({
          startDate: z.string().nullable(),
          endDate: z.string().nullable(),
        })
        .refine((data) => data.startDate && data.endDate, {
          message: "Please select a date range",
        })
        .refine(
          (data) => {
            if (!data.startDate || !data.endDate) return true;
            const startDate = new Date(data.startDate);
            const endDate = new Date(data.endDate);
            return startDate <= endDate;
          },
          {
            message: "Start date must be less than end date",
          }
        )
        .refine(
          (data) => {
            if (!data.startDate || !data.endDate) return true;
            const endDate = new Date(data.endDate);
            return endDate <= endOfDay(new Date());
          },
          {
            message: "End date must be greater than or equal to today",
          }
        )
        .refine(
          (data) => {
            if (!data.startDate || !data.endDate) return true;
            const startDate = new Date(data.startDate);
            const endDate = new Date(data.endDate);
            const diffInMonths = differenceInMonths(startDate, endDate);
            return diffInMonths <= 3;
          },
          {
            message: "The date range should not exceed 3 months",
          }
        ),
    })
    .required();
  type FormFields = z.infer<typeof schema>;
  const formOptions = { resolver: zodResolver(schema) };
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormFields>(formOptions);

  const defaultLimit: LimitProps = {
    suggestedMax: 500,
    suggestedMin: 0,
  };
  const [voltUsage, setVoltUsage] = useState<DatasetsProps[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const defaultDateRange = {
    startDate: null,
    endDate: null,
  };

  const handleValueChange = (newValue: any) => {
    const { startDate, endDate } = newValue;
    return { startDate, endDate };
  };

  const onSearch = async () => {
    const { startDate, endDate } = getValues().dateRange;
    if (!startDate || !endDate) return;
    const setStartDate: Date = startOfDay(new Date(Date.parse(startDate)));
    const setEndDate: Date = endOfDay(new Date(endDate));
    const data = {
      startDate: setStartDate.toISOString(),
      endDate: setEndDate.toISOString(),
    };
    console.log(data);
  };

  const onReset = async () => {
    reset({
      dateRange: defaultDateRange,
    });
  };

  useEffect(() => {
    console.log("errors:", errors?.dateRange);
  }, [errors?.dateRange]);

  useEffect(() => {
    const fetchVoltUsage = async () => {
      try {
        // const response = { data: [] };
        // setVoltUsage(response.data);
        setVoltUsage([]);
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
    <>
      <h4 className="text-xl mt-12 font-bold text-center">{DeviceName}</h4>
      <form onSubmit={handleSubmit(onSearch)} onReset={onReset}>
        <div className="flex flex-wrap justify-center items-end m-4 gap-6">
          <div className="relative gap-2 w-60">
            <label className="flex mb-1">Report date range</label>
            <Controller
              control={control}
              name="dateRange"
              defaultValue={defaultDateRange}
              render={({ field }) => (
                <Datepicker
                  inputClassName={(value) =>
                    `${value} ${
                      errors?.dateRange?.message
                        ? "border-[1px] !border-red-500"
                        : ""
                    }`
                  }
                  primaryColor="violet"
                  startWeekOn="mon"
                  placeholder="Select Date Range"
                  value={field.value as DateValueType}
                  onChange={(e) => {
                    console.log("e:", field.value);
                    field.onChange(handleValueChange(e));
                  }}
                  showShortcuts={true}
                  readOnly={true}
                  displayFormat="DD/MM/YYYY"
                />
              )}
            />
            {errors?.dateRange && (
              <span className="absolute -bottom-5 text-red-500 text-sm">
                {errors?.dateRange?.message}
              </span>
            )}
          </div>
          <div className="flex gap-3">
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
        </div>
      </form>

      <div className="flex justify-center mt-8">
        {loading ? (
          <span className="loading loading-spinner loading-lg text-primary h-60"></span>
        ) : (
          <div className="w-full xl:w-[980px] h-96">
            <LineChart
              title="Watt"
              unit="W/hr"
              limit={defaultLimit}
              datasets={voltUsage}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default WattLineChart;
