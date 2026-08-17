import "../blocks/About.css";
import placeholderAvatar from "../../assets/placeholder-avatar.svg";

const About = () => {
  return (
    <div className="about">
      <img src={placeholderAvatar} alt="Avatar" className="about__avatar" />
      <div className="about__container">
        <h2 className="about__title">About the author</h2>
        <p className="about__description">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know.
          <br />
          <br />
          You can also talk about your experience with TripleTen, what you
          learned there, and how you can help potential customers.
        </p>
      </div>
    </div>
  );
};

export default About;
