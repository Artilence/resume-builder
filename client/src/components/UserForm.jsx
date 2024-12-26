import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import UserFormSectionWrapper from './UserFormSectionWrapper';
import { useContext } from 'react';
import { MyContext } from '../context/MyContext';

const UserForm = () => {
  const { sections, setSections } = useContext(MyContext);

  //Sensors for mouse and keyboard
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 8,
      },
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
    //DND Context
    //This context wraps the entire form - allows listeners and hooks to be used
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      {/* contains the sortable sections */}
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
