import React from "react";
import classes from "./Card.module.scss";
import Modal from "../Modal/Modal";
import { motion } from "framer-motion";
const Card = (props) => {
  const { onClose } = props;
  return (
    <>
      <Modal onClose={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.5, transform: 'translateX(-50%)' }}
        animate={{ opacity: 1, scale: 1, transform: 'translateX(-50%)' }}
        exit={{ opacity: 0, scale: 0.5, transform: 'translateX(-50%)' }}
        className={`${classes.card} ${props.className}`}
      >
        {props.children}
      </motion.div>
    </>
  );
};

export default Card;
