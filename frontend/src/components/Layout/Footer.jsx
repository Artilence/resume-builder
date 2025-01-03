import AmericanFlag from '../../assets/AmericanFlag.webp';
import { footerBottomLinks, footerIcons } from '../../Imports';
const Footer = () => {
  return (
    <div className="w-full bg-footer-blue text-white flex px-10 py-8 gap-4 flex-col">
      <div className="flex flex-col md:flex-row gap-1">
        {/* Footer Social  Section-left/top */}
        <div className="flex flex-col items-center justify-center gap-5 pb-5">
          <h2 className="text-[24px] font-bold text-center">
            Connect with us on Social media
          </h2>
          <div className="flex gap-2">
            {footerIcons.map((item, i) => (
              <a
                href={item?.link}
                key={i}
                className={`p-2 rounded-full flex  items-center justify-center ${
                  item.hover // Dynamically apply the class
                } hover:bg-opacity-80 bg-footer-hover`} // Optional hover opacity
              >
                <img
                  src={item?.icon}
                  alt="icon"
                  className="w-[25px] h-[25px] object-contain"
                />
              </a>
            ))}
          </div>
        </div>
        {/* Footer Links Section-right/bottom */}
        <div className="flex flex-col md:flex-row gap-4 md:flex-1">
          {/* Footer Links Sections Mapped In Groups */}
          {footerBottomLinks?.map((group, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 w-full items-center justify-center border-b border-white pb-5"
            >
              <h2 className="cursor-pointer text-[22px] font-bold">
                {group?.title}
              </h2>
              <div className="flex flex-col gap-4  overflow-hidden">
                {group?.Links.map((item, i) => (
                  <span
                    className="capitalize text-[14px] text-center p-2 hover:text-blue-800 cursor-pointer "
                    key={i}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer Copyright Section */}
      <div className="flex flex-col ">
        <div className="flex items-center justify-center gap-2  flex-col">
          <span className="flex items-center gap-2 text-[14px]">
            {' '}
            <img src={AmericanFlag} alt="" className="w-[25px] object-cover" />
            International
          </span>
          <span className="text-[14px] text-footer-">
            Copyright 2024 - ResumeBuilder.io
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
