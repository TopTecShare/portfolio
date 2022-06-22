import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import styled, { keyframes, ThemeProvider } from "styled-components";
import { DarkTheme } from "./Themes";

import LogoComponent from "../subComponents/LogoComponent";
import SocialIcons from "../subComponents/SocialIcons";
import PowerButton from "../subComponents/PowerButton";
import ParticleComponent from "../subComponents/ParticleComponent";
import BigTitle from "../subComponents/BigTitlte";
import astronaut from "../assets/Images/spaceman.jpg";

const Box = styled.div`
  background-color: ${(props) => props.theme.body};
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;
const float = keyframes`
0% { transform: translateY(-10px) }
50% { transform: translateY(15px) translateX(15px) }
100% { transform: translateY(-10px) }

`;
const Spaceman = styled.div`
  position: absolute;
  top: 10%;
  right: 5%;
  width: 20vw;
  animation: ${float} 4s ease infinite;
  img {
    width: 100%;
    height: auto;
  }
`;
const Main = styled.div`
  border: 2px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  padding: 2rem;
  width: 50vw;
  height: 60vh;
  z-index: 3;
  line-height: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(0.6rem + 1vw);
  backdrop-filter: blur(4px);

  position: absolute;
  left: calc(5rem + 5vw);
  top: 10rem;
  font-family: "Ubuntu Mono", monospace;
  font-style: italic;
`;

const AboutPage = () => {
  const el = useRef(null);
  const [hover, setHover] = useState(false);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [width, setWidth] = useState(null);

  useEffect(() => {
    setTimeout(calculatePosition, 400);
    window.addEventListener("resize", calculatePosition);
  }, []);

  // const cubeAnimation = (e) => {
  //   el.current.style.transform = "scale(1.2, 1.2)";
  //   el.current.style.transition = "0.5s ease-in-out";
  //   setTimeout(() => {
  //     el.current.style.transform = "scale(1, 1)";
  //     el.current.style.transition = "0.5s ease-in-out";
  //   }, 500);
  //   setTimeout(() => {
  //     el.current.style.transition = "0s ease-in-out";
  //   }, 1000);
  // };

  const calculatePosition = () => {
    gsap.set(el.current, {
      x: 0,
      y: 0,
      scale: 1,
    });
    try {
      const box = el.current.getBoundingClientRect();
      setX(box.left + box.width * 0.5);
      setY(box.top + box.height * 0.5);
      setWidth(box.width);
    } catch (e) {
      return;
    }
  };

  const onMouseMove = (e) => {
    if (window.innerWidth > 768) {
      let hv = false;
      let hoverArea = hover ? 0.7 : 0.5;
      let tx = e.clientX - x;
      let ty = e.clientY - y;
      let distance = Math.sqrt(tx * tx + ty * ty);

      // console.log(
      //   distance,
      //   width,
      //   hoverArea,
      //   distance < width * hoverArea,
      //   hover
      // );
      if (distance < width * hoverArea) {
        hv = true;
        if (!hover) {
          setHover(true);
        }
        onHover(e.clientX, e.clientY);
      }

      if (!hv && hover) {
        onLeave();
        setHover(false);
      }
    }
  };

  const onHover = (tx, ty) => {
    gsap.to(el.current, {
      x: (tx - x) * 0.4,
      y: (ty - y) * 0.4,
      scale: 1.15,
      ease: "Power2.easeOut",
      duration: 0.4,
    });
    el.current.style.zIndex = 10;
  };

  const onLeave = () => {
    if (window.innerWidth > 768) {
      gsap.to(el.current, {
        x: 0,
        y: 0,
        scale: 1,
        ease: "Elastic.easeOut(1.2, 0.4)",
        duration: 0.7,
      });
      el.current.style.zIndex = 1;
    }
  };

  return (
    <ThemeProvider theme={DarkTheme}>
      <Box>
        <LogoComponent theme="dark" />
        <SocialIcons theme="dark" />
        <PowerButton />
        <ParticleComponent theme="dark" />

        <Spaceman>
          <div
            onMouseMove={onMouseMove}
            onMouseLeave={() => {
              if (hover) onLeave();
              setHover(false);
            }}
          >
            <img src={astronaut} ref={el} alt="spaceman" />
          </div>
        </Spaceman>
        <Main>
          <div style={{ fontFamily: "Kajima" }}>
            A full-stack, blockchain developer with 9+ years of experience and
            unrivaled building skills with JS Frameworks (React, Vue), Web Dev
            Stacks (MERN, LAMP), Smart Contract, Version Control (Git),
            Databases (Oracle, MySQL), CMS, Cryptography. <br />
            <br />
            Contributed to 50+ GitHub projects and completed 10+ personal
            full-stack and smart contract projects with 95% client satisfaction.
            <br />
            <br />
            Main goal is to advise the agile business owners and entrepreneurs
            who strive to succeed with great ideas.
          </div>
        </Main>

        <BigTitle text="ABOUT" top="10%" left="5%" />
      </Box>
    </ThemeProvider>
  );
};

export default AboutPage;
