// import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import Buttons from "~~/components/Buttons";

type FileData = {
  name: string;
  data: string;
};

const Home: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileData[] | null>(null);
  // const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const fileDataArray: FileData[] = [];

      Array.from(files).forEach(async file => {
        const fileData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && e.target.result && typeof e.target.result === "string") {
              resolve(e.target.result);
            } else {
              reject(new Error("Invalid file data"));
            }
          };
          reader.onerror = () => {
            reject(new Error("Error reading the file"));
          };
          reader.readAsDataURL(file);
        });

        fileDataArray.push({ name: file.name, data: fileData });

        // If all files have been read, update the state with the array of file data
        if (fileDataArray.length === files.length) {
          setSelectedFiles(fileDataArray);
        }
      });
    }
  };

  return (
    <>
      <MetaHeader />
      <div className="flex justify-evenly items-center flex-col lg:flex-row-reverse flex-grow pt-0 border-2 border-red-500">

        <div className="flex flex-col items-center lg:mr-48">
          <div className="lg:mt-6 mt-2 flex flex-col w-64 h-72 rounded-2xl bg-white"></div>
          <div className="items-center flex flex-col text-center w-1/2 lg:w-min mt-10">
            <input
              id="file-input"
              className="ml-24 lg:ml-40 pb-6 md:text-xl"
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              multiple
            />
          </div>
        </div>

        <div >
          <Buttons/>
        </div>
      </div>
    </>
  );
};

export default Home;
