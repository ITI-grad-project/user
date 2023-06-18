import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Slider() {
  const [index, setIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const img = [
    {
      img: "https://www.badcredit.org/wp-content/uploads/2020/04/Best-Sites-to-Sell-Your-Stuff.jpg",
    },
    {
      img: "https://g.foolcdn.com/editorial/images/567925/gettyimages-1165073587.jpg",
    },
    {
      img: "https://avatars.mds.yandex.net/i?id=2084febe8229eb3de961dbc4c9786087f08e472c-7683610-images-thumbs&n=13",
    },
    {
      img: "https://foodpackthai.com/wp-content/uploads/2022/06/gift.jpg",
    },
    {
      img: "https://golocad.com/wp-content/uploads/2022/12/e-comm-packaging.webp",
    },
    {
      img: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2019_01/2704581/190104-clutter-home-drawers-stock-cs-215p.jpg",
    },

    {
      img: "https://www.badcredit.org/wp-content/uploads/2020/04/Best-Sites-to-Sell-Your-Stuff.jpg",
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
      <div className="carousel w-full h-96">
        <div id="slide1" className="carousel-item relative w-full">
          <img className="w-full" src={img[index].img} key={index} />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle btn-primary">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle btn-primary">
              ❯
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Slider;
