import { useContext } from 'react';
import { MyContext } from '../context/MyContext';
import Layout from './Layout/Layout';

const Demotemplate = () => {
  const { userDetails, setUserDetails } = useContext(MyContext);
  return (
    <div className="w-[794px] h-[1123px] bg-white  p-8">
      {/* Template */}
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <span className="text-[24px] font-bold">{userDetails.name}</span>{' '}
        <span className="text-[23px] font-semibold">
          {userDetails.position}
        </span>
      </div>
      {/* Contacts */}
      <div className="w-full py-4">
        <div className="w-full h-[1px] bg-black " />
        <div className="w-full flex items-center justify-center gap-10 py-4">
          <span className="text-[13px]">{userDetails.phone}</span>
          <span className="text-[13px] flex items-center gap-5">
            <div className="h-[5px] w-[5px] bg-black rounded-full " />
            {userDetails.email}
          </span>
          <span className="text-[13px] flex items-center gap-5">
            <div className="h-[5px] w-[5px] bg-black rounded-full " />
            {userDetails.address}
          </span>
        </div>
        <div className="w-full h-[1px] bg-black " />
      </div>
      {/* Summary */}
      <div className="w-full flex items-center justify-center flex-col py-4 gap-2">
        <h1 className="text-[24px] font-bold">Summary</h1>
        <p className="text-[13px] text-center">{userDetails.summary}</p>
      </div>

      {/* Professional Experience */}
      <div className="w-full flex flex-col items-center justify-center py-4">
        <h1 className="text-[24px] font-bold">Professional Experience</h1>

        <div className="w-full flex flex-col items-center justify-center py-4 gap-2">
          <span className="text-[13px] text-blue-500">Jan XX - PRESENT</span>
          <span className="text-[14px]">
            Senior Graphic Design Specialist | <span>Experion New York</span>
          </span>
          <p className="text-[12px] text-center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
            quos ad blanditiis deserunt et quis odit consequatur fuga totam
            voluptate, adipisci, sequi sed voluptas non, magni in. Repellat,
            fugit laborum? Nesciunt, ducimus! Repellendus dolores quo inventore
            provident atque ab quaerat nobis omnis ipsam sunt reiciendis
            possimus, exercitationem laborum at optio nam. Dolor suscipit culpa,
            aperiam minus inventore corporis voluptatum dolores.
          </p>
        </div>
        <div className="w-full flex flex-col items-center justify-center py-4 gap-2">
          <span className="text-[13px] text-blue-500">Jan XX - PRESENT</span>
          <span className="text-[14px]">
            Senior Graphic Design Specialist | <span>Experion New York</span>
          </span>
          <p className="text-[12px] text-center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
            quos ad blanditiis deserunt et quis odit consequatur fuga totam
            voluptate, adipisci, sequi sed voluptas non, magni in. Repellat,
            fugit laborum? Nesciunt, ducimus! Repellendus dolores quo inventore
            provident atque ab quaerat nobis omnis ipsam sunt reiciendis
            possimus, exercitationem laborum at optio nam. Dolor suscipit culpa,
            aperiam minus inventore corporis voluptatum dolores.
          </p>
        </div>
        <div className="w-full flex flex-col items-center justify-center py-4 gap-2">
          <span className="text-[13px] text-blue-500">Jan XX - PRESENT</span>
          <span className="text-[14px]">
            Senior Graphic Design Specialist | <span>Experion New York</span>
          </span>
          <p className="text-[12px] text-center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia
            quos ad blanditiis deserunt et quis odit consequatur fuga totam
            voluptate, adipisci, sequi sed voluptas non, magni in. Repellat,
            fugit laborum? Nesciunt, ducimus! Repellendus dolores quo inventore
            provident atque ab quaerat nobis omnis ipsam sunt reiciendis
            possimus, exercitationem laborum at optio nam. Dolor suscipit culpa,
            aperiam minus inventore corporis voluptatum dolores.
          </p>
        </div>
      </div>
      {/* Education */}
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <h1 className="text-[24px] font-bold">Education</h1>
        <span className="text-[13px] text-blue-500">MAY 20XX</span>
        <span className="text-[18px] font-semibold ">
          Bachelor of Science in Computer Science
        </span>
        <span className="text-[13px]">
          Resume Genius University, New York, NY
        </span>
      </div>
      <div className="w-full flex flex-col items-center justify-center py-4 mt-[10px]">
        <h1 className="text-[24px] font-bold">Skills</h1>
        <div className="w-full flex items-center justify-center gap-2">
          <span className="p-4 text-[12px] border rounded-full border-blue-500">
            InDesign
          </span>
          <span className="p-4 text-[12px] border rounded-full border-blue-500">
            InDesign
          </span>
          <span className="p-4 text-[12px] border rounded-full border-blue-500">
            InDesign
          </span>
          <span className="p-4 text-[12px] border rounded-full border-blue-500">
            InDesign
          </span>
          <span className="p-4 text-[12px] border rounded-full border-blue-500">
            InDesign
          </span>
          <span className="p-4 text-[12px] border rounded-full border-blue-500">
            InDesign
          </span>
        </div>
      </div>
    </div>
  );
};

export default Demotemplate;
