"use client";

import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import { reorderSkills } from "@/app/kamar-belakang/actions";
import DeleteForm from "@/components/admin/DeleteForm";

type Skill = {
  id: string;
  name: string;
  icon: string;
  order: number;
};

type SortableItemProps = {
  skill: Skill;
  deleteSkillAction: (formData: FormData) => void;
};

function SortableItem({ skill, deleteSkillAction }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    position: "relative" as const,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`p-4 border ${isDragging ? 'border-[var(--color-terminal-green)] bg-[#111]' : 'border-[var(--color-terminal-green-dim)] bg-[#050505]'} flex items-center justify-between group hover:border-[var(--color-terminal-green)] transition-colors`}
    >
      <div className="flex items-center gap-4">
        {/* Drag Handle */}
        <div 
          {...attributes} 
          {...listeners} 
          className="cursor-grab hover:text-[var(--color-terminal-green)] text-zinc-600 mr-2 active:cursor-grabbing"
        >
          <i className="fa-solid fa-grip-vertical"></i>
        </div>
        
        <i className={`${skill.icon} text-3xl text-[var(--color-terminal-green)] drop-shadow-[0_0_5px_rgba(0,255,65,0.4)]`}></i>
        <span className="font-bold text-white text-lg tracking-wide">{skill.name}</span>
      </div>
      
      <div className="flex gap-4">
        <Link href={`/kamar-belakang/skills?edit=${skill.id}`} className="text-zinc-500 hover:text-[var(--color-terminal-green)] text-xl" title="Edit">
          <i className="fa-solid fa-pen-to-square"></i>
        </Link>
        <DeleteForm action={deleteSkillAction} id={skill.id}>
          <button type="submit" className="text-zinc-500 hover:text-red-500 text-xl" title="Delete">
            <i className="fa-solid fa-trash"></i>
          </button>
        </DeleteForm>
      </div>
    </div>
  );
}

export default function SortableSkillsList({ initialSkills, deleteSkillAction }: { initialSkills: Skill[], deleteSkillAction: (formData: FormData) => void }) {
  const [skills, setSkills] = useState(initialSkills);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setSkills(initialSkills);
  }, [initialSkills]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = skills.findIndex((s) => s.id === active.id);
      const newIndex = skills.findIndex((s) => s.id === over.id);
      
      const newSkills = arrayMove(skills, oldIndex, newIndex);
      setSkills(newSkills);
      
      setIsSaving(true);
      try {
        const updates = newSkills.map((s, index) => ({ id: s.id, order: index }));
        await reorderSkills(updates);
      } catch (e) {
        console.error("Failed to reorder skills", e);
      } finally {
        setIsSaving(false);
      }
    }
  }

  if (skills.length === 0) {
    return <div className="text-zinc-500 italic font-bold">No skills added yet.</div>;
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <h2 className="font-bold text-xl text-[var(--color-terminal-green)] border-b border-zinc-800 pb-2 flex-grow">EXISTING SKILLS ({skills.length})</h2>
        {isSaving && <span className="text-[var(--color-terminal-green)] text-xs animate-pulse">SAVING ORDER...</span>}
      </div>

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col gap-2">
          <SortableContext 
            items={skills.map(s => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {skills.map((skill) => (
              <SortableItem 
                key={skill.id} 
                skill={skill} 
                deleteSkillAction={deleteSkillAction}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </>
  );
}
