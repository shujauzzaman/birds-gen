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
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-black/30">
      <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <button
          type="button"
          onClick={handleDownload}
          className="absolute left-3 bottom-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/75 text-white border border-white/20 shadow-lg backdrop-blur-md hover:bg-black"
          aria-label="Download image"
        >
          <Download size={18} strokeWidth={2.5} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold text-white line-clamp-1">
          {title}
        </h3>
      </div>
    </div>
  );
}