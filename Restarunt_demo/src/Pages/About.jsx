import './About.css';
export default function About() {
  return (
    <div className="about-bg">
      <div className="about-content">
        <h1 className="about-title">About Us</h1>
        <p className="about-description">
          Welcome to JR Restaurant! With over 10 years of experience, we have proudly served 1000+ members, offering delicious cuisine and a warm, inviting atmosphere.
        </p>
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2025, JR Restaurant started as a small family-owned eatery. Our passion for food and hospitality has helped us grow into a beloved spot for locals and visitors alike.
          </p>
        </section>
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We are committed to delivering exceptional dining experiences, using only the freshest ingredients and providing outstanding customer service.
          </p>
        </section>
        <section className="about-section">
          <h2>Meet the Team</h2>
          <ul className="about-team">
            <li><strong>Chef Priya</strong> – Head Chef</li>
            <li><strong>Rahul</strong> – Restaurant Manager</li>
            <li><strong>Anita</strong> – Customer Relations</li>
          </ul>
        </section>
      </div>
    </div>
  );
}