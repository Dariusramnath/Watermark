// import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import type { NextPage } from "next";
import { toast } from "react-toastify";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

type FileData = {
  name: string;
  data: string;
};

const Home: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileData[] | null>(null);
  const [uploading, setUploading] = useState(false);

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
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="mt-10 flex flex-col w-64 h-72 rounded-2xl bg-accent"></div>
        <div className="items-center flex flex-col text-center w-1/2 lg:w-min mt-10">
          <input
            id="file-input"
            className="ml-24 lg:ml-40 pb-6 md:text-xl"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            multiple
          />
          <button className="bg-primary w-48 h-10 rounded-lg" disabled={uploading}>
            Upload
          </button>
          <button className="bg-primary w-48 h-10 rounded-lg mt-6">Sign</button>
          <button className="bg-primary w-48 h-10 rounded-lg mt-6">Embed</button>
          <button className="bg-primary w-48 h-10 rounded-lg mt-6">Download</button>
        </div>
      </div>
    </>
  );
};

export default Home;
