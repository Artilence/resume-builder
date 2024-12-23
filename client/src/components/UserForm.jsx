import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import UserFormSectionWrapper from './UserFormSectionWrapper';

const sectionsData = [
  { id: 'profile', title: 'Profile' },
  { id: 'contact', title: 'Contact' },
];

const UserForm = () => {
  const [sections, setSections] = useState(sectionsData);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250, // Slightly increase the delay (200-300ms works well)
        tolerance: 8, // Allow a bit more movement tolerance
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      const newSections = arrayMove(sections, oldIndex, newIndex);
      setSections(newSections);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sections.map((section) => section.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="w-full p-5 flex flex-col gap-5">
          {sections.map((section) => (
            <UserFormSectionWrapper key={section.id} section={section} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default UserForm;
// <div className="flex flex-col gap-5 w-full">
//   <h1 className="text-2xl font-bold">Enter Your Details:</h1>
//   {/* Inputs Divs */}
//   {/* Name */}
//   <div className="flex flex-col gap-2 ">
//     <span className="text-lg font-semibold ">Name:</span>
//     <input
//       className=" text-[14px] outline-none border border-black rounded-md"
//       type="text"
//       value={userDetails.name}
//       placeholder="Enter your name"
//       onChange={e =>
//         setUserDetails({ ...userDetails, name: e.target.value })
//       }
//     />
//   </div>
//   {/* Position */}
//   <div className="flex flex-col gap-2">
//     <span className="text-lg font-semibold ">Position:</span>
//     <input
//       value={userDetails.position}
//       placeholder="Enter your position"
//       onChange={e =>
//         setUserDetails({ ...userDetails, position: e.target.value })
//       }
//       className=" text-[14px] outline-none border border-black rounded-md"
//       type="text"
//     />
//   </div>
//   {/* Email */}
//   <div className="flex flex-col gap-2">
//     <span className="text-lg font-semibold ">Email:</span>
//     <input
//       value={userDetails.email}
//       placeholder="Enter your email"
//       onChange={e =>
//         setUserDetails({ ...userDetails, email: e.target.value })
//       }
//       className=" text-[14px] outline-none border border-black rounded-md"
//       type="text"
//     />
//   </div>
//   {/* Phone */}
//   <div className="flex flex-col gap-2">
//     <span className="text-lg font-semibold ">Phone:</span>
//     <input
//       value={userDetails.phone}
//       placeholder="Enter your phone"
//       onChange={e =>
//         setUserDetails({ ...userDetails, phone: e.target.value })
//       }
//       className=" text-[14px] outline-none border border-black rounded-md"
//       type="text"
//     />
//   </div>
//   {/* Address */}
//   <div className="flex flex-col gap-2">
//     <span className="text-lg font-semibold ">Address:</span>
//     <input
//       value={userDetails.address}
//       placeholder="Enter your address"
//       onChange={e =>
//         setUserDetails({ ...userDetails, address: e.target.value })
//       }
//       className=" text-[14px] outline-none border border-black rounded-md"
//       type="text"
//     />
//   </div>
//   {/* Summary */}
//   <div className="flex flex-col gap-2">
//     <span className="text-lg font-semibold ">Summary:</span>
//     <textarea
//       value={userDetails.summary}
//       placeholder="Enter your summary"
//       onChange={e =>
//         setUserDetails({ ...userDetails, summary: e.target.value })
//       }
//       rows={7}
//       className="w-full text-[14px] outline-none border border-black rounded-md"
//       type="text"
//     />
//   </div>
//   {/* Professional Experience */}
//   <h2 className="text-2xl font-bold">Professional Experience</h2>
//   <div className="flex flex-col gap-2">
//     <span className="text-lg font-semibold">Time:</span>
//     <input
//       type="text"
//       className="w-full text-[14px] outline-none border border-black rounded-md"
//     />
//     <span className="text-lg font-semibold">Position:</span>
//     <input
//       type="text"
//       className="w-full text-[14px] outline-none border border-black rounded-md"
//     />
//   </div>
// </div>
