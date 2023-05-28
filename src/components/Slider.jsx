import { Link } from "react-router-dom";

function Slider() {
  return (
    <>
      <div className="carousel w-full h-96">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://g.foolcdn.com/editorial/images/567925/gettyimages-1165073587.jpg"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle btn-primary">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle btn-primary">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://avatars.mds.yandex.net/i?id=2084febe8229eb3de961dbc4c9786087f08e472c-7683610-images-thumbs&n=13"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle btn-primary">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle btn-primary">
              ❯
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Slider;
