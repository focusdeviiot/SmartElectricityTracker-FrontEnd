// import { useEffect, useState } from "react";
import VoltLineChart from "../../components/LineChart/VoltLineChart";

const VoltUsage = () => {
  const listDevices = [
    {
      DeviceName: "Device 1",
      DeviceUuid: "123",
    },
    {
      DeviceName: "Device 2",
      DeviceUuid: "456",
    },
    {
      DeviceName: "Device 3",
      DeviceUuid: "789",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-center">Volt Usage</h2>
      <p className="text-center text-gray-400">
        Report of your electricity usage in volts
      </p>

      {listDevices.map((device) => (
        <VoltLineChart key={device.DeviceUuid} DeviceName={device.DeviceName} />
      ))}
    </div>
  );
};

export default VoltUsage;
