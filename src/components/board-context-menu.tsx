import { useRef, useState, useLayoutEffect, useEffect } from "react";

interface ContextMenuProps {
  x: number;
  y: number;
  onEdit: () => void;
  onDelete: () => void;
  onConnect: () => void;
  onClose: () => void;
}

// Simplified context menu (replacing earlier extracted component)
export default function ContextMenu({
  x,
  y,
  onEdit,
  onDelete,
  onConnect,
  onClose,
}: ContextMenuProps) {
  const menuRef = useRef(null);
  const [position, setPosition] = useState({ x, y });

  useLayoutEffect(() => {
    if (menuRef.current) {
      const { innerWidth, innerHeight } = window;
      const { offsetWidth, offsetHeight } = menuRef.current;
      let newX = x;
      let newY = y;
      if (x + offsetWidth > innerWidth) {
        newX = innerWidth - offsetWidth - 5;
      }
      if (y + offsetHeight > innerHeight) {
        newY = innerHeight - offsetHeight - 5;
      }
      setPosition({ x: newX, y: newY });
    }
  }, [x, y]);

  useEffect(() => {
    const handleClickOutside = () => onClose();
    const handleEsc = (e: { key: string }) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      style={{ top: position.y, left: position.x }}
      className="absolute z-[200] bg-gray-900/80 backdrop-blur-sm border border-gray-600 rounded-md shadow-lg py-1 animate-fade-in"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onEdit}
        className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 cursor-pointer"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 cursor-pointer"
      >
        Delete
      </button>
      <button
        onClick={onConnect}
        className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 cursor-pointer"
      >
        Connect to...
      </button>
    </div>
  );
}