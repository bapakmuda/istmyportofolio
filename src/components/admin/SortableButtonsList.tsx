"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { reorderActionButtons } from "@/app/kamar-belakang/actions";
import DeleteForm from "./DeleteForm";
import { deleteActionButton } from "@/app/kamar-belakang/actions";

type ActionButton = {
  id: string;
  label: string;
  url: string;
  order: number;
};

// Sortable Item Component
function SortableItem({ button, onEdit }: { button: ActionButton; onEdit: (id: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: button.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-[#050505] p-4 border flex items-center justify-between group ${
        isDragging
          ? "border-[var(--color-terminal-green)] shadow-[0_0_15px_rgba(0,255,65,0.2)]"
          : "border-zinc-800 hover:border-zinc-600"
      }`}
    >
      <div className="flex items-center gap-4 flex-1">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-zinc-600 hover:text-white p-2"
          title="Drag to reorder"
        >
          <i className="fa-solid fa-grip-vertical"></i>
        </div>
        <div>
          <h3 className="font-bold text-[var(--color-terminal-green)]">{button.label}</h3>
          <p className="text-zinc-500 text-xs mt-1 truncate max-w-xs">{button.url}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onEdit(button.id)}
          className="text-zinc-500 hover:text-white transition-colors text-sm"
        >
          [ EDIT ]
        </button>
        <DeleteForm id={button.id} action={deleteActionButton}>
          <button type="submit" className="text-red-900 hover:text-red-500 transition-colors text-sm font-bold">
            [ DELETE ]
          </button>
        </DeleteForm>
      </div>
    </div>
  );
}

// Main List Component
export default function SortableButtonsList({ initialButtons }: { initialButtons: ActionButton[] }) {
  const router = useRouter();
  const [buttons, setButtons] = useState(initialButtons);
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setButtons((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // Immediately save the new order
        saveNewOrder(newItems);
        
        return newItems;
      });
    }
  }

  async function saveNewOrder(newItems: ActionButton[]) {
    setIsSaving(true);
    try {
      const itemsToUpdate = newItems.map((item, index) => ({
        id: item.id,
        order: index,
      }));
      await reorderActionButtons(itemsToUpdate);
    } catch (error) {
      console.error("Failed to reorder buttons:", error);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="relative">
      {isSaving && (
        <div className="absolute top-0 right-0 -mt-8 text-xs text-[var(--color-terminal-green)] animate-pulse">
          SAVING ORDER...
        </div>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={buttons}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {buttons.map((button) => (
              <SortableItem 
                key={button.id} 
                button={button} 
                onEdit={(id) => router.push(`/kamar-belakang/buttons?edit=${id}`)} 
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
