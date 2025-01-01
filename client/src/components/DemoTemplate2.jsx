import { useContext } from 'react';
import { MyContext } from '../context/MyContext';

const DemoTemplate2 = () => {
  const { userDetails, sections } = useContext(MyContext);

  const renderSection = (id) => {
    switch (id) {
      case 'profile':
        return (
          <div className="w-full flex items-center justify-between">
            <span className="text-[24px] font-bold">
              {userDetails?.profile?.name}
            </span>
            <span className="text-[23px] font-semibold">
              {userDetails?.profile?.position}
            </span>
          </div>
        );
      case 'contact':
        return (
          <div className="w-full py-4">
            <div className="w-full h-[1px] bg-black " />
            <div className="w-full flex items-center justify-center gap-10 py-4">
              <span className="text-[13px]">{userDetails?.contact?.phone}</span>
              <span className="text-[13px] flex items-center gap-5">
                <div className="h-[5px] w-[5px] bg-black rounded-full " />
                {userDetails?.contact?.email}
              </span>
              <span className="text-[13px] flex items-center gap-5">
                <div className="h-[5px] w-[5px] bg-black rounded-full " />
                {userDetails?.contact?.address}
              </span>
            </div>
            <div className="w-full h-[1px] bg-black " />
          </div>
        );
      case 'summary':
        return (
          <div className="w-full flex items-center justify-center flex-col py-4 gap-2">
            <h1 className="text-[24px] font-bold">Summary</h1>
            <p className="text-[13px] text-center">{userDetails?.summary}</p>
          </div>
        );
      case 'professional-experience':
        return (
          <div className="w-full flex flex-col items-center justify-center py-4">
            <h1 className="text-[24px] font-bold">Professional Experience</h1>
            {userDetails?.professionalExperience?.map((exp, index) => (
              <div
                key={index}
                className="w-full flex flex-col items-center justify-center py-4 gap-2"
              >
                <span className="text-[13px] text-blue-500">
                  {exp.startDate} - {exp.endDate}
                </span>
                <span className="text-[14px]">
                  {exp.position} | <span>{exp.company}</span>
                </span>
                <p className="text-[12px] text-center">{exp.description}</p>
              </div>
            ))}
          </div>
        );
      case 'education':
        return (
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <h1 className="text-[24px] font-bold">Education</h1>
            <span className="text-[13px] text-blue-500">
              {userDetails.education.year}
            </span>
            <span className="text-[18px] font-semibold ">
              {userDetails.education.degree}
            </span>
            <span className="text-[13px]">
              {userDetails.education.institution}
            </span>
          </div>
        );
      case 'skills':
        return (
          <div className="w-full flex flex-col items-center justify-center py-4 mt-[10px]">
            <h1 className="text-[24px] font-bold">Skills</h1>
            <div className="w-full flex items-center justify-center gap-2 p-4 flex-wrap">
              {userDetails.skills.map((skill, i) => (
                <span
                  key={i}
                  className="p-4 text-[12px] border rounded-full border-blue-500 "
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-[794px] h-[1123px] bg-white p-8">
      {sections.map((section) => (
        <div key={section?.id}>{renderSection(section?.id)}</div>
      ))}
    </div>
  );
};

export default DemoTemplate2;
