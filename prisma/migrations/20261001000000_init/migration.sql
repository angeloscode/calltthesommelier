-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EDITOR');

-- CreateEnum
CREATE TYPE "WineColor" AS ENUM ('WHITE', 'RED', 'ROSE', 'ORANGE', 'SPARKLING');

-- CreateEnum
CREATE TYPE "WineSweetness" AS ENUM ('DRY', 'SEMI_DRY', 'SEMI_SWEET', 'SWEET');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wine" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "vintage" INTEGER NOT NULL,
    "color" "WineColor" NOT NULL,
    "sweetness" "WineSweetness" NOT NULL,
    "appellation" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "origin" TEXT NOT NULL DEFAULT 'Россия, Краснодарский край',
    "grapes" TEXT NOT NULL,
    "aging" TEXT,
    "abv" TEXT NOT NULL,
    "serving" TEXT NOT NULL,
    "appearance" TEXT NOT NULL,
    "aroma" TEXT NOT NULL,
    "taste" TEXT NOT NULL,
    "pairing" TEXT NOT NULL,
    "imageMain" TEXT NOT NULL,
    "imageDetail" TEXT,
    "purchaseUrl" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Wine_slug_key" ON "Wine"("slug");

-- CreateIndex
CREATE INDEX "Wine_published_sortOrder_idx" ON "Wine"("published", "sortOrder");

