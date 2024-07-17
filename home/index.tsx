/// <reference types="vinxi/types/client" />
import ReactDOM from "react-dom/client";
import { useEffect, useState, useMemo } from "react";

import "./index.css";

type Photo = {
  photo: string;
  height: number;
  width: number;
};

function pack(images: Photo[], columns: number): Photo[][] {
  const packed: Photo[][] = Array.from({ length: columns }, () => []);
  const heights = Array.from({ length: columns }, () => 0);
  for (const image of images) {
    const column = heights.indexOf(Math.min(...heights));
    packed[column].push(image);
    heights[column] += image.height;
  }
  return packed;
}

function ImageDisplay() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    fetch("/api/photos")
      .then((res) => res.json())
      .then((data) => setPhotos(data));
  }, []);

  const columns = useMemo(() => pack(photos, 3), [photos]);

  return (
    <div className="flex flex-wrap mt-2 px-1">
      {columns.map((column, i) => (
        <div key={i} className="w-1/3 flex flex-col px-1 gap-2">
          {column.map((p) => (
            <img
              src={`/photos/${p.photo}`}
              alt={p.photo}
              key={p.photo}
              style={{
                aspectRatio: `${p.width}/${p.height}`,
              }}
              className="w-full rounded-xl"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ImageDisplay />);
