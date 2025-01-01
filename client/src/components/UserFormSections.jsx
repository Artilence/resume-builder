import { useState, useContext } from 'react';
import { MyContext } from '../context/MyContext';
export default function UserFormSections({ id }) {
  const { userDetails, setUserDetails } = useContext(MyContext);

  // Experience Section Methods
  const addExperience = () => {
    const newExperience = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setUserDetails((prev) => ({
      ...prev,
      professionalExperience: [
        ...(prev.professionalExperience || []),
        newExperience,
      ],
    }));
  };

  const updateExperience = (index, field, value) => {
    const updatedExperiences = userDetails.professionalExperience.map(
      (exp, i) => (i === index ? { ...exp, [field]: value } : exp)
    );
    setUserDetails((prev) => ({
      ...prev,
      professionalExperience: updatedExperiences,
    }));
  };

  const removeExperience = (index) => {
    const filteredExperiences = userDetails.professionalExperience.filter(
      (_, i) => i !== index
    );
    setUserDetails((prev) => ({
      ...prev,
      professionalExperience: filteredExperiences,
    }));
  };

  //Skills Section Methods
  const addSkill = () => {
    setUserDetails((prev) => ({
      ...prev,
      skills: [...prev.skills, ''], // Add empty string for new skill
    }));
  };

  const updateSkill = (index, value) => {
    const updatedSkills = userDetails.skills.map((skill, i) =>
      i === index ? value : skill
    );
    setUserDetails((prev) => ({
      ...prev,
      skills: updatedSkills,
    }));
  };
  const removeSkill = (index) => {
    const filteredSkills = userDetails.skills.filter((_, i) => i !== index);
    setUserDetails((prev) => ({
      ...prev,
      skills: filteredSkills,
    }));
  };

  return (
    <div className="flex flex-col gap-5">
      {id === 'profile' && (
        <>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold">Name:</span>
            <input
              value={userDetails?.profile?.name}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  profile: {
                    ...userDetails?.profile,
                    name: e?.target?.value,
                  },
                })
              }
              type="text"
              className="p-2 border border-green-700 outline-none rounded-md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold">Position:</span>
            <input
              value={userDetails?.profile?.position}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  profile: { ...userDetails.profile, position: e.target.value },
                })
              }
              type="text"
              className="p-2 border border-green-700 outline-none rounded-md"
            />
          </div>
        </>
      )}

      {id === 'contact' && (
        <>
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold">Email:</span>
            <input
              value={userDetails?.contact?.email}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  contact: { ...userDetails.contact, email: e.target.value },
                })
              }
              type="text"
              className="p-2 border border-green-700 outline-none rounded-md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold">Phone:</span>
            <input
              value={userDetails?.contact?.phone}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  contact: { ...userDetails.contact, phone: e.target.value },
                })
              }
              type="text"
              className="p-2 border border-green-700 outline-none rounded-md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold">Address:</span>
            <input
              value={userDetails?.contact?.address}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  contact: { ...userDetails.contact, address: e.target.value },
                })
              }
              type="text"
              className="p-2 border border-green-700 outline-none rounded-md"
            />
          </div>
        </>
      )}
      {id === 'summary' && (
        <textarea
          rows={10}
          value={userDetails?.summary}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              summary: e.target.value,
            })
          }
          className="border border-green-700 outline-none rounded-md p-2 text-3xl"
        />
      )}
      {id === 'professional-experience' && (
        <div className="flex flex-col gap-4">
          {userDetails?.professionalExperience?.map((exp, i) => (
            <div
              key={i}
              className="flex flex-col p-6 rounded-md border bg-emerald-50"
            >
              {userDetails.professionalExperience.length > 0 && (
                <div className="w-full flex justify-end items-center">
                  <span
                    onClick={() => removeExperience(i)}
                    className="rounded-full cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-green-700"
                  >
                    <span className="bg-white w-[15px] h-[1px]"></span>
                  </span>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <span className="text-2xl font-semibold">Company:</span>
                <input
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(i, 'company', e.target.value)
                  }
                  type="text"
                  className="p-2 border border-green-700 outline-none rounded-md"
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-2xl font-semibold">Position:</span>
                <input
                  value={exp.position}
                  onChange={(e) =>
                    updateExperience(i, 'position', e.target.value)
                  }
                  type="text"
                  className="p-2 border border-green-700 outline-none rounded-md"
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-2xl font-semibold">Start Date:</span>
                <input
                  value={exp.startDate}
                  onChange={(e) =>
                    updateExperience(i, 'startDate', e.target.value)
                  }
                  type="month"
                  className="p-2 border border-green-700 outline-none rounded-md"
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-2xl font-semibold">End Date:</span>
                <input
                  value={exp.endDate}
                  onChange={(e) =>
                    updateExperience(i, 'endDate', e.target.value)
                  }
                  type="month"
                  className="p-2 border border-green-700 outline-none rounded-md"
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-2xl font-semibold">Description:</span>
                <textarea
                  rows={5}
                  value={exp.description}
                  onChange={(e) =>
                    updateExperience(i, 'description', e.target.value)
                  }
                  className="p-2 border border-green-700 outline-none rounded-md"
                />
              </div>
            </div>
          ))}
          <button
            onClick={addExperience}
            className="bg-green-500 text-white p-2 rounded-md"
          >
            + Add Experience
          </button>
        </div>
      )}
      {id === 'education' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold">Year:</span>
            <input
              value={userDetails?.education?.year}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  education: { ...userDetails.education, year: e.target.value },
                })
              }
              type="text"
              className="p-2 border border-green-700 outline-none rounded-md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold">Degree:</span>
            <input
              value={userDetails?.education?.degree}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  education: {
                    ...userDetails.education,
                    degree: e.target.value,
                  },
                })
              }
              type="text"
              className="p-2 border border-green-700 outline-none rounded-md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold">Institution:</span>
            <input
              value={userDetails?.education?.institution}
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  education: {
                    ...userDetails.education,
                    institution: e.target.value,
                  },
                })
              }
              type="text"
              className="p-2 border border-green-700 outline-none rounded-md"
            />
          </div>
        </div>
      )}
      {id === 'skills' && (
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-semibold">Skills:</span>

          {userDetails.skills.map((skill, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => updateSkill(i, e.target.value)}
                className="p-2 border border-green-700 outline-none rounded-md w-full"
              />
              <button
                onClick={() => removeSkill(i)}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                X
              </button>
            </div>
          ))}

          <button
            onClick={addSkill}
            className="bg-green-500 text-white p-2 rounded-md mt-3"
          >
            + Add Skill
          </button>
        </div>
      )}
    </div>
  );
}
