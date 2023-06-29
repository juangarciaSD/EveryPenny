-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('Entertainment', 'Fees', 'Groceries', 'Health', 'Mortgage', 'Restaurants', 'Shopping', 'Transportation', 'Travel', 'Utilites', 'Other');

-- CreateEnum
CREATE TYPE "FrequencyType" AS ENUM ('Weekly', 'EveryOtherWeek', 'Monthly', 'EveryOtherMonth', 'Every3months', 'Every6Months', 'Yearly', 'OneTimeOnly');

-- CreateTable
CREATE TABLE "Bill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "frequency" "FrequencyType" NOT NULL DEFAULT 'OneTimeOnly',
    "due_date" TIMESTAMP(3) NOT NULL,
    "category" "CategoryType" NOT NULL DEFAULT 'Other',
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
