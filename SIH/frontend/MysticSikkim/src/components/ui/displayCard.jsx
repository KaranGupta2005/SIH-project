"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


export const DisplayCard = ({
  name,
  photo,
  description = [],
  onView360,
  className = "displaycard",
  ...props
}) => {
  return (
    <motion.div
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        boxShadow:
          "0 16px 48px rgba(251,191,36,0.35), 0 0 24px rgba(253,224,71,0.25)",
      }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative flex flex-col rounded-3xl overflow-hidden border-4 border-amber-50/20 bg-gradient-to-br from-gray-900/85 via-gray-800/80 to-gray-900/95 shadow-2xl transition-all duration-500",
        className
      )}
      style={{
        backdropFilter: "blur(15px)",
        border: "1.5px solid rgba(251,191,36,0.2)",
      }}
      {...props}
    >
      {photo && (
        <motion.div
          className="w-full h-60 overflow-hidden rounded-t-3xl"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={photo}
            alt={name || "Monastery"}
            className="w-full h-full object-cover rounded-t-3xl transition-transform duration-500 group-hover:scale-105"
            style={{ boxShadow: "0 8px 32px rgba(253,224,71,0.2)" }}
          />
        </motion.div>
      )}

      <div className="p-6 flex-1 bg-gray-900/60 backdrop-blur-sm relative">
        {name && (
          <>
            <h2 className="text-2xl md:text-3xl font-extrabold text-amber-300 drop-shadow-md">
              {name}
            </h2>
            <div className="h-1 mt-1 w-auto rounded-full bg-gradient-to-r from-amber-400 via-amber-600 to-amber-800"></div>
          </>
        )}
        {Array.isArray(description) ? (
          <ul className="list-disc pl-5 space-y-2 text-amber-100 mt-3">
            {description.map((line, idx) => (
              <li
                key={idx}
                className=" leading-relaxed transition-colors duration-300 hover:text-amber-300"
              >
                {line}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xl font-bold text-amber-100 mt-3">{description}</p>
        )}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.06 }}
          style={{
            boxShadow:
              "0 0 24px 6px rgba(251,191,36,0.25), 0 0 48px 12px rgba(253,224,71,0.2) inset",
            borderRadius: "inherit",
          }}
        />
      </div>

      <div className="p-5 mt-auto bg-gray-900/70 backdrop-blur-sm rounded-b-3xl">
        <Button
          onClick={onView360}
          className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-black font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          View 360°
        </Button>
      </div>

      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.08 }}
        style={{
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.2), rgba(255,255,255,0) 70%)",
          mixBlendMode: "overlay",
          transform: "skewX(-20deg)",
          borderRadius: "inherit",
        }}
      />

      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-5"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/noise.png')",
          opacity: 0.03,
        }}
      />
    </motion.div>
  );
};
