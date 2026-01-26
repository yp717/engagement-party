"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import RibbonSketch from "./ribbon-sketch";

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: "",
    dietary: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission (API route or form service)
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="h-screen flex items-center justify-center py-24 md:py-32 px-4 bg-transparent">
      <RibbonSketch className="text-primary w-64" />
    </section>
  );
}
