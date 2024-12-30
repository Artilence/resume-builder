// src/components/DemoTemplate.jsx
import React, { useContext } from 'react';
import { MyContext } from '../context/MyContext';
import { layoutsConfig } from '../layoutsConfig';

const DemoTemplate = () => {
  const { userDetails, currentLayout } = useContext(MyContext);
  const layout = layoutsConfig[currentLayout];

  return (
    <div className="w-[794px] h-[1123px] bg-white p-8 shadow-lg">
      <h1 className="text-2xl font-bold mb-4">
        Preview - {currentLayout.toUpperCase()}
      </h1>

      {/* We'll iterate over sections in the chosen layout */}
      {layout.sections.map((section) => {
        // If you want custom styling for each ID, do a switch.
        // Or do it fully generic. We'll do a partial example here:
        switch (section.id) {
          case 'profile':
            return (
              <div key={section.id} className="mb-6">
                <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                <p className="text-lg">
                  {userDetails.profile.name} - {userDetails.profile.position}
                </p>
              </div>
            );

          case 'contact':
            return (
              <div key={section.id} className="mb-6">
                <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                <p>Email: {userDetails.contact.email}</p>
                <p>Phone: {userDetails.contact.phone}</p>
                <p>Address: {userDetails.contact.address}</p>
              </div>
            );

          case 'summary':
            return (
              <div key={section.id} className="mb-6">
                <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                <p>{userDetails.summary}</p>
              </div>
            );

          case 'professional-experience':
            return (
              <div key={section.id} className="mb-6">
                <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                {userDetails.professionalExperience.map((exp, i) => (
                  <div key={i} className="mb-4">
                    <p className="font-bold">
                      {exp.startDate} - {exp.endDate} | {exp.position}
                    </p>
                    <p>{exp.company}</p>
                    <p className="text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            );

          case 'education':
            return (
              <div key={section.id} className="mb-6">
                <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                <p>{userDetails.education.year}</p>
                <p className="font-bold">{userDetails.education.degree}</p>
                <p>{userDetails.education.institution}</p>
              </div>
            );

          case 'skills':
            return (
              <div key={section.id} className="mb-6">
                <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                <div className="flex gap-2 flex-wrap">
                  {userDetails.skills.map((skill, i) => (
                    <span key={i} className="border px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default DemoTemplate;
