import Navbar from "@/components/Navbar";
import Temperature from "@/components/Temperature/Temperature";
import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
     <Navbar/>
     <div className="pb-4 flex flex-col gap-4 md:flex-row"></div>
     <div className="flex flex-col gap-4 w-full">
      <Temperature/>
     </div>
     <div className="flex flex-col"></div>
    </main>
  );
}
