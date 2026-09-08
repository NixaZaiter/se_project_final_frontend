import "./blocks/About.css";
import placeholderAvatar from "./../assets/placeholder-avatar.svg";

export const About = () => {
  return (
    <div className="about">
      <div className="about__container">
        <div className="about__avatar-container">
          <img src={placeholderAvatar} alt="Avatar" className="about__avatar" />
        </div>
        <div className="about__text">
          <h2 className="about__title">About the author</h2>
          <p className="about__description">
            This block describes the project author. Here you should indicate
            your name, what you do, and which development technologies you know.
            <br />
            <br />
            You can also talk about your experience with TripleTen, what you
            learned there, and how you can help potential customers.
          </p>
        </div>
      </div>
    </div>
  );
};
