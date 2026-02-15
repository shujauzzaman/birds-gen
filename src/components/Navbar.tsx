import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "px-2 py-1 text-sm font-semibold transition relative",
      isActive ? "text-lime-300" : "text-white/70 hover:text-white",
    ].join(" ");

  return (
    <div className="mx-auto max-w-6xl px-4 pt-5">
      <div className="glass px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="text-lg">BirdsGen</span>
          <span className="text-lime-300">🍃</span>
        </Link>

        <div className="flex items-center gap-6">
          <NavLink to="/" className={linkClass} end>
            Home
            <span className="absolute left-0 -bottom-2 h-[2px] w-full bg-lime-300/0 transition-all" />
          </NavLink>

          <NavLink to="/generate" className={linkClass}>
            Generate
            <span className="absolute left-0 -bottom-2 h-[2px] w-full bg-lime-300/0 transition-all" />
          </NavLink>

          <span className="text-sm font-semibold text-white/55 cursor-default">
            Gallery
          </span>
        </div>
      </div>
    </div>
  );
}
