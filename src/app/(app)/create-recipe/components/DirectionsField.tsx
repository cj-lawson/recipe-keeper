import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface DirectionsFieldProps {
  directions: { instruction: string }[];
  setDirections: React.Dispatch<
    React.SetStateAction<{ instruction: string }[]>
  >;
}

export function DirectionsField({
  directions,
  setDirections,
}: DirectionsFieldProps) {
  const handleDirectionChange = (index: number, value: string) => {
    const updatedDirections = [...directions];
    updatedDirections[index].instruction = value;
    setDirections(updatedDirections);
  };

  const addNewStep = () => {
    setDirections([...directions, { instruction: '' }]);
  };

  const removeStep = (index: number) => {
    const newDirections = [...directions];
    newDirections.splice(index, 1);
    setDirections(newDirections);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedDirections = Array.from(directions);
    const [moved] = reorderedDirections.splice(result.source.index, 1);
    reorderedDirections.splice(result.destination.index, 0, moved);

    setDirections(reorderedDirections);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-4">
        Directions
      </label>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="directions">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-6"
            >
              {directions.map((direction, index) => (
                <Draggable
                  key={index}
                  draggableId={`step-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex gap-4 rounded items-center"
                    >
                      <img
                        alt="People working on laptops"
                        src="/drag-icon.svg"
                        className=""
                      />
                      <textarea
                        placeholder={`Step ${index + 1}`}
                        value={direction.instruction}
                        onChange={(e) =>
                          handleDirectionChange(index, e.target.value)
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="text-slate-600 cursor-pointer"
                      >
                        <XCircleIcon className="w-6" />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button
        type="button"
        onClick={addNewStep}
        className="mt-4 text-green-700 hover:text-green-500 flex items-center font-semibold gap-1"
      >
        <PlusCircleIcon className="w-8 hover:cursor-pointer" />
        Add Step
      </button>
    </div>
  );
}
