import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import styles from "../styles/ColorFAB.module.scss";
import swoosh from "../assets/sounds/swoosh.mp3";
import bell from "../assets/sounds/bell.mp3";

const colors = ["#F7C873", "#F48C8C", "#C5A7F5", "#59D6F5", "#DDF47A"];

const clickSound = new Audio(bell);
const swooshSound = new Audio(swoosh);

function ColorFAB({ onSelectColor }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAB = () => setIsOpen(!isOpen);

  const handleColorClick = (color) => {
    clickSound.currentTime = 0;
    clickSound.volume = 0.1;
    clickSound.play();
    onSelectColor(color);
  };
  return (
    <div className={styles.fabContainer}>
      <motion.button
        className={styles.fabButton}
        whileTap={{ scale: 0.9, rotate: 90 }}
        onClick={() => {
          swooshSound.currentTime = 0;
          swooshSound.volume = 0.1;
          swooshSound.play();
          toggleFAB();
        }}
      >
        {isOpen ? "✕" : "+"}
      </motion.button>

      <AnimatePresence>
        {isOpen &&
          colors.map((color, index) => (
            <motion.div
              key={color}
              className={styles.colorDot}
              style={{ backgroundColor: color }}
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={{ opacity: 1, y: (index + 1) * 40, scale: 1 }}
              exit={{ opacity: 0, y: 0, scale: 0.1 }}
              transition={{
                type: "spring",
                stiffness: 75, // 🧘 softer bounce
                damping: 30, // 💧 more fluid stop
                mass: 1.0, // ⚖️ slower motion
                delay: index * 0.4, // 🌊 gentle cascading
              }}
              onClick={() => {
                onSelectColor(color);
                handleColorClick(color);
              }}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}

export default ColorFAB;
