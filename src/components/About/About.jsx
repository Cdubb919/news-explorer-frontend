import "./About.css";
import placeholderImg from "../../assets/placeholder-img.svg";

function About() {
  return (
    <section className="about">
      <h2>About the author</h2>
      <div className="about__container">
        <img
          src={placeholderImg}
          alt="Author image"
          className="about__image"
        />
        <div className="about__text">
          <p>
            <strong>Name:</strong> Christina Whiteley
          </p>
          <p>
            <strong>Role:</strong> Web Developer
          </p>
          <p>
            <strong>Technologies:</strong> JavaScript, React, Vite, CSS, HTML
          </p>
          <p>
            I’m building NewsExplorer as part of my TripleTen journey. I love
            debugging, learning how frontend and backend connect, and making
            apps that feel polished and intuitive. I hope this project helps
            others explore the world through news!
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
