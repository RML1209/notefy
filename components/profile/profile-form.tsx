"use client";

import { useState, useTransition } from "react";

import {
  Camera,
  CheckCircle2,
  Mail,
  User,
} from "lucide-react";
import Image from "next/image";
import { updateProfile } from "@/actions/user/update-profile";

interface ProfileFormProps {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };
}

export function ProfileForm({
  user,
}: ProfileFormProps) {
  const [name, setName] = useState(
    user.name ?? ""
  );

  const [image, setImage] = useState(
    user.image ?? ""
  );

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [isPending, startTransition] =
    useTransition();

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    startTransition(async () => {
      const result = await updateProfile({
        name,
        image: image.trim() || null,
      });

      if (!result.success) {
        setError(
          result.error ??
            "Failed to update your profile."
        );

        return;
      }

      setMessage(
        "Your profile has been updated successfully."
      );

      /*
       * Keep the local form synchronized
       * with the updated server response.
       */
      if (result.user) {
        setName(result.user.name ?? "");
        setImage(result.user.image ?? "");
      }

      /*
       * Remove success message after 3 seconds.
       */
      setTimeout(() => {
        setMessage("");
      }, 3000);
    });
  }

  const displayName =
    name.trim() || "User";

  const avatarLetter =
    displayName.charAt(0).toUpperCase();

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Profile Preview */}
      <section
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          transition-colors
          dark:border-slate-700
          dark:bg-[#111A1F]
        "
      >
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative">
            {image.trim() ? (
              <Image
                src={image}
                alt={displayName}
                className="
                  h-28
                  w-28
                  rounded-full
                  border-4
                  border-white
                  object-cover
                  shadow-md
                  dark:border-slate-800
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-28
                  w-28
                  items-center
                  justify-center
                  rounded-full
                  bg-[#6A89A7]
                  text-4xl
                  font-bold
                  text-white
                  shadow-md
                "
              >
                {avatarLetter}
              </div>
            )}

            <div
              className="
                absolute
                bottom-1
                right-1
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border-4
                border-white
                bg-[#6A89A7]
                text-white
                dark:border-[#111A1F]
              "
            >
              <Camera className="h-4 w-4" />
            </div>
          </div>

          <h2
            className="
              mt-5
              text-xl
              font-semibold
              text-slate-900
              dark:text-white
            "
          >
            {displayName}
          </h2>

          <p
            className="
              mt-1
              break-all
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            {user.email}
          </p>

          <div
            className="
              mt-4
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-green-50
              px-3
              py-1.5
              text-xs
              font-medium
              text-green-700
              dark:bg-green-900/20
              dark:text-green-400
            "
          >
            <CheckCircle2 className="h-4 w-4" />
            Active account
          </div>
        </div>
      </section>

      {/* Profile Form */}
      <section
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          transition-colors
          dark:border-slate-700
          dark:bg-[#111A1F]
          sm:p-8
        "
      >
        <div className="mb-8">
          <h2
            className="
              text-xl
              font-semibold
              text-slate-900
              dark:text-white
            "
          >
            Personal Information
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            Update your profile information below.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Name
            </label>

            <div className="relative">
              <User
                className="
                  absolute
                  left-3
                  top-1/2
                  h-5
                  w-5
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                maxLength={100}
                disabled={isPending}
                placeholder="Enter your name"
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  pl-10
                  pr-4
                  text-sm
                  text-slate-900
                  outline-none
                  transition
                  focus:border-[#6A89A7]
                  focus:ring-2
                  focus:ring-[#6A89A7]/20
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  dark:border-slate-700
                  dark:bg-[#0B1215]
                  dark:text-white
                  dark:focus:border-[#6A89A7]
                "
              />
            </div>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Maximum 100 characters.
            </p>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Email address
            </label>

            <div className="relative">
              <Mail
                className="
                  absolute
                  left-3
                  top-1/2
                  h-5
                  w-5
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                id="email"
                type="email"
                value={user.email ?? ""}
                disabled
                readOnly
                className="
                  h-11
                  w-full
                  cursor-not-allowed
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-100
                  pl-10
                  pr-4
                  text-sm
                  text-slate-500
                  outline-none
                  dark:border-slate-700
                  dark:bg-slate-800/50
                  dark:text-slate-400
                "
              />
            </div>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Your email address is managed by your
              account and cannot be changed here.
            </p>
          </div>

          {/* Profile Image */}
          <div>
            <label
              htmlFor="image"
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Profile image
            </label>

            <div className="relative">
              <Camera
                className="
                  absolute
                  left-3
                  top-1/2
                  h-5
                  w-5
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                id="image"
                type="url"
                value={image}
                onChange={(event) =>
                  setImage(event.target.value)
                }
                disabled={isPending}
                placeholder="https://example.com/profile.jpg"
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  pl-10
                  pr-4
                  text-sm
                  text-slate-900
                  outline-none
                  transition
                  focus:border-[#6A89A7]
                  focus:ring-2
                  focus:ring-[#6A89A7]/20
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  dark:border-slate-700
                  dark:bg-[#0B1215]
                  dark:text-white
                  dark:focus:border-[#6A89A7]
                "
              />
            </div>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Enter a public image URL for now. We
              can integrate Cloudinary later.
            </p>
          </div>

          {/* Messages */}
          {message && (
            <div
              className="
                rounded-xl
                border
                border-green-200
                bg-green-50
                px-4
                py-3
                text-sm
                text-green-700
                dark:border-green-900/50
                dark:bg-green-900/20
                dark:text-green-400
              "
            >
              ✓ {message}
            </div>
          )}

          {error && (
            <div
              className="
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-sm
                text-red-700
                dark:border-red-900/50
                dark:bg-red-900/20
                dark:text-red-400
              "
            >
              ✕ {error}
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end border-t border-slate-200 pt-6 dark:border-slate-700">
            <button
              type="submit"
              disabled={isPending}
              className="
                rounded-xl
                bg-[#6A89A7]
                px-6
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-[#587690]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {isPending
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}