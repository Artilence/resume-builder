// src/layoutsConfig.js

export const layoutsConfig = {
  layoutA: {
    sections: [
      {
        id: 'profile',
        title: 'Profile',
        fields: [
          { key: 'profile.name', label: 'Name', type: 'text' },
          { key: 'profile.position', label: 'Position', type: 'text' },
        ],
      },
      {
        id: 'contact',
        title: 'Contact',
        fields: [
          { key: 'contact.email', label: 'Email', type: 'text' },
          { key: 'contact.phone', label: 'Phone', type: 'text' },
          { key: 'contact.address', label: 'Address', type: 'text' },
        ],
      },
      {
        id: 'summary',
        title: 'Summary',
        fields: [{ key: 'summary', label: 'Summary', type: 'textarea' }],
      },
      {
        id: 'professional-experience',
        title: 'Professional Experience',
        fields: [
          {
            key: 'professionalExperience',
            type: 'array',
            // This tells our form code how to render each item inside the array
            itemFields: [
              { key: 'company', label: 'Company', type: 'text' },
              { key: 'position', label: 'Position', type: 'text' },
              { key: 'startDate', label: 'Start Date', type: 'month' },
              { key: 'endDate', label: 'End Date', type: 'month' },
              { key: 'description', label: 'Description', type: 'textarea' },
            ],
          },
        ],
      },
      {
        id: 'education',
        title: 'Education',
        fields: [
          { key: 'education.year', label: 'Year', type: 'text' },
          { key: 'education.degree', label: 'Degree', type: 'text' },
          { key: 'education.institution', label: 'Institution', type: 'text' },
        ],
      },
      {
        id: 'skills',
        title: 'Skills',
        fields: [
          {
            key: 'skills',
            type: 'array',
            // For skills, each array item can just be a string
            // We'll treat it as an array of simple text items
            itemFields: [{ key: '', label: 'Skill', type: 'text' }],
          },
        ],
      },
    ],
  },
  layoutB: {
    // Maybe layoutB has fewer sections or different titles
    sections: [
      {
        id: 'profile',
        title: 'Basic Info',
        fields: [
          { key: 'profile.name', label: 'Full Name', type: 'text' },
          // Omitting 'position' for this layout
        ],
      },
      // Omit contact and summary for layoutB, etc.
      // Or add them if you want
      {
        id: 'education',
        title: 'Education',
        fields: [
          { key: 'education.year', label: 'Graduation Year', type: 'text' },
          { key: 'education.degree', label: 'Degree', type: 'text' },
        ],
      },
      // etc.
    ],
  },
};
