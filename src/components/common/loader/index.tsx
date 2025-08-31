"use client";

import { motion } from "framer-motion";

const NotionLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-title"
            animate={{ y: ["0%", "-50%", "0%"] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NotionLoader;
