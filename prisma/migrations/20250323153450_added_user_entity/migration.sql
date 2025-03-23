-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN_ROLE', 'USER_ROLE', 'ADVISER_ROLE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "photo" TEXT,
    "userType" "Role" NOT NULL DEFAULT 'USER_ROLE',
    "email" TEXT NOT NULL,
    "emailValidated" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
