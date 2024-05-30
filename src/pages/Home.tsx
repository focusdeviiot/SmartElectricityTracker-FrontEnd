import React from "react";
import { MdElectricBolt } from "react-icons/md";

const Home = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center">Electricity Tracker</h2>
      <p className="text-center text-gray-400">
        Track your electricity usage in real-time
      </p>

      <div className="flex flex-col mx-auto gap-4 pt-10">
        <h4 className="text-xl font-bold text-center">Device 1</h4>
        <div className="flex flex-wrap justify-center gap-4 m-4">
          <div className="preview border-base-300 bg-base-100 rounded-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined">
            <div className="stat">
              <div className="stat-figure text-yellow-500">
                <MdElectricBolt className="w-8 h-8" />
              </div>
              <div className="stat-title text-gray-300">Volt</div>
              <div className="stat-value text-yellow-500">220 V</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
          </div>
          <div className="preview border-base-300 bg-base-100 rounded-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined">
            <div className="stat">
              <div className="stat-figure text-yellow-500">
                <MdElectricBolt className="w-8 h-8" />
              </div>
              <div className="stat-title text-gray-300">Amp</div>
              <div className="stat-value text-yellow-500">2.6 A</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
          </div>
          <div className="preview border-base-300 bg-base-100 rounded-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined">
            <div className="stat">
              <div className="stat-figure text-yellow-500">
                <MdElectricBolt className="w-8 h-8" />
              </div>
              <div className="stat-title text-gray-300">Watt</div>
              <div className="stat-value text-yellow-500">50 W</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mx-auto gap-4 pt-10">
        <h4 className="text-xl font-bold text-center">Device 2</h4>
        <div className="flex flex-wrap justify-center gap-4 m-4">
          <div className="preview border-base-300 bg-base-100 rounded-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined">
            <div className="stat">
              <div className="stat-figure text-yellow-500">
                <MdElectricBolt className="w-8 h-8" />
              </div>
              <div className="stat-title text-gray-300">Volt</div>
              <div className="stat-value text-yellow-500">220 V</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
          </div>
          <div className="preview border-base-300 bg-base-100 rounded-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined">
            <div className="stat">
              <div className="stat-figure text-yellow-500">
                <MdElectricBolt className="w-8 h-8" />
              </div>
              <div className="stat-title text-gray-300">Amp</div>
              <div className="stat-value text-yellow-500">2.6 A</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
          </div>
          <div className="preview border-base-300 bg-base-100 rounded-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined">
            <div className="stat">
              <div className="stat-figure text-yellow-500">
                <MdElectricBolt className="w-8 h-8" />
              </div>
              <div className="stat-title text-gray-300">Watt</div>
              <div className="stat-value text-yellow-500">50 W</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mx-auto gap-4 pt-10">
        <h4 className="text-xl font-bold text-center">Device 3</h4>
        <div className="flex flex-wrap justify-center gap-4 m-4">
          <div className="preview border-base-300 bg-base-100 rounded-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined">
            <div className="stat">
              <div className="stat-figure text-yellow-500">
                <MdElectricBolt className="w-8 h-8" />
              </div>
              <div className="stat-title text-gray-300">Volt</div>
              <div className="stat-value text-yellow-500">220 V</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
          </div>
          <div className="preview border-base-300 bg-base-100 rounded-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined">
            <div className="stat">
              <div className="stat-figure text-yellow-500">
                <MdElectricBolt className="w-8 h-8" />
              </div>
              <div className="stat-title text-gray-300">Amp</div>
              <div className="stat-value text-yellow-500">2.6 A</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
          </div>
          <div className="preview border-base-300 bg-base-100 rounded-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined">
            <div className="stat">
              <div className="stat-figure text-yellow-500">
                <MdElectricBolt className="w-8 h-8" />
              </div>
              <div className="stat-title text-gray-300">Watt</div>
              <div className="stat-value text-yellow-500">50 W</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Home;
