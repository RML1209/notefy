-- CreateTable
CREATE TABLE "PendingLogin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PendingLogin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PendingLogin_expires_idx" ON "PendingLogin"("expires");

-- CreateIndex
CREATE UNIQUE INDEX "PendingLogin_email_key" ON "PendingLogin"("email");
