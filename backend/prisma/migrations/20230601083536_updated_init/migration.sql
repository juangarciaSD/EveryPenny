-- CreateEnum
CREATE TYPE "ThemeType" AS ENUM ('LIGHT', 'DARK', 'SYSTEM');

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" SERIAL NOT NULL,
    "notifications" BOOLEAN NOT NULL DEFAULT true,
    "theme" "ThemeType" NOT NULL DEFAULT 'LIGHT',
    "usageData" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userId_key" ON "UserPreference"("userId");

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
