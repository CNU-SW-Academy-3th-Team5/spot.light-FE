import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Location } from './Location';

export function Information() {
  const [information, setInformation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    // 데이터 가져오기
    axios
      .get('http://localhost:8080/api/v1/information')
      .then((response) => {
        setInformation(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  const handleUploadSubmit = (upload) => {
    // Check if the image has latitude and longitude data
    if (!upload.latitude || !upload.longitude) {
      // Display a popup to enter latitude and longitude
      const newLatitude = prompt('위도를 입력하세요:');
      const newLongitude = prompt('경도를 입력하세요:');

      if (newLatitude === null || newLongitude === null) {
        // User canceled the input, don't proceed with the upload
        setUploadError('사진의 위도와 경도를 입력해야 합니다.');
        return;
      } else {
        // Update the upload object with the new latitude and longitude
        upload.latitude = parseFloat(newLatitude);
        upload.longitude = parseFloat(newLongitude);
      }
    }

    // Continue with the upload process
    fetch('http://localhost:8080/api/v1/upload', {
      method: 'POST',
      body: upload,
    })
      .then((response) => {
        if (response.ok) {
          alert('사진이 정상적으로 업로드 되었습니다.');

          // 업로드 성공 후, 데이터 다시 가져오기
          return axios.get('http://localhost:8080/api/v1/information');
        } else {
          throw new Error('업로드 실패');
        }
      })
      .then((response) => {
        setInformation(response.data);
      })
      .catch((e) => {
        alert('서버 장애');
        console.error(e);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Location information={information} onUploadSubmit={handleUploadSubmit} />
      {uploadError && <div>{uploadError}</div>}
    </>
  );
}
