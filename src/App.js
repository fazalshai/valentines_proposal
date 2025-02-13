import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./App.css";

const valentineDays = [
  { day: "7 Feb - Rose Day", emoji: "🌹", from: "left" },
  { day: "8 Feb - Proposal Day", emoji: "💍", from: "right" },
  { day: "9 Feb - Chocolate Day", emoji: "🍫", from: "left" },
  { day: "10 Feb - Teddy Day", emoji: "🧸", from: "right" },
  { day: "11 Feb - Promise Day", emoji: "🤝", from: "left" },
  { day: "12 Feb - Hug Day", emoji: "🤗", from: "right" },
  { day: "13 Feb - Kiss Day", emoji: "💋", from: "left" },
  { day: "14 Feb - Valentine's Day", emoji: "❤️", from: "right" },
];

function App() {
  const [proposal, setProposal] = useState(false);
  const [response, setResponse] = useState("");
  const [currentDay, setCurrentDay] = useState(0);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [heartRain, setHeartRain] = useState(false);
  const [romanticText, setRomanticText] = useState(false);
  const [musicPlayed, setMusicPlayed] = useState(false);
  const [music2Played, setMusic2Played] = useState(false);
  const music1Ref = useRef(null);
  const music2Ref = useRef(null);

  useEffect(() => {
    // ✅ Initialize audio elements
    music1Ref.current = new Audio("/music1.mp3");
    music2Ref.current = new Audio("/music2.mp3");

    // ✅ Play Music1 automatically
    const playMusic1 = () => {
      if (!musicPlayed) {
        setMusicPlayed(true);
        music1Ref.current.loop = true;
        music1Ref.current.volume = 0.2;
        music1Ref.current.play().catch((error) => console.log("Autoplay blocked:", error));
      }
    };

    // ✅ Try playing after delay to bypass autoplay restrictions
    const timer = setTimeout(() => {
      playMusic1();
    }, 1000);

    return () => clearTimeout(timer);
  }, [musicPlayed]);

  // ✅ Function to play Music2 (Only Once)
  const playMusic2Once = () => {
    if (!music2Played) {
      setMusic2Played(true);
      if (music1Ref.current) {
        music1Ref.current.pause();
      }
      music2Ref.current.volume = 1;
      music2Ref.current.play().catch((error) => console.log("Autoplay blocked:", error));
    }
  };

  useEffect(() => {
    if (currentDay < valentineDays.length) {
      setTimeout(() => {
        setAnimationTriggered(true);
        setTimeout(() => {
          setAnimationTriggered(false);
          setTimeout(() => {
            setCurrentDay((prev) => prev + 1);
          }, 500);
        }, 800);
      }, 800);
    } else {
      setTimeout(() => {
        setProposal(true);
      }, 1000);
    }
  }, [currentDay]);

  return (
    <div className="App">
      <h1>💖 Valentine's Week Special 💖</h1>

      {/* ✅ Romantic Text Below the Title */}
      <motion.h2 className="romantic-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        I don't know how I have been for the past 20 years, but I can't be without you for 2 minutes 💖
      </motion.h2>

      <h2>{valentineDays[currentDay]?.day}</h2>

      <div className="scene">
        <motion.pre className="ascii-man" initial={{ x: "-150px" }} animate={{ x: "-120px" }} transition={{ duration: 1, ease: "easeOut" }}>
{` 👱‍♂️  
 /|)  
 / \\ `}
        </motion.pre>

        {/* ✅ Animate Emojis for Each Valentine's Day */}
        {animationTriggered && (
          <motion.span
            className="moving-object"
            initial={{
              x: valentineDays[currentDay]?.from === "left" ? "-80px" : "80px",
              opacity: 1,
            }}
            animate={{ x: "0px", opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {valentineDays[currentDay]?.emoji}
          </motion.span>
        )}

        <motion.pre className="ascii-woman" initial={{ x: "150px" }} animate={{ x: "120px" }} transition={{ duration: 1, ease: "easeOut" }}>
{`👧 
 <|>  
 / \\ `}
        </motion.pre>
      </div>

      {/* ✅ Proposal after Valentine's Day (Feb 14) */}
      {proposal && (
        <motion.div className="proposal-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <h2>💍 Will You Accept My Love Proposal? 💍</h2>

          {/* ✅ First Yes Button (Direct) */}
          <motion.button
            className="yes-btn"
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              setResponse("YES! ❤️");
              playMusic2Once();
              setHeartRain(true);
              setRomanticText(true);
              setTimeout(() => setHeartRain(false), 2000); // Stop heart rain after 2 seconds
            }}
          >
            Yes ❤️
          </motion.button>

          {/* ✅ Second Yes Button (Indirect) */}
          <motion.button
            className="yes-btn-alt"
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              setResponse("I guess... I have no choice ❤️");
              playMusic2Once();
              setHeartRain(true);
              setRomanticText(true);
              setTimeout(() => setHeartRain(false), 2000); // Stop heart rain after 2 seconds
            }}
          >
            U have no choice ❤️
          </motion.button>
        </motion.div>
      )}

      {response && (
        <motion.h2 className="response" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          {response}
        </motion.h2>
      )}

      {/* ✅ Love Rain Effect After Clicking "Yes" */}
      {heartRain &&
        Array.from({ length: 50 }).map((_, i) => {
          const randomX = Math.random() * 100 + "vw"; // Random X position
          const randomSpeed = 2 + Math.random(); // Random falling speed
          const randomRotation = Math.random() * 360; // Random rotation

          return (
            <motion.span
              key={i}
              className="falling-heart"
              initial={{ opacity: 0, x: randomX, y: "-10vh", rotate: randomRotation }}
              animate={{ opacity: 1, y: "100vh", rotate: randomRotation + 180 }}
              transition={{ duration: randomSpeed, delay: Math.random() * 0.5 }}
              style={{ position: "absolute", left: randomX }}
            >
              ❤️
            </motion.span>
          );
        })}
    </div>
  );
}

export default App;
