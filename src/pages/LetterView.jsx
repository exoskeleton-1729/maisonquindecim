// src/pages/LetterView.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";
import MarkovGenerator from "../markov";

export default function LetterView() {
  const { name, price, chain, length } = useParams();
  const chainLength = parseInt(chain);
  const charCount = parseInt(length);

  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function generateLetter() {
      try {
        setLoading(true);
        const base = import.meta.env.BASE_URL || "/";
        const url = `${base}thegreatgatsby.txt`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to load training text.");

        const trainingText = await res.text();
        const markov = new MarkovGenerator(chainLength);
        markov.train(trainingText);
        const generated = markov.generate(charCount);

        if (!cancelled) {
          const formatted = generated.replace(/(.{70})/g, "$1\n");
          setLetter(formatted);
        }
      } catch {
        if (!cancelled) setLetter("Error generating letter.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    generateLetter();
    return () => {
      cancelled = true;
    };
  }, [chainLength, charCount]);

  return (
    <div className="letter-container">
      <h1 className="item-title">
        {decodeURIComponent(name)} · ${price}
      </h1>

      {loading ? (
        <p className="generating">Generating…</p>
      ) : (
        <pre className="letter-text">{letter}</pre>
      )}

      <Link to="/letters" className="back-link">
        ← Back to Items
      </Link>
    </div>
  );
}
