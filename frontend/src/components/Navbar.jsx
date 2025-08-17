import { Link } from "react-router-dom";
import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold">
        Livestream App
      </Link>
      <div className="flex gap-x-8">
        <Link to="/">Home</Link>
        <Link to="/player">Player</Link>
      </div>
    </nav>
  );
}
