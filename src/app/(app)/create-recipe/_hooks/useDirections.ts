import { useState } from "react";

export function useDirections() {
    const [directions, setDirections] = useState([{ instruction: ""}]);

    const handleDirectionChange = (index: number, value: string) => {
        const updatedDirections = [...directions];
        updatedDirections[index].instruction = value;
        setDirections(updatedDirections);
    };

    return { directions, setDirections, handleDirectionChange}
}