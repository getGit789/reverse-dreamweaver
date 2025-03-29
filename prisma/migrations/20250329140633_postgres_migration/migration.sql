-- CreateTable
CREATE TABLE "UserPrompt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "promptCount" INTEGER NOT NULL DEFAULT 0,
    "lastResetDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPrompt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPrompt_userId_key" ON "UserPrompt"("userId");

-- CreateIndex
CREATE INDEX "UserPrompt_userId_idx" ON "UserPrompt"("userId");

-- CreateIndex
CREATE INDEX "UserPrompt_lastResetDate_idx" ON "UserPrompt"("lastResetDate");
