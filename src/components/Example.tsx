import React from "react";

export const Example: React.FC = () => {
  return (
    <div className="bg-gray-200">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col">
          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
              checked
            />
            <span className="ml-2 text-gray-700">label</span>
          </label>

          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-red-600"
              checked
            />
            <span className="ml-2 text-gray-700">label</span>
          </label>

          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-orange-600"
              checked
            />
            <span className="ml-2 text-gray-700">label</span>
          </label>

          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-yellow-600"
              checked
            />
            <span className="ml-2 text-gray-700">label</span>
          </label>

          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-green-600"
              checked
            />
            <span className="ml-2 text-gray-700">label</span>
          </label>

          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-teal-600"
              checked
            />
            <span className="ml-2 text-gray-700">label</span>
          </label>

          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked
            />
            <span className="ml-2 text-gray-700">label</span>
          </label>

          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600"
              checked
            />
            <span className="ml-2 text-gray-700">label</span>
          </label>

          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-purple-600"
              checked
            />
            <span className="ml-2 text-gray-700">label</span>
          </label>

          <label className="inline-flex items-center mt-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-pink-600"
              checked
            />
            <span className="ml-2 text-gray-700">label</span>
          </label>
        </div>
      </div>
    </div>
  );
};
