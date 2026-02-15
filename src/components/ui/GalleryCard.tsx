export default function GalleryCard({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <div className="card overflow-hidden group">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-black/30">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />

        {/* Download button */}
        <button
          type="button"
          title="Download"
          className="
            gallery-download
            absolute
            bottom-3
            right-3
          "
        >
          <img
            src="src/assets/icons/download.svg"
            alt="Download"
            className="h-5 w-5"
          />
        </button>
      </div>

      {/* Title */}
      <div className="px-4 py-3">
        <div className="text-sm font-semibold text-white/90 truncate">
          {title}
        </div>
      </div>
    </div>
  );
}
