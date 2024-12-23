import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef } from 'react';
import Demotemplate from '../components/Demotemplate';
import UserForm from '../components/UserForm';
import Layout from './../components/Layout/Layout';
const CreateYourResume = () => {
  const resumeRef = useRef(null); // Reference to the resume preview

  const downloadPDF = async () => {
    const element = resumeRef.current; // Get the current resume element
    const canvas = await html2canvas(element, { scale: 3 }); // Capture as canvas
    const imageData = canvas.toDataURL('image/png'); // Convert to image
    const pdf = new jsPDF('portrait', 'px', 'a4'); // Create PDF
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgProps = {
      width: canvas.width,
      height: canvas.height,
    };
    const ratio = Math.min(
      pdfWidth / imgProps.width,
      pdfHeight / imgProps.height,
    );

    pdf.addImage(
      imageData,
      'PNG',
      0,
      0,
      imgProps.width * ratio, // Scale width
      imgProps.height * ratio, // Scale height
    );

    pdf.save('resume.pdf');
  };
  return (
    <Layout>
      <div className="w-full flex items-center justify-center flex-col py-5 px-10 gap-2">
        <div>
          <button
            onClick={downloadPDF}
            className="px-6 py-3 rounded-lg bg-blue-700 font-bold text-xl text-white letter tracking-widest"
          >
            Print
          </button>
        </div>
        <div className="w-full flex items-start ">
          <div className="w-full">
            <UserForm />
          </div>
          <div
            ref={resumeRef}
            className=" transform scale-50 origin-top-right border border-black "
          >
            <Demotemplate />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateYourResume;
