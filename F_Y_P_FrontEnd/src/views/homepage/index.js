import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// import { Footer } from 'flowbite-react';
import { Button } from "react-scroll";
import logo from "../../assets/newlogo.png";
// import about from "../../assets/about.svg";
import hero from "../../assets/hero.svg";
import contact from "../../assets/contact.svg";
import pic1 from "../../assets/pic1.png";
import pic2 from "../../assets/pic2.png";
import pic3 from "../../assets/pic3.png";
import p1 from "../../assets/images/undraw_resume_folder_re_e0bi.svg";
import p2 from "../../assets/images/undraw_resume_re_hkth.svg";
import p3 from "../../assets/images/undraw_online_resume_re_ru7s.svg";
import p4 from "../../assets/images/undraw_updated_resume_re_7r9j.svg";
// import { Link } from 'react-scroll';
import about from '../../assets/about.svg'; 


  

const images = [
  { src: p1, alt: "Image 1" },
  { src: p2, alt: "Image 2" },
  { src: p3, alt: "Image 3" },
  { src: p4, alt: "Image 4" },
];

const Home = () => {

  const [loaded, setLoaded] = useState(false);

  const [showMore, setShowMore] = useState(false);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    setLoaded(true);
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  let navigator = useNavigate();
  let location = useLocation();
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  // const [loaded, setLoaded] = useState(false);
  
  // useEffect(() => {
  //   setLoaded(true);
  // }, []);

  return (
    <div>
      {/* NavBar Section */}
      <div className="fixed top-0 w-full z-50">
        <div className="flex flex-row justify-between p-1 md:px-12 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="flex flex-row">
            <img src={logo} alt="logo" />

            <Link
              to="/"
              className="font-semibold text-2xl text-lime-500 p-1 mt-1.5 cursor-pointer"
            >
              SmartFolio
            </Link>
          </div>
          <nav className="flex gap-5 font-medium p-2.5 cursor-pointer">
            <Link
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              className="hover: text-brightGreen transition-all cursor-pointer"
            >
              Home
            </Link>
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className="hover: text-brightGreen transition-all cursor-pointer"
            >
              About
            </Link>
            <Link
              to="testimonials"
              spy={true}
              smooth={true}
              duration={500}
              className="hover: text-brightGreen transition-all cursor-pointer"
            >
              Testimonials
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              duration={500}
              className="hover: text-brightGreen transition-all cursor-pointer"
            >
              Contact
            </Link>
            <button
              onClick={() => {
                localStorage.clear();
                navigator(`/login`);
              }}
            >
              Login / SignUp
            </button>
          </nav>
        </div>
      </div>
      {/* Home Section */}
      return (
      <div className="min-h-[80vh] flex flex-col md:flex-row md:justify-between items-center md:mx-32 mx-5 mt-16">
        <div className="md:w-2/4 text-center">
          <h2 className="text-5xl font-semibold leading-tight">Welcome to</h2>
          <span className="text-5xl font-semibold text-lime-500">
            SmartFolio
          </span>

          <p className="text-lightText mt-5 text-start">
            Are you ready to take your career to the next level? Look no
            further! SmartFolio is here to empower you on your journey towards
            professional excellence.
          </p>

          <Link to="contact" spy={true} smooth={true} duration={500}>
            <button className="bg-teal-500 text-white py-2 px-5 rounded-full mt-4 outline hover:shadow-[] hover:bg-emerald-700 hover:text-white transition-all">
              Learn More
            </button>
          </Link>
        </div>

        <div className="w-full md:w-2/4 p-8">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="flex justify-center">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="max-w-full h-auto object-contain"
                  style={{ maxHeight: "400px" }}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {/* About Section  */}
      {/* <div className="md:min-h-screen flex flex-col-reverse md:flex-row items-center gap-5 md:mx-32 mx-5 mt-14">
        <div className="w-full md:w-2/4">
          <img src={about} alt="img" />
        </div>
        <div className="w-full md:w-2/4 text-center space-y-2">
          <h1 className="text-4xl font-semibold">
            {" "}
            About
            <span className="text-green-300"> Us?</span>
          </h1>

          <p>
            At SmartFolio, we're passionate about helping individuals reach
            their career aspirations. Our mission is to simplify the path to
            professional success by providing intuitive tools for crafting
            compelling cover letters, building standout resumes, and creating
            stunning portfolios. With a focus on user-friendliness,
            customization, and data security, we empower you to make a lasting
            impression on employers and clients alike. Join us on your journey
            to career excellence and let SmartFolio be your trusted partner in
            achieving your goals.
          </p>

          <Link to="contact" spy={true} smooth={true} duration={500}>
            <Button className="bg-teal-500 text-white py-2 px-5 rounded-full mt-4 outline hover:shadow-[] hover:bg-teal-700 hover:text-white transition-all">
              Learn More
            </Button>
          </Link>
        </div>
      </div> */}

<div className="md:min-h-screen flex flex-col-reverse md:flex-row items-center gap-5 md:mx-32 mx-5 mt-14">
      <div className={`w-full md:w-2/4 transition-transform duration-1000 ${loaded ? 'translate-x-0' : '-translate-x-full'}`}>
        <img src={about} alt="img" className="w-full" />
      </div>
      <div className={`w-full md:w-2/4 text-center space-y-2 transition-transform duration-1000 ${loaded ? 'translate-x-0' : 'translate-x-full'}`}>
        <h1 className="text-4xl font-semibold">
          About
          <span className="text-green-300"> Us?</span>
        </h1>
        <p>
          At SmartFolio, we're passionate about helping individuals reach their career aspirations. Our mission is to simplify the path to professional success by providing intuitive tools for crafting compelling cover letters, building standout resumes, and creating stunning portfolios. With a focus on user-friendliness, customization, and data security, we empower you to make a lasting impression on employers and clients alike.
        </p>
        {(showMore || !isSmallScreen) && (
          <p >
            Join us on your journey to career excellence and let SmartFolio be your trusted partner in achieving your goals.
          </p>
        )}
        {isSmallScreen && !showMore && (
          <button onClick={() => setShowMore(true)} className="bg-teal-500 text-white py-2 px-5 rounded-full mt-4 outline hover:shadow-lg hover:bg-teal-700 hover:text-white transition-all">
            Show More
          </button>
        )}
        {isSmallScreen && showMore && (
          <button onClick={() => setShowMore(false)} className="bg-teal-500 text-white py-2 px-5 rounded-full mt-4 outline hover:shadow-lg hover:bg-teal-700 hover:text-white transition-all">
            Show Less
          </button>
        )}
        {/* <Link to="contact" spy={true} smooth={true} duration={500}>
          <button className="bg-teal-500 text-white py-2 px-5 rounded-full mt-4 outline hover:shadow-lg hover:bg-teal-700 hover:text-white transition-all">
            Learn More
          </button>
        </Link> */}
      </div>
    </div>

      {/* Testimonials  */}
      <div className="min-h-[80vh] flex flex-col items-center justify-center md:px-32 px-5">
        <h1 className="text-4xl font-semibold">Testimonials</h1>

        <div className="flex flex-col md:flex-row gap-5 mt-5">
          <div className="w-full md:w-1/3 bg-white border-2 border-lightText md:border-none p-5 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <div>
              <p className="text-lightText">
                <b>Emily W. - Marketing Professional</b>
                <br></br>
                "SmartFolio transformed my job search! The resume builder made
                creating a standout CV a breeze. Thanks to SmartFolio, I landed
                my dream job in no time."
              </p>
            </div>

            <div className="flex flex-row justify-center">
              <img className="rounded-full w-1/4 pt-5" src={pic1} alt="img" />
            </div>
          </div>

          <div className="w-full md:w-1/3 bg-white border-2 border-lightText md:border-none p-5 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <div>
              <p className="text-lightText">
                <b>John M. - Graphic Designer </b> <br></br>
                "I'm blown away by SmartFolio's portfolio feature. It allowed me
                to showcase my design projects beautifully. My clients love it,
                and I've seen an increase in new business opportunities."
              </p>
            </div>

            <div className="flex flex-row justify-center">
              <img className="rounded-full w-1/4 pt-5" src={pic2} alt="img" />
            </div>
          </div>

          <div className="w-full md:w-1/3 bg-white border-2 border-lightText md:border-none p-5 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <div>
              <p className="text-lightText">
                <b> Sarah T. - Recent Graduate</b> <br></br>
                "As a recent graduate, I was struggling with my first job
                applications. SmartFolio's cover letter creator gave me the
                confidence I needed. I got interviews and offers right away.
                Thank you, SmartFolio!"
              </p>
            </div>

            <div className="flex flex-row justify-center">
              <img className="rounded-full w-1/4 pt-5" src={pic3} alt="img" />
            </div>
          </div>
        </div>
      </div>
      {/* Contact Section */}
      <div className="min-h-screen flex flex-col items-center justify-center md:mx-32 mx-5 mt-20 p-20   ">
        <h1 className="text-4xl font-semibold">
          {" "}
          Contact 
          <span className="text-teal-500"> Us</span>
        </h1>

        <div className="flex flex-col md:flex-row justify-between w-full ">
          <form>
            <div className="flex flex-col mt-10">
              <label
                htmlFor="userName"
                className="text-lg mb-2 text-black"
              >
                Name
              </label>
              <input
                className="border border-teal-500 py-3 px-4 rounded-lg text-xl w-80 focus:ring-2 focus:ring-green-300 focus:border-transparent hover:shadow-md"
                type="text"
                name="userName"
                id="userName"
                placeholder="Enter Your Name"
              />
            </div>

            <div className="flex flex-col mt-4">
              <label
                htmlFor="userEmail"
                className="text-lg mb-2 text-black"
              >
                Email
              </label>
              <input
                className="border border-teal-500 py-3 px-4 rounded-lg text-xl w-80 focus:ring-2 focus:ring-green-300 focus:border-transparent hover:shadow-md"
                type="text"
                name="userEmail"
                id="userEmail"
                placeholder="Enter Your Email"
              />
            </div>

            <div className="flex flex-col mt-4">
              <label
                htmlFor="userNumber"
                className="text-lg mb-2 text-black"
              >
                Mobile Number
              </label>
              <input
                className="border border-teal-500 py-3 px-4 rounded-lg text-xl w-80 focus:ring-2 focus:ring-green-300 focus:border-transparent hover:shadow-md"
                type="text"
                name="userNumber"
                id="userNumber"
                placeholder="Enter Your Number"
              />
            </div>

            <div className="flex justify-center mt-6">
              <button
                className="bg-teal-500 text-white py-2 px-5 rounded-full mt-4 outline hover:shadow-[] hover:bg-teal-700 hover:text-white transition-all"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </form>

          <div className="w-full md:w-2/6">
            <img src={contact} alt="img" />
          </div>
        </div>
      </div>
      {/* FooterComponent */}
      <footer className="bg-gray-100 text-black text-center p-4">
        SmartFolio 2024 © All Rights Reserved.
      </footer>
    </div>
  );
};

export default Home;
