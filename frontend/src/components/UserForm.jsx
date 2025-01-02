// UserForm.jsx
import { useDispatch, useSelector } from 'react-redux';
import { setSections } from '../app/resumePreviewSlice/resultPreviewSlice';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import UserFormSectionWrapper from './UserFormSectionWrapper';

const UserForm = () => {
  // Pull sections and setSections from Context
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.resumePreview.sections);

  // Setup DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((sec) => sec.id === active.id);
      const newIndex = sections.findIndex((sec) => sec.id === over.id);
      const newArr = arrayMove(sections, oldIndex, newIndex);
      dispatch(setSections(newArr));
    }
  };

  return (
    <div className="w-full p-5 flex flex-col gap-5">
      <h1 className="text-3xl font-bold">Form Sections</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-6">
            {sections.map((section) => (
              <UserFormSectionWrapper key={section.id} section={section} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default UserForm;
