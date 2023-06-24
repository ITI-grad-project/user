import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Slider() {
  const [index, setIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const img = [
    // {
    //   img: "../../public/images/MYReFurB (2).png",
    // },
    {
      img: "/public/images/rr.jpeg",
    },
    {
      img: "/public/images/nn.jpeg",
    },
    {
      img: "/public/images/mm.jpeg",
    },
    {
      img: "/public/images/mm.jpeg",
    },
  ];
  useEffect(() => {
    // create array of promises that will be resolved when each image has finished loading
    Promise.all(
      img.map((image) => {
        return new Promise((resolve, reject) => {
          const imgs = new Image();
          //set imgs url
          imgs.src = image.img;
          //fire when browser load
          imgs.onload = resolve;
          imgs.onerror = reject;
        });
      })
    ).then(() => {
      setImagesLoaded(true);
    });
  }, []);

  useEffect(() => {
    //make initial value to avoid some bug if condition not true
    let intervalId = null;
    if (index < img.length - 1) {
      intervalId = setTimeout(() => {
        //update state based on previous value
        setIndex((prevIndex) => prevIndex + 1);
      }, 2000);
    }
    return () => {
      //ensure intervalId not null, because this call back execute after every render
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [index]);
  useEffect(() => {
    //separate because i doesn't want this code to execute every render
    if (index === img.length - 1) {
      setIndex(0);
    }
  }, [index]);
  return (
    <>
      <div className="carousel w-full h-[80vh] ">
        <div id="slide1" className="carousel-item relative w-full">
          <img className="w-full h-full  " src={img[index].img} key={index} />
          {/* <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle btn-primary">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle btn-primary">
              ❯
            </a>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Slider;
