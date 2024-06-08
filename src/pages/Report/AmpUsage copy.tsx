// import { useEffect, useState } from "react";
import AmpLineChart from "../../components/LineChart/AmpLineChart";

const AmpUsage = () => {
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
      <h2 className="text-2xl font-bold text-center">Amp Usage</h2>
      <p className="text-center text-gray-400">
        Report of your electricity usage in Amp
      </p>

      {listDevices.map((device) => (
        <AmpLineChart key={device.DeviceUuid} DeviceName={device.DeviceName} />
      ))}
    </div>
  );
};

export default AmpUsage;
