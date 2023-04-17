import { useEffect, useState } from "react";
import "./App.css";

const galleryImages = Array.from({ length: 19 }, (_, i) => {
  return `lbg-${i + 1}.png`;
});

const numberOfImages = 3;

function App() {
  const [imageIndexes, setImageIndexes] = useState([0, 1, 2]);
  const [activeImage, setActiveImage] = useState(0);
  const [images, setImages] = useState([
    { src: galleryImages[0] },
    { src: galleryImages[1] },
    { src: galleryImages[2] },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextImageIndexes = imageIndexes.map(
        (index) => (index + numberOfImages) % galleryImages.length
      );
      const nextActiveImage = (activeImage + 1) % numberOfImages;

      setImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[nextActiveImage] = {
          src: galleryImages[nextImageIndexes[nextActiveImage]],
        };
        return updatedImages;
      });

      setActiveImage(nextActiveImage);
      setImageIndexes(nextImageIndexes);
    }, 4000);

    return () => clearInterval(interval);
  }, [imageIndexes, activeImage]);

  return (
    <div className="min-h-screen min-w-screen flex flex-col justify-center">
      <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden md:max-w-5xl">
        <div className="flex flex-row gap-4 justify-center">
          {images.map((image, index) => (
            <img
              key={index}
              className="w-48 h-48 aspect-square rounded-md"
              src={`/assets/img/gallery/${image.src}`}
              alt="gallery"
            />
          ))}
        </div>
      </div>
      <div className="fixed bottom-6 right-6 font-semibold text-lg underline">
        <a href="https://www.labranqueta.com/" target="_blank" rel="noreferrer">
          La Branqueta 🍱
        </a>
      </div>
    </div>
  );
}

export default App;
