import { useState } from 'react';
import Layout from '../components/Layout/Layout';

const CreateProfile = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    profileName: '',
    name: '',
    position: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    experiences: [],
    projects: [],
    certifications: [],
    skills: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result }); // Store as Base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Items Handlers
  const handleAddExperience = () => {
    if (formData.experiences.length < 4) {
      setFormData({
        ...formData,
        experiences: [
          ...formData.experiences,
          {
            title: '',
            company: '',
            startDate: '',
            endDate: '',
            description: '',
          },
        ],
      });
    }
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      setFormData({
        ...formData,
        skills: [...formData.skills, e.target.value],
      });
      e.target.value = '';
    }
  };

  // Remove Item Handlers
  const handleRemoveExperience = (index) => {
    const updated = formData.experiences.filter((_, i) => i !== index);
    setFormData({ ...formData, experiences: updated });
  };

  const handleRemoveSkill = (index) => {
    const updated = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updated });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center ">
        <div className="max-w-4xl w-full bg-white border border-gray-300 rounded-3xl p-10">
          <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-10">
            Create Your Profile
          </h1>

          {/* Profile Name */}
          <div className="mb-12">
            <label className="text-2xl font-semibold block mb-3">
              Profile Name
            </label>
            <input
              type="text"
              name="profileName"
              className="w-full p-4 border rounded-lg text-lg focus:ring-2 focus:ring-blue-400"
              value={formData.profileName}
              onChange={handleChange}
              placeholder="Enter profile name"
            />
          </div>
          {/* Step 1 - Profile Picture Upload */}
          {step === 1 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">
                Upload Profile Picture
              </h2>

              <div className="flex flex-col items-center gap-4">
                <label className="w-48 h-48 border-2 border-dashed rounded-full flex items-center justify-center cursor-pointer">
                  {formData.profilePicture ? (
                    <img
                      src={formData.profilePicture}
                      alt="Profile Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-gray-500">Select Image</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePictureUpload}
                  />
                </label>
              </div>
            </div>
          )}

          {/* Step 2 - Personal Info */}
          {step === 2 && (
            <div>
              <h2 className="text-4xl font-bold mb-8 text-blue-600">
                Step 1: Personal Information
              </h2>
              <div className="flex flex-col gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="p-4 border rounded-lg"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="position"
                  placeholder="Position"
                  className="p-4 border rounded-lg"
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="p-4 border rounded-lg"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  className="p-4 border rounded-lg"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="p-4 border rounded-lg"
                  onChange={handleChange}
                />
                <textarea
                  name="summary"
                  placeholder="Short Bio / Summary"
                  className="p-4 border rounded-lg"
                  rows="4"
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          )}

          {/* Step 3 - Experience */}
          {step === 3 && (
            <div>
              <h2 className="text-4xl font-bold mb-8 text-blue-600">
                Step 2: Experience
              </h2>
              {formData.experiences.map((exp, index) => (
                <div key={index} className="mb-6 border-b pb-6 relative">
                  <input
                    type="text"
                    placeholder="Title"
                    className="w-full p-4 border rounded-lg mb-3"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    className="w-full p-4 border rounded-lg mb-3"
                  />
                  <input
                    type="month"
                    placeholder="Start Date"
                    className="w-full p-4 border rounded-lg mb-3"
                  />
                  <input
                    type="month"
                    placeholder="End Date"
                    className="w-full p-4 border rounded-lg mb-3"
                  />
                  <textarea
                    placeholder="Description"
                    className="w-full p-4 border rounded-lg mb-3"
                  ></textarea>
                  <button
                    onClick={() => handleRemoveExperience(index)}
                    className="absolute top-3 right-3 text-red-500"
                  >
                    ✖
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddExperience}
                className="text-green-600 font-bold"
              >
                + Add Experience
              </button>
            </div>
          )}

          {/* Step 4 - Skills */}
          {step === 4 && (
            <div>
              <h2 className="text-4xl font-bold mb-8 text-blue-600">
                Step 3: Skills
              </h2>
              <input
                type="text"
                onKeyDown={handleAddSkill}
                className="w-full p-4 border rounded-lg"
                placeholder="Type a skill and press Enter"
              />
              <div className="flex gap-3 flex-wrap mt-4">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="flex items-center p-3 bg-green-100 rounded-full text-lg"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(index)}
                      className="ml-2 text-red-500"
                    >
                      ✖
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="px-8 py-4 bg-gray-200 rounded-lg"
              >
                Back
              </button>
            )}
            {step < 4 ? (
              <button
                onClick={nextStep}
                className=" py-4 px-8 text-lg font-medium border border-gray-300 
                 rounded-lg shadow-sm focus:ring-2 focus:ring-black 
                 focus:outline-none hover:border-black hover:shadow-md 
                 transition-all duration-200 appearance-none"
              >
                Next
              </button>
            ) : (
              <button className="px-8 py-4 bg-green-500 text-white rounded-lg">
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProfile;
