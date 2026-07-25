import { Download } from "lucide-react";

type GalleryCardProps = {
  title: string;
  image: string;
};

export default function GalleryCard({ title, image }: GalleryCardProps) {
  const handleDownload = async () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = `${title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <article className="gallery-card">
      <div className="gallery-image-wrap">
        <img src={image} alt={title} />

        <button
          type="button"
          onClick={handleDownload}
          className="gallery-download-btn"
          aria-label="Download image"
        >
          <Download size={17} />
        </button>
      </div>

      <div className="gallery-meta">
        <h3>{title}</h3>
        <span>AI generated sample</span>
      </div>
    </article>
  );
}