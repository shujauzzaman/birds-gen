import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Link to="/generate-bird">
        <button>Bird Home</button>
      </Link>
    </div>
  );
}