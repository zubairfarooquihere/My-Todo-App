import React, { useEffect } from "react";
import classes from "./Modal.module.scss";
import { motion } from "framer-motion";

function Modal(props) {
  const { onClose, zIndex } = props;
  useEffect(() => {
    document.body.style.overflowY = "initial";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      exit={{ opacity: 0 }}
      className={classes.modal}
      style={{zIndex: zIndex ? zIndex : 100}}
      onClick={onClose}
    />
  );
}

export default Modal;
