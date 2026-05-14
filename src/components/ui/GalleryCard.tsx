export default function GalleryCard({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  async function download() {
    const response = await fetch(image);
    const blob = await response.blob();

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replaceAll(" ", "-").toLowerCase()}.png`;

    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="card overflow-hidden group">
      <div className="relative aspect-[4/3] bg-black/30">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        {/* download button */}
        <button
          type="button"
          title="Download"
          className="gallery-download"
          onClick={download}
        >
          <img
            src="/src/assets/icons/download.svg"
            alt="download"
            className="gallery-download-icon"
          />
        </button>
      </div>

      <div className="px-4 py-3">
        <div className="text-sm font-semibold text-white/90 truncate">
          {title}
        </div>
      </div>
    </div>
  );
}