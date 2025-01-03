import { useRef } from 'react';
import DemoTemplate from '../components/DemoTemplate';
import UserForm from '../components/UserForm';
import Layout from '../components/Layout/Layout';

const PreviewResume = () => {
  const resumeRef = useRef(null); // Reference to the resume preview

  const downloadPDF = async () => {
    // const element = resumeRef.current; // Get the resume DOM element
    // const options = {
    //   margin: 10,
    //   filename: 'resume.pdf',
    //   image: { type: 'jpeg', quality: 0.98 },
    //   html2canvas: {
    //     scale: 1, // No need to scale, keeps original text
    //     useCORS: true,
    //   },
    //   jsPDF: {
    //     unit: 'mm',
    //     format: 'a4',
    //     orientation: 'portrait',
    //   },
    // };
    // // Generate PDF and download it
    // await html2pdf().from(element).set(options).save();
  };
  return (
    <Layout>
      <div className="w-full flex items-center justify-center flex-col py-5 px-10 gap-2">
        <div>
          {/* Download PDF Button */}
          <button
            onClick={downloadPDF}
            className="px-6 py-3 rounded-lg bg-blue-700 font-bold text-xl text-white letter tracking-widest"
          >
            Print
          </button>
        </div>
        <div className="w-full flex items-start ">
          {/* Left - User Form */}
          <div className="w-full overflow-scroll">
            <UserForm />
          </div>
          {/* Right - Resume Preview */}
          <div
            ref={resumeRef}
            className=" transform scale-50 origin-top-right border border-black "
          >
            <DemoTemplate />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PreviewResume;
