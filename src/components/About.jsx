import "./blocks/About.css";
import placeholderAvatar from "./../assets/placeholder-avatar.svg";
import selfPortrait from "./../assets/ian-johnson.jpg";

export const About = () => {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__avatar-container">
          <img
            src={selfPortrait || placeholderAvatar}
            alt="Picture of Ian Johnson"
            className="about__avatar"
          />
        </div>
        <div className="about__text">
          <h2 className="about__title">About the author</h2>
          <p className="about__description">
            My name is Ian Johnson. I currently work in retail, but aim to move
            into tech with a focus in game design. I&apos;m a novice in HTML,
            CSS, JavaScript, React, MongoDB, Express and Node.
            <br />
            <br />
            My time at TripleTen has given me many new skills in the various
            technologies mentioned above. I went in with very little knowledge
            in coding outside the absolute basics and have now put together two
            full webpages. I aim to further my knowledge in webpage development
            and other coding languages such as Python so that I may cast my net
            even wider with opportunities.
          </p>
        </div>
      </div>
    </section>
  );
};
