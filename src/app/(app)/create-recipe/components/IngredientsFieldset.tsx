import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export function IngredientsFieldset({
  ingredients,
  setIngredients,
}: {
  ingredients: {
    amount: string;
    unit:
      | 'custom'
      | 'cups'
      | 'tbsp'
      | 'tsp'
      | 'grams'
      | 'oz'
      | 'lb'
      | 'ml'
      | 'l'
      | 'pieces';
    customUnit?: string;
    ingredient: string;
  }[];
  setIngredients: React.Dispatch<
    React.SetStateAction<
      {
        amount: string;
        unit:
          | 'custom'
          | 'cups'
          | 'tbsp'
          | 'tsp'
          | 'grams'
          | 'oz'
          | 'lb'
          | 'ml'
          | 'l'
          | 'pieces';
        customUnit?: string;
        ingredient: string;
      }[]
    >
  >;
}) {
  const handleIngredientChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value,
    };
    setIngredients(updatedIngredients);
  };

  const removeStep = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedIngredients = Array.from(ingredients);
    const [moved] = reorderedIngredients.splice(result.source.index, 1);
    reorderedIngredients.splice(result.destination.index, 0, moved);

    setIngredients(reorderedIngredients);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Ingredients
      </label>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="ingredients">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {ingredients.map((ingredient, index) => (
                <Draggable
                  key={index}
                  draggableId={`ingredient-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex gap-4 mt-2 items-center"
                    >
                      <img
                        alt="People working on laptops"
                        src="/drag-icon.svg"
                        className=""
                      />
                      <input
                        type="number"
                        placeholder="Amount"
                        value={ingredient.amount}
                        onChange={(e) =>
                          handleIngredientChange(
                            index,
                            'amount',
                            e.target.value,
                          )
                        }
                        className="w-1/4 px-2 py-1 border border-gray-300 rounded"
                      />
                      <select
                        value={ingredient.unit}
                        onChange={(e) =>
                          handleIngredientChange(index, 'unit', e.target.value)
                        }
                        className="w-1/4 px-2 py-1 border border-gray-300 rounded"
                      >
                        <option value="custom">Custom</option>
                        <option value="cups">Cups</option>
                        <option value="tbsp">Tablespoons</option>
                        <option value="tsp">Teaspoons</option>
                        <option value="grams">Grams</option>
                        <option value="oz">Ounces</option>
                        <option value="lb">Pounds</option>
                        <option value="ml">Milliliters</option>
                        <option value="l">Liters</option>
                        <option value="pieces">Pieces</option>
                      </select>
                      {ingredient.unit === 'custom' && (
                        <input
                          type="text"
                          placeholder="Custom Unit"
                          value={ingredient.customUnit}
                          onChange={(e) =>
                            handleIngredientChange(
                              index,
                              'customUnit',
                              e.target.value,
                            )
                          }
                          className="w-1/4 px-2 py-1 border border-gray-300 rounded"
                        />
                      )}
                      <input
                        type="text"
                        placeholder="Ingredient"
                        value={ingredient.ingredient}
                        onChange={(e) =>
                          handleIngredientChange(
                            index,
                            'ingredient',
                            e.target.value,
                          )
                        }
                        className="w-1/2 px-2 py-1 border border-gray-300 rounded"
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
        onClick={() =>
          setIngredients([
            ...ingredients,
            { amount: '', unit: 'cups', customUnit: '', ingredient: '' },
          ])
        }
        className="mt-4 text-green-700 hover:text-green-500 flex items-center font-semibold gap-1"
      >
        <PlusCircleIcon className="w-8" />
        Add Ingredient
      </button>
    </div>
  );
}
