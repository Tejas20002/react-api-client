import React, { useState, useEffect } from 'react';
import prettyBytes from 'pretty-bytes';
import axios from 'axios';

import ResponseTabGroup from '../../Tab-Groups/ResponseTabGroup';

export default function Response({ response, loading }) {
  const [doc, setDoc] = useState('{}');
  const [respponse, setRes] = useState('{}');

  useEffect(() => {
    if (response === null) return;
    const jsonResponse = JSON.stringify(response.data, null, 2);
    setDoc(jsonResponse);
    setRes(response);
  }, [response, loading]);

  const hasResponse = !(response == null);

  let time = '';
  let status = '';
  let size = '';

  if (hasResponse) {
    const hasCustomData = 'customData' in response;
    const hasData = 'data' in response;
    const hasHeaders = 'headers' in response;

    status = hasResponse ? response.status : 0;

    if (hasData && hasHeaders) {
      size = prettyBytes(
        (hasResponse ? JSON.stringify(response.data).length : 0) +
          (hasResponse ? JSON.stringify(response.headers).length : 0)
      );
    }

    if (hasCustomData) {
      time = response.customData.time;
    }
  }
  const handleSave = async () => {
    var respUrl = respponse.config.url;
      try {

        const apiResponse = await fetch('http://localhost:3045/api/saveResponse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: String(respUrl),
            status: status,
            header: JSON.stringify(respponse.headers),
            time: respponse.customData.time,
            body: doc
          }),
        });  
        console.log('Response from server:', apiResponse.data);
  
        if (apiResponse.status === 200) {
          console.log('Data saved successfully!');
        } else {
          console.error('Failed to save data. Server responded with:', apiResponse.status);
        }
      } catch (error) {
        console.error('Error saving data:', error.message);
        console.log('Detailed error information:', error);
      }
  };
  
  const RenderedResponseMeta = () => {
    return (
      <div className="flex mt-3">
        <span className='w-35'>Status: {status}</span>&nbsp;
        <span className='w-35'>Time: {time}</span>&nbsp;
        <span className='w-35'>Size: {size}</span>
      </div>
    );
  };

  return (
    <div className='my-4'>
      <div className='flex justify-between items-center'>
        <span className='text-2xl font-medium'>Response</span>
        <button disabled={!response} className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSave}>
          Save
        </button>
      </div>
      {response ? ( <RenderedResponseMeta /> ) : null}
      <ResponseTabGroup
        doc={doc}
        setDoc={setDoc}
        response={response}
        loading={loading}
      />
    </div>
  );
}
