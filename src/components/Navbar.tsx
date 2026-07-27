import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bird, Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    ["nav-link", isActive ? "nav-link-active" : ""].join(" ");

  return (
    <header className="topbar">
      <nav className="topbar-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <Bird size={19} />
          </span>

          <span className="brand-text">
            <strong>BirdsGen</strong>
            <small>Generating birds images from text prompts</small>
          </span>
        </Link>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className={open ? "nav-menu nav-menu-open" : "nav-menu"}>
          <NavLink to="/" className={linkClass} end onClick={() => setOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/generate" className={linkClass} onClick={() => setOpen(false)}>
            Generator
          </NavLink>

          <Link to="/generate" className="nav-cta" onClick={() => setOpen(false)}>
            <Sparkles size={15} />
            Start
          </Link>
        </div>
      </nav>
    </header>
  );
}