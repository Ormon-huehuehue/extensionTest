import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { fetchUserDivison } from "@src/lib/lib";

const questions = [
  {
    id: "expertise",
    question: "What is your primary area of expertise?",
    options: [
      "Thought Leadership Strategy",
      "Personal Branding",
      "B2B Content Marketing",
      "Other",
    ],
    type: "radio",
  },
  {
    id: "audience",
    question: "Who are you trying to reach on LinkedIn?",
    options: [
      "Fortune 1000 executives",
      "Small and Medium Business (SMB) owners",
      "Startups & Entrepreneurs",
      "Other",
    ],
    type: "radio",
  },
  {
    id: "activity",
    question: "How active are you currently on LinkedIn?",
    options: [
      "Beginner (Rarely post or engage)",
      "Intermediate (Post occasionally, engage sometimes)",
      "Pro (Post frequently, actively engage)",
    ],
    type: "radio",
  },
  {
    id: "frequency",
    question: "How often do you post on LinkedIn?",
    options: [
      "Rarely (Less than once per week)",
      "Occasionally (1-3 times per week)",
      "Frequently (4-6 times per week)",
      "Daily (7+ times per week)",
    ],
    type: "radio",
  },
  {
    id: "profileUrl",
    question: "LinkedIn Profile URL",
    type: "text",
  },
];

export default function OnboardingSurvey() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const isLastStep = step === questions.length - 1;

  const handleNext = () => {
    if (!isLastStep) setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  const handleChange = (value : string) => {
    setAnswers({ ...answers, [questions[step].id]: value });
  };

  const handleSubmit = async()=>{
    console.log("handling submit for you bbg")
    const userLevel = await fetchUserDivison(JSON.stringify(answers))

    console.log("User Division : ", userLevel)
  }

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${((step + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">{questions[step].question}</h2>
        {questions[step].type === "radio" ? (
          <div className="space-y-2">
            {questions[step].options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${questions[step].id}`}
                  value={option}
                  onChange={() => handleChange(option)}
                  className="w-4 h-4"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        ) : (
          <input
            type="text"
            placeholder="Enter your profile URL"
            onChange={(e) => handleChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        )}
      </motion.div>
      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className="px-4 py-2 border rounded-md bg-gray-300 disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={isLastStep ?handleSubmit : handleNext }
          className="px-4 py-2 border rounded-md bg-blue-600 text-white"
        >
          {isLastStep ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}