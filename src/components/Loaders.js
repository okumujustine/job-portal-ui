import * as React from "react";

export function JobsLoaders() {
  const loaderCoun = [1, 2, 3, 4, 5];
  return (
    <React.Fragment>
      {loaderCoun.map((loaderC) => (
        <div
          className="job-card shadow-sm rounded p-6 w-full mr-1 ml-1  mb-2"
          key={loaderC}
        >
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-sm bg-gray-400 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-400 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-400 rounded"></div>
                <div className="h-4 bg-gray-400 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}

export function TableLoaders() {
  return (
    <table className="animate-pulse min-w-full bg-white mt-2">
      <thead>
        <tr>
          <th className="bg-blue-100 border text-left px-8 py-4" />
          <th className="bg-blue-100 border text-left px-8 py-4" />
          <th className="bg-blue-100 border text-left px-8 py-4" />
          <th className="bg-blue-100 border text-left px-8 py-4" />
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border px-8 py-4" />
          <td className="border px-8 py-4" />
          <td className="border px-8 py-4" />
          <td className="border px-8 py-4" />
        </tr>
      </tbody>
    </table>
  );
}

export function CardLoaders() {
  return (
    <div className="shadow-md rounded py-12 px-4 w-4/12  ">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-400 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-400 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export function LabelLoaders() {
  return (
    <div className="animate-pulse mt-4 underline text-gray-300">
      <span className="text-gray-300">label</span>
    </div>
  );
}
