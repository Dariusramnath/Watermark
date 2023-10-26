// import Link from "next/link";
import type { NextPage } from "next";
// import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="mt-10 flex flex-col w-64 h-72 rounded-2xl bg-accent"></div>
        <div className="flex flex-col text-center mt-10">
          <button className="bg-primary w-48 h-10 rounded-lg">Upload</button>
          <button className="bg-primary w-48 h-10 rounded-lg mt-6">Sign</button>
          <button className="bg-primary w-48 h-10 rounded-lg mt-6">Embed</button>
          <button className="bg-primary w-48 h-10 rounded-lg mt-6">Download</button>
        </div>
      </div>
    </>
  );
};

export default Home;
