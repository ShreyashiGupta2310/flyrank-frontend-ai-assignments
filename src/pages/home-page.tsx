import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <section className="page">
      <header className="page-header">
        <h1>FlyRank AI Capstone</h1>
        <p>Frontend engineering internship project starter.</p>
      </header>
      <p>
        <Link to="/settings" className="link">
          Open settings
        </Link>
      </p>
    </section>
  );
}
