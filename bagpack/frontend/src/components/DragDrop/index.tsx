import React, { useState, useCallback } from "react";

interface DragDropContainerProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
  onReorder: (reorderedItems: T[]) => void;
  onItemMove: (itemId: string, targetCategory: string) => void;
  category: string;
}

function DragDropContainer<T>({
  items,
  renderItem,
  keyExtractor,
  onReorder,
  onItemMove,
  category,
}: DragDropContainerProps<T>) {
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, id: string) => {
      setDraggingId(id);
      e.dataTransfer.setData("text/plain", id);
      e.dataTransfer.setData("category", category);
    },
    [category],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
      e.preventDefault();
      const sourceId = e.dataTransfer.getData("text/plain");
      const sourceCategory = e.dataTransfer.getData("category");

      if (sourceCategory !== category) {
        onItemMove(sourceId, category);
      } else {
        const sourceIndex = items.findIndex(
          (item) => keyExtractor(item) === sourceId,
        );

        if (sourceIndex === targetIndex) return;

        const newItems = [...items];
        const [reorderedItem] = newItems.splice(sourceIndex, 1);
        newItems.splice(targetIndex, 0, reorderedItem);

        onReorder(newItems);
      }
      setDraggingId(null);
    },
    [items, keyExtractor, onReorder, onItemMove, category],
  );

  return (
    <div className="drag-drop-container">
      {items.map((item, index) => (
        <div
          key={keyExtractor(item)}
          draggable
          onDragStart={(e) => handleDragStart(e, keyExtractor(item))}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          className={`drag-drop-item ${
            draggingId === keyExtractor(item) ? "dragging" : ""
          }`}
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

export default DragDropContainer;
