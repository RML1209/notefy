"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ChangeEvent, FormEvent } from "react";

import {
  Camera,
  CheckCircle2,
  Mail,
  Trash2,
  Upload,
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

export function ProfileForm({ user }: ProfileFormProps) {

  const router = useRouter();
  // --------------------------------------------------
  // Profile state
  // --------------------------------------------------

  const [name, setName] = useState(user.name ?? "");
  const [image, setImage] = useState(user.image ?? "");

  // --------------------------------------------------
  // UI state
  // --------------------------------------------------

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  const [isPending, startTransition] = useTransition();

  // --------------------------------------------------
  // Profile name / general information
  // --------------------------------------------------

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
          result.message ?? "Failed to update your profile."
        );

        return;
      }

      setMessage(
        "Your profile has been updated successfully."
      );

      if (result.user) {
        setName(result.user.name ?? "");
        setImage(result.user.image ?? "");
      }

      setTimeout(() => {
        setMessage("");
      }, 3000);
    });
  }

  // --------------------------------------------------
  // Remove profile image
  // --------------------------------------------------

 function handleRemoveImage() {
  setMessage("");
  setError("");

  startTransition(async () => {
    const result = await updateProfile({
      name,
      image: null,
    });

    if (!result.success) {
      setError(
        result.message ??
          "Failed to remove your profile image."
      );

      return;
    }

    setImage("");

    setMessage(
      "Profile image removed successfully."
    );

    if (result.user) {
      setName(result.user.name ?? "");
      setImage(result.user.image ?? "");
    }

    router.refresh();

    setTimeout(() => {
      setMessage("");
    }, 3000);
  });
}

  // --------------------------------------------------
  // Upload profile image
  // --------------------------------------------------

  async function handleImageUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setMessage("");
    setError("");

    // --------------------------------------------------
    // Allowed image types
    // --------------------------------------------------

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Only JPG, PNG, WEBP, and GIF images are allowed."
      );

      event.target.value = "";
      return;
    }

    // --------------------------------------------------
    // Maximum image size = 5 MB
    // --------------------------------------------------

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError("Image must be smaller than 5 MB.");

      event.target.value = "";
      return;
    }

    // --------------------------------------------------
    // Prepare FormData
    // --------------------------------------------------

    const formData = new FormData();

    formData.append("file", file);

    try {
      setIsUploading(true);

      // --------------------------------------------------
      // Send image to our Next.js API
      // --------------------------------------------------

      const response = await fetch(
        "/api/cloudinary/upload-profile",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      // --------------------------------------------------
      // Check upload response
      // --------------------------------------------------

      if (!response.ok || !result.success) {
        setError(
          result.message ??
            "Failed to upload profile image."
        );

        return;
      }

      if (!result.imageUrl) {
        setError(
          "Cloudinary did not return an image URL."
        );

        return;
      }

      const uploadedImageUrl = result.imageUrl;

      // --------------------------------------------------
      // Immediately update the preview
      // --------------------------------------------------

      setImage(uploadedImageUrl);

      // --------------------------------------------------
      // Save Cloudinary URL to PostgreSQL
      // --------------------------------------------------

      const profileResult = await updateProfile({
        name: name.trim(),
        image: uploadedImageUrl,
      });

      if (!profileResult.success) {
        setError(
          profileResult.message ??
            "Image uploaded, but it could not be saved to your profile."
        );

        return;
      }

      // --------------------------------------------------
      // Update state using database response
      // --------------------------------------------------

      if (profileResult.user) {
        setName(profileResult.user.name ?? "");
        setImage(profileResult.user.image ?? "");
      }

      setMessage(
        "Profile image updated successfully."
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (uploadError) {
      console.error(
        "Profile image upload error:",
        uploadError
      );

      setError(
        "Something went wrong while uploading the image."
      );
    } finally {
      setIsUploading(false);

      // Allow the user to select the same image again
      event.target.value = "";
    }
  }

  // --------------------------------------------------
  // Display values
  // --------------------------------------------------

  const displayName = name.trim() || "User";

  const avatarLetter =
    displayName.charAt(0).toUpperCase();

  const isBusy = isUploading || isPending;

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* ==================================================
          PROFILE PREVIEW
          ================================================== */}

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
                width={112}
                height={112}
                priority
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

            {/* Camera badge */}
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

          {/* Name */}
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

          {/* Email */}
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

          {/* Account status */}
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

      {/* ==================================================
          PROFILE FORM
          ================================================== */}

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
        {/* Header */}
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
          {/* ==================================================
              NAME
              ================================================== */}

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
                disabled={isBusy}
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

          {/* ==================================================
              EMAIL
              ================================================== */}

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
              Your email address is managed by your account and
              cannot be changed here.
            </p>
          </div>

          {/* ==================================================
              PROFILE IMAGE
              ================================================== */}

          <div>
            <label
              htmlFor="profile-image"
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

            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-slate-300
                bg-slate-50
                p-5
                dark:border-slate-700
                dark:bg-[#0B1215]
              "
            >
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                {/* Small Preview */}
                {image.trim() ? (
                  <Image
                    src={image}
                    alt={displayName}
                    width={80}
                    height={80}
                    className="
                      h-20
                      w-20
                      shrink-0
                      rounded-full
                      border-2
                      border-slate-200
                      object-cover
                      dark:border-slate-700
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-20
                      w-20
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#6A89A7]
                      text-2xl
                      font-bold
                      text-white
                    "
                  >
                    {avatarLetter}
                  </div>
                )}

                {/* Upload controls */}
                <div className="flex flex-1 flex-col items-center gap-3 sm:items-start">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {image.trim()
                        ? "Profile image selected"
                        : "Choose a profile image"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Upload a JPG, PNG, WEBP, or GIF image.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                    {/* ==================================================
                        CUSTOM IMAGE UPLOAD
                        ================================================== */}

                    <label
                      htmlFor="profile-image"
                      className={`
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-[#6A89A7]
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        shadow-sm
                        transition
                        hover:bg-[#587690]
                        ${
                          isBusy
                            ? "cursor-not-allowed opacity-60"
                            : "cursor-pointer"
                        }
                      `}
                    >
                      <Upload className="h-4 w-4" />

                      {isUploading
                        ? "Uploading..."
                        : "Choose Image"}
                    </label>

                    {/* Hidden browser file input */}
                    <input
                      id="profile-image"
                      name="profile-image"
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,.gif,image/jpeg,image/png,image/webp,image/gif"
                      onChange={handleImageUpload}
                      disabled={isBusy}
                      className="hidden"
                    />

                    {/* ==================================================
                        REMOVE IMAGE
                        ================================================== */}

                    {image.trim() && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        disabled={isBusy}
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
                          border
                          border-slate-300
                          px-4
                          py-2.5
                          text-sm
                          font-medium
                          text-slate-700
                          transition
                          hover:bg-slate-100
                          disabled:cursor-not-allowed
                          disabled:opacity-60
                          dark:border-slate-700
                          dark:text-slate-300
                          dark:hover:bg-slate-800
                        "
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Maximum file size: 5 MB. Only image files are
              accepted.
            </p>
          </div>

          {/* ==================================================
              SUCCESS MESSAGE
              ================================================== */}

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

          {/* ==================================================
              ERROR MESSAGE
              ================================================== */}

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

          {/* ==================================================
              SAVE CHANGES
              ================================================== */}

          <div
            className="
              flex
              justify-end
              border-t
              border-slate-200
              pt-6
              dark:border-slate-700
            "
          >
            <button
              type="submit"
              disabled={isBusy}
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