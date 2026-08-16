import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="app">
      <nav className="nav">
        <Link to="/" className="nav-brand">
          FlyRank
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/settings">Settings</Link>
        </div>
      </nav>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
