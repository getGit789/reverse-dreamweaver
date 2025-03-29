-- CreateTable
CREATE TABLE "UserPrompt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "promptCount" INTEGER NOT NULL DEFAULT 0,
    "lastResetDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPrompt_userId_key" ON "UserPrompt"("userId");

-- CreateIndex
CREATE INDEX "UserPrompt_userId_idx" ON "UserPrompt"("userId");

-- CreateIndex
CREATE INDEX "UserPrompt_lastResetDate_idx" ON "UserPrompt"("lastResetDate");
