import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import UserFormSections from './UserFormSections';
import { useState } from 'react';
export default function UserFormSectionWrapper({ section }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.id });

  //for collapsible section
  const [isOpen, setIsOpen] = useState(false);
  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col gap-5 bg-green-200 p-5 rounded-md "
    >
      <h1
        className="text-4xl font-bold hover:bg-green-600 transition-all duration-300 hover:text-white cursor-pointer p-4 rounded-md"
        onClick={toggleSection}
      >
        {section.title}
      </h1>
      <div
        className={`transition-all duration-500 overflow-hidden ${
          isOpen ? 'max-h-[1000px]' : 'max-h-0'
        }`}
      >
        <UserFormSections id={section.id} />
      </div>
    </div>
  );
}

{
}
