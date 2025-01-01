import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Layout from '../components/Layout/Layout';

const SelectProfile = () => {
  const [formDetails, setFormDetails] = useState({
    selectedProfile: '',
    jobTitle: '',
    jobDescription: '',
  });
  const [userProfiles, setUserProfiles] = useState([]);

  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     if (profiles.length === 0) {
  //       navigate('/createprofile');
  //     }
  //   });

  return (
    <Layout>
      <div className="w-full  flex flex-col gap-5 items-center justify-start  py-10">
        {/* Header */}
        <div className="w-full flex items-center justify-center">
          <h1 className="text-6xl   font-bold">AI Resume Builder </h1>
        </div>

        <form
          className="w-[60%] grid grid-cols-2 gap-5 min-h-[60vh] py-[2%]"
          action=""
        >
          {/* Left Side */}
          <div className="flex flex-col gap-[40%]  ">
            <div className="flex flex-col gap-5 items-start justify-center">
              <label
                className="text-3xl font-semibold text-gray-800"
                htmlFor="select-profile"
              >
                Select Profile
              </label>

              <select
                className="w-[60%] p-4 text-lg font-medium border border-gray-300 
                 rounded-lg shadow-sm focus:ring-2 focus:ring-black 
                 focus:outline-none hover:border-black hover:shadow-md 
                 transition-all duration-200 appearance-none"
                name="select-profile"
                id="select-profile"
              >
                {userProfiles.map((profileName) => (
                  <option key={profileName} value={profileName}>
                    {profileName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-5 items-start justify-center w-[60%]">
              <label
                className="text-3xl font-semibold text-gray-800"
                htmlFor="Job Title"
              >
                Job Title
              </label>
              <input
                className="w-[60%] p-4 text-lg font-medium border border-gray-300 
                 rounded-lg shadow-sm focus:ring-2 focus:ring-black 
                 focus:outline-none hover:border-black hover:shadow-md 
                 transition-all duration-200 appearance-none"
                type="text"
                name="Job Title"
                id="Job Title"
                value={formDetails.jobTitle}
                onChange={(e) =>
                  setFormDetails({ ...formDetails, jobTitle: e.target.value })
                }
              />
            </div>
          </div>
          {/* Right Side */}
          <div className="flex flex-col items-start justify-between">
            <div className="flex flex-col gap-5 items-start justify-center w-full p-3">
              <label
                className="text-3xl font-semibold text-gray-800"
                htmlFor="Job Description"
              >
                Job Description
              </label>
              <textarea
                className="w-full p-4 text-lg font-medium border border-gray-300 
                 rounded-lg shadow-sm focus:ring-2 focus:ring-black 
                 focus:outline-none hover:border-black hover:shadow-md 
                 transition-all duration-200 appearance-none"
                name="Job Description"
                id="Job Description"
                rows={10}
                value={formDetails.jobDescription}
                onChange={(e) =>
                  setFormDetails({
                    ...formDetails,
                    jobDescription: e.target.value,
                  })
                }
              ></textarea>
            </div>

            <div className="w-full flex items-center justify-end">
              <button
                className="w-[60%] p-4 text-lg font-medium border border-gray-300 
                 rounded-lg shadow-sm focus:ring-2 focus:ring-black 
                 focus:outline-none hover:border-black hover:shadow-md 
                 transition-all duration-200 appearance-none"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default SelectProfile;
