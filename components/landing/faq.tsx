"use client";

import { useState } from "react";

import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Is Notefy free to use?",
    answer:
      "Yes. Notefy provides a free experience for creating notes, organizing reminders, and managing your daily tasks. Additional premium features may be introduced in future releases.",
  },
  {
    question: "Can I access my notes on different devices?",
    answer:
      "Yes. Your notes are securely stored in the cloud, allowing you to sign in from another device and continue where you left off.",
  },
  {
    question: "How do reminders work?",
    answer:
      "You can attach a date and time to any note. Notefy will display reminders on your dashboard and calendar, helping you stay organized.",
  },
  {
    question: "Can I recover deleted notes?",
    answer:
      "Deleted notes are first moved to the Archive (or Trash in future updates), allowing you to restore them before permanent deletion.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Notefy uses secure authentication, encrypted passwords, email verification, protected sessions, and follows modern security best practices.",
  },
  {
    question: "Does Notefy support dark mode?",
    answer:
      "Absolutely. You can switch between light and dark mode at any time for a comfortable viewing experience.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] =
    useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex((current) =>
      current === index ? null : index
    );
  }

  return (
    <section
      id="faq"
      className="py-24"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <span className="rounded-full bg-[#6A89A7]/10 px-4 py-1 text-sm font-semibold text-[#6A89A7]">
            Frequently Asked Questions
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 dark:text-white">
            Have questions?
          </h2>

          <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">
            Everything you need to know about Notefy.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="mt-16 space-y-5">
          {faqs.map((faq, index) => {
            const open =
              openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all dark:border-slate-800 dark:bg-[#111A1F]"
              >
                <button
                  type="button"
                  onClick={() =>
                    toggle(index)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-lg font-semibold text-slate-900 dark:text-white">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-[#6A89A7] transition-transform duration-300",
                      open &&
                        "rotate-180"
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    open
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-slate-200 px-6 py-5 dark:border-slate-800">
                      <p className="leading-7 text-slate-600 dark:text-slate-300">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}