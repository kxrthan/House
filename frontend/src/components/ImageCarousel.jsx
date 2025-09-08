import React, { useMemo, useState } from 'react';

// Helper to import all images in a folder using webpack's require.context
const importAll = (r) => r.keys().map(r);

// Map categories to image imports. Extend these as new folders are added.
const categoryToImages = {
  RESIDENTIAL: (() => {
    try {
      const ctx = require.context('../Images/Residencies', false, /\.(png|jpe?g|webp)$/i);
      return importAll(ctx);
    } catch (_) {
      return [];
    }
  })(),
  COMMERCIAL: [],
  SCHOOL: [],
  'INTERIOR DESIGN': [],
};

const ArrowButton = ({ direction, onClick }) => (
  <button
    aria-label={direction === 'left' ? 'Previous' : 'Next'}
    onClick={onClick}
    className="p-2 rounded-full bg-white/70 hover:bg-white shadow border text-gray-700"
  >
    {direction === 'left' ? '‹' : '›'}
  </button>
);

const ImageCarousel = ({ category = 'RESIDENTIAL' }) => {
  const images = useMemo(() => categoryToImages[category] || [], [category]);
  const [index, setIndex] = useState(0);

  const visible = 4; // show 4 at a time like the reference screenshots
  const canPrev = index > 0;
  const canNext = index + visible < images.length;

  const prev = () => canPrev && setIndex((i) => Math.max(0, i - 1));
  const next = () => canNext && setIndex((i) => Math.min(images.length - visible, i + 1));

  if (!images.length) {
    return <div className="text-center text-gray-500">No images available for {category}</div>;
  }

  const slice = images.slice(index, index + visible);

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-6 select-none">
        <ArrowButton direction="left" onClick={prev} disabled={!canPrev} />
        <div className="text-lg tracking-wide text-gray-700">{category}</div>
        <ArrowButton direction="right" onClick={next} disabled={!canNext} />
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {slice.map((src, i) => (
          <div key={i} className="bg-white rounded shadow-lg overflow-hidden">
            <img src={src} alt={`${category}-${index + i}`} className="w-full h-56 object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;




