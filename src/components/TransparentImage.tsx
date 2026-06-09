import { useEffect, useState } from "react";

interface TransparentImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function TransparentImage({ src, alt, className }: TransparentImageProps) {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setProcessedSrc(src);
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Sample background color near the top-left edge
      const sampleX = Math.min(5, canvas.width - 1);
      const sampleY = Math.min(5, canvas.height - 1);
      const sampleIdx = (sampleY * canvas.width + sampleX) * 4;
      
      const bgR = data[sampleIdx];
      const bgG = data[sampleIdx + 1];
      const bgB = data[sampleIdx + 2];

      // Loop through all pixels and make background color transparent
      // We use a safe color-distance threshold
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a > 0) {
          // Calculate Euclidean color distance
          const dist = Math.sqrt(
            Math.pow(r - bgR, 2) + 
            Math.pow(g - bgG, 2) + 
            Math.pow(b - bgB, 2)
          );

          // Threshold of 35 is optimal for light-yellowish background removal without affecting characters
          if (dist < 45) {
            data[i + 3] = 0; // Make pixel fully transparent
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      try {
        const transparentDataUrl = canvas.toDataURL("image/png");
        setProcessedSrc(transparentDataUrl);
      } catch (err) {
        console.error("Canvas toDataURL failed:", err);
        setProcessedSrc(src);
      }
    };

    img.onerror = () => {
      setProcessedSrc(src);
    };

    img.src = src;
  }, [src]);

  return (
    <img
      src={processedSrc || src}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
    />
  );
}
