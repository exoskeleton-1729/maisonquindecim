// src/pages/Letters.jsx
import React from "react";
import { Link } from "react-router-dom";

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buildItems() {
  const basePrices = [
    380, 420, 540, 600, 720, 850, 900, 1020, 1200, 1350, 1500, 1700,
  ];

  let items = basePrices.map((base, i) => {
    const adjustment = rand(1, 9) * (Math.random() < 0.5 ? -1 : 1);
    let price = base + adjustment;
    if (price < 200) price = base + rand(1, 9);

    return { id: i + 1, price, name: "" };
  });

  items = items
    .map((v) => ({ sort: Math.random(), value: v }))
    .sort((a, b) => a.sort - b.sort)
    .map((obj) => obj.value);

  const sorted = [...items].sort((a, b) => a.price - b.price);

  const names = [
    "Le Ciel Petit",
    "Le Citron Petit",
    "Le Rêveur Petit",
    "Le Rousseau Petit",
    "Le Ciel Classique",
    "Le Citron Classique",
    "Le Rêveur Classique",
    "Le Rousseau Classique",
    "Le Ciel Grand",
    "Le Citron Grand",
    "Le Rêveur Grand",
    "Le Rousseau Grand",
  ];

  sorted.forEach((item, index) => {
    item.name = names[index];
  });

  sorted.forEach((item, index) => {
    if (index < 4) item.chainLength = 8;
    else if (index < 8) item.chainLength = 9;
    else item.chainLength = 10;
  });

  sorted.forEach((item, index) => {
    item.charCount = index < 8 ? 900 : 1500;
  });

  return sorted
    .map((v) => ({ sort: Math.random(), value: v }))
    .sort((a, b) => a.sort - b.sort)
    .map((obj) => obj.value);
}

const ITEMS = buildItems();

export default function Letters() {
  return (
    <section>
      <div className="letters-grid">
        {ITEMS.map((item) => (
          <div key={item.id} className="letters-item">
            <div className="letters-rect" />
            <div className="letters-info">
              <div className="item-name">{item.name}</div>
              <div className="item-price">${item.price}</div>
              <Link
                className="item-button"
                to={`/letters/${encodeURIComponent(
                  item.name
                )}/${item.price}/${item.chainLength}/${item.charCount}`}
              >
                VIEW ITEM
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
