import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import style from "@/styles/user/forum/postcard.module.scss";

const Gallery = ({ media }) => {
  return (
    <Splide options={{ arrows: false }} aria-label="media Gallery">
      {media.map((item) => {
        return (
          <SplideSlide key={item.src} className={style.media}>
            <img src={item.src} alt={item.title} loading="lazy" />
          </SplideSlide>
        );
      })}
    </Splide>
  );
};

export default Gallery;
