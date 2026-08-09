import Link from "next/link";

import { Mail } from "lucide-react";

import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import { Logo } from "@/components/ui/logo";

const productLinks = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Preview",
    href: "#preview",
  },
  {
    label: "FAQ",
    href: "#faq",
  },
];

const authLinks = [
  {
    label: "Sign In",
    href: "/login",
  },
  {
    label: "Create Account",
    href: "/register",
  },
];

const legalLinks = [
  {
    label: "Privacy Policy",
    href: "/privacy",
  },
  {
    label: "Terms of Service",
    href: "/terms",
  },
];

const socials = [
  {
    icon: FaFacebook,
    href: "#",
  },
  {
    icon: FaXTwitter,
    href: "#",
  },
  {
    icon: FaInstagram,
    href: "#",
  },
  {
    icon: FaLinkedin,
    href: "#",
  },
  {
    icon: FaGithub,
    href: "#",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0B1215]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Logo />

            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-300">
              Notefy is a modern productivity platform
              designed to help you organize notes,
              reminders, and daily tasks with simplicity
              and elegance.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map((social, index) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={index}
                    href={social.href}
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-slate-100
                      transition-all
                      duration-300
                      hover:bg-[#6A89A7]
                      hover:text-white
                      dark:bg-slate-800
                    "
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Product
            </h3>

            <ul className="mt-5 space-y-4">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-600 transition-colors hover:text-[#6A89A7] dark:text-slate-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Account
            </h3>

            <ul className="mt-5 space-y-4">
              {authLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-600 transition-colors hover:text-[#6A89A7] dark:text-slate-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Contact
            </h3>

            <div className="mt-5 flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 text-[#6A89A7]" />

              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Email
                </p>

                <a
                  href="mailto:notefysupport@gmail.com"
                  className="text-slate-600 hover:text-[#6A89A7] dark:text-slate-300"
                >
                  notefysupport@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-medium text-slate-900 dark:text-white">
                Legal
              </h4>

              <ul className="mt-4 space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-600 transition-colors hover:text-[#6A89A7] dark:text-slate-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 md:flex-row">
          <p>
            © {new Date().getFullYear()} Notefy. All rights
            reserved.
          </p>

          <p>
            Designed and developed with ❤️ for productive
            people.
          </p>
        </div>
      </div>
    </footer>
  );
}