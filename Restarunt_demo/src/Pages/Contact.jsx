import './About.css';

export default function Contact() {
  return (
    <div className="about-bg">
      <div className="about-content contact-content">
        <h1 className="about-title">Contact Us</h1>
        <p className="about-description">We'd love to hear from you! Please fill out the form below or reach us directly at <a href="mailto:roger@gmail.com" className="contact-link">roger@gmail.com</a>.</p>
        <form className="contact-form" onSubmit={e => { e.preventDefault(); alert('Message sent!'); }}>
          <div className="contact-form-group">
            <input type="text" className="contact-input" placeholder="Your Name" required />
          </div>
          <div className="contact-form-group">
            <input type="email" className="contact-input" placeholder="Your Email" required />
          </div>
          <div className="contact-form-group">
            <textarea className="contact-input contact-textarea" placeholder="Your Message" rows={4} required></textarea>
          </div>
          <button type="submit" className="login-button contact-button">Send Message</button>
        </form>
        <div className="contact-info">
          <h2>Other Ways to Reach Us</h2>
          <ul>
            <li>Phone: <a href="tel:+1234567890" className="contact-link">+1 234 567 890</a></li>
            <li>Address: 123 Main Street, City, Country</li>
          </ul>
        </div>
      </div>
    </div>
  );
}