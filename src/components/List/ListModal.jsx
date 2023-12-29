import React from 'react';

const InfoCardModal = ({ data, onClose }) => {
    const headers = JSON.stringify(JSON.parse(data.header),null, 2);
    const body = data.body;
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-md max-w-[80%]">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 14.59L16.59 17 12 12.41 7.41 17 6 15.59 10.59 11 6 6.41 7.41 5 12 9.59 16.59 5 18 6.41 13.41 11 18 15.59z"></path>
            </svg>
          </button>
        </div>
        <h2 className="text-lg font-bold mb-4">Record Data #{data._id}</h2>
        <div className="mb-4">
          <strong>URL:</strong> {data.url}
        </div>
        <div className="mb-4">
          <strong>Status:</strong> {data.status}
        </div>
        <div className="mb-4">
          <strong>Time:</strong> {new Date(data.time).toLocaleString()}
        </div>
        <div className="mb-4">
          <strong>Header:</strong>
          <pre>{headers}</pre>
        </div>
        <div className="max-h-40 overflow-y-auto mb-4">
          <strong>Body:</strong>
          <pre>{body}</pre>
        </div>
      </div>
    </div>
  );
};

export default InfoCardModal;
