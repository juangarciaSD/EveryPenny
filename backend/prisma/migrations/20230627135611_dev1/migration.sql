-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "currentBalance" DROP NOT NULL,
ALTER COLUMN "currentBalance" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "subtype" DROP NOT NULL;