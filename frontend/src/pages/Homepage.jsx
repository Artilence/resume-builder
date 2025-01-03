import Layout from '../components/Layout/Layout';

const Homepage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className=" flex flex-col items-center justify-center px-8 text-center gap-5  py-20 h-[1123px] w-[794px]">
        <h1 className="text-[35px] font-bold text-center">
          Job-winning resume templates
        </h1>
        <p className="text-[12px]">
          Each resume template is designed to follow the exact rules you need to
          get hired faster. Use our resume templates and get free access to 18
          more career tools!
        </p>
        <button className="px-10 py-5 bg-btn-blue text-white font-medium rounded-md hover:bg-btn-dark">
          Create my resume
        </button>
        <button className="px-10 py-5 bg-btn-blue text-white font-medium rounded-md hover:bg-btn-dark">
          Generate with Linkedin
        </button>
      </div>
    </Layout>
  );
};

export default Homepage;
