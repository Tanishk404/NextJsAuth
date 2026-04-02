import Button from "@/components/Button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center align-middle bg-black h-dvh items-center">
      <div className="border border-white w-96 h-96 rounded-2xl flex justify-center items-center">

      <h1 className="text-2xl rounded-full border border-white h-28 w-28 text-center p-6">Home</h1>
      <Button />
      </div>
    </div>
  );
}
