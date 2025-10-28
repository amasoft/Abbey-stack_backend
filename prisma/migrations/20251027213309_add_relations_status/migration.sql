-- CreateEnum
CREATE TYPE "RelationShipStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "Relationship" ADD COLUMN     "status" "RelationShipStatus" NOT NULL DEFAULT 'PENDING';
