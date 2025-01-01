// src/components/UserFormSectionWrapper.jsx
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import UserFormSections from './UserFormSections';

export default function UserFormSectionWrapper({ section }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: section.id,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Collapsible
  const [isOpen, setIsOpen] = useState(true);
  const toggleSection = () => setIsOpen(!isOpen);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-green-200 p-4 rounded-md transition-all"
    >
      <h2
        onClick={toggleSection}
        className="text-2xl font-bold cursor-pointer mb-2"
      >
        {section.title}
      </h2>

      <div
        className={`overflow-hidden transition-all ${
          isOpen ? 'max-h-[2000px]' : 'max-h-0'
        }`}
      >
        <UserFormSections fields={section.fields} />
      </div>
    </div>
  );
}
