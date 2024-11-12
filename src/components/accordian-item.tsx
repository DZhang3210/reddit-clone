import { CaretDownIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordianItemProps {
  index: number;
  title: string;
  content: string;
}

const AccordianItem: React.FC<AccordianItemProps> = ({
  index,
  title,
  content,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className=" last:border-b-0">
      <button
        className="flex w-full justify-between px-2 py-3 text-gray-400/80 text-sm"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="space-x-3 flex items-center">
          <span>{index}</span>
          <div>{title}</div>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white"
        >
          <CaretDownIcon width={20} height={20} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 text-gray-400/80 text-sm">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordianItem;
