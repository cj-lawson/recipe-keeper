import { useState } from "react";

export function useDirections(
    recipe?: { directions?: { instruction: string }[] },
) {
    const [directions, setDirections] = useState<{ instruction: string }[]>(
        recipe?.directions && recipe.directions.length > 0
            ? recipe.directions
            : [{ instruction: "" }],
    );

    const handleDirectionChange = (index: number, value: string) => {
        const updatedDirections = [...directions];
        updatedDirections[index].instruction = value;
        setDirections(updatedDirections);
    };

    return { directions, setDirections, handleDirectionChange };
}
