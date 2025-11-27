// src/pages/Gallery.jsx
import React from "react";

export default function Gallery() {
  const items = Array.from({ length: 12 }).map((_, i) => {
    const index = i + 1;
    let season = "";

    if (index <= 4) {
      season = "F/W 2025";
    } else if (index <= 8) {
      season = "S/S 2025";
    } else {
      season = "F/W 2024";
    }

    return {
      id: index,
      label: `Look #${index}`,
      season,
    };
  });

  return (
    <section>
      <div className="gallery-grid">
        {items.map((item) => (
          <div key={item.id} className="gallery-item">
            <div className="gallery-rect" />
            <div className="gallery-info">
              <div className="look-label">{item.label}</div>
              <div className="season-label">{item.season}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
