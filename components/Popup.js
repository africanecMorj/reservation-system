import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OptionsPopup({ visible, onClose, parentContainer }) {

  if(visible) parentContainer.style.filter = 'blur(4px)';

return (
    <>
    {visible &&

     <AnimatePresence>
        <motion.div
            className="fixed bottom-5 right-20 w-9/10 h-9/10 p-8 rounded-2xl shadow-2xl z-[9999] backdrop-blur-xl bg-white/20 border border-white/30 overflow-y-scroll"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ opacity: { duration: 0.5 }, y: { duration: 0.5 } }}
        >

        <button
            onClick={onClose}
            className="fixed top-3 right-3 text-[#17153B] font-bold text-xl"
        >
            ✕
        </button>


        
        </motion.div>
    </AnimatePresence>
    }
    </>
  )
}
