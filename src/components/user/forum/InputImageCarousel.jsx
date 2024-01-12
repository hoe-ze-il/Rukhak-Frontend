import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import IconButton from "@mui/material/IconButton";
import CancelPresentationOutlinedIcon from "@mui/icons-material/CancelPresentationOutlined";
import style from "@/styles/user/forum/editor.module.scss";

const InputImageCarousel = ({ files, onRemoveFile }) => {
  console.log(files);

  return (
    <Splide
      options={{ arrows: false }}
      aria-label="media Gallery"
      tag="section"
    >
      {files.map((item) => (
        <SplideSlide key={item.src} className={style.image_slide_container}>
          <IconButton onClick={() => onRemoveFile(item)}>
            <CancelPresentationOutlinedIcon />
          </IconButton>
          <img src={item.src} alt={item.title} />
        </SplideSlide>
      ))}
    </Splide>
  );
};
export default InputImageCarousel;
