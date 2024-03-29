import { useState, useRef } from "react";
import axios from "axios";

import notify from "../hooks/useNotification";

const ProfilePhoto = ({ LoggedUser, setPhoto }) => {
  const [imgFile, setImgFile] = useState([]);
  const [initalPhoto, setinitalPhoto] = useState(0);

  const FileInput = useRef();
  const handleClick = (event) => {
    FileInput.current?.click();
  };

  const handleUploadFile = async (event) => {
    const photo = new FormData();
    photo.append("profileImg", event.target.files[0]);
    console.log("img", event.target.files[0]);
    setImgFile(URL.createObjectURL(event.target.files[0]));
    setinitalPhoto(1);
    setPhoto(photo);
  };
  return (
    <>
      <input
        type="file"
        ref={FileInput}
        onChange={handleUploadFile}
        className="hidden"
      />
      <div className="relative flex justify-center">
        <img
          className="w-28 h-28 object-cover rounded-full mb-2"
          src={initalPhoto !== 0 ? imgFile : LoggedUser?.profileImg}
          alt=""
        />
        <div
          className="absolute border-2 border-[#D9D9D9] bg-white p-2 rounded-full bottom-0 ml-16"
          onClick={handleClick}
        >
          <svg
            viewBox="0 0 1000 1000"
            fill="currentColor"
            height="1.4em"
            width="1.4em"
            className="text-primary"
          >
            <path d="M500 400c42.667 0 78.333 14.667 107 44s43 64.667 43 106-14.667 76.667-44 106-64.667 44-106 44-76.667-14.667-106-44-44-64.667-44-106 14.667-76.667 44-106 64.667-44 106-44m400-150c28 0 51.667 9.667 71 29s29 43 29 71v450c0 26.667-9.667 50-29 70s-43 30-71 30H100c-26.667 0-50-10-70-30S0 826.667 0 800V350c0-28 10-51.667 30-71s43.333-29 70-29h120c18.667 0 32-10 40-30l30-92c6.667-18.667 20-28 40-28h340c20 0 33.333 9.333 40 28l30 92c8 20 21.333 30 40 30h120M500 800c69.333 0 128.333-24.333 177-73s73-107.667 73-177-24.333-128.333-73-177-107.667-73-177-73-128.333 24.333-177 73-73 107.667-73 177 24.333 128.333 73 177 107.667 73 177 73m366-380c9.333 0 17.333-3.667 24-11 6.667-7.333 10-15.667 10-25s-3.333-17.333-10-24c-6.667-6.667-14.667-10-24-10-24 0-36 11.333-36 34 0 10.667 3.667 19.333 11 26 7.333 6.667 15.667 10 25 10" />
          </svg>
        </div>
      </div>
    </>
  );
};
export default ProfilePhoto;
