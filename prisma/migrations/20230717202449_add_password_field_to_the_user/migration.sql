/*
  Warnings:

  - Added the required column `refresh_token_expires_in` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OdooVersion" AS ENUM ('ODOO_10', 'ODOO_11', 'ODOO_12', 'ODOO_13', 'ODOO_14', 'ODOO_15', 'ODOO_16');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "refresh_token_expires_in" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;

-- CreateTable
CREATE TABLE "OdooSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "port" TEXT NOT NULL DEFAULT '8080',
    "db" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "odooVersion" "OdooVersion" NOT NULL DEFAULT 'ODOO_16',

    CONSTRAINT "OdooSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OdooModel" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "odooSessionId" TEXT NOT NULL,

    CONSTRAINT "OdooModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OdooSession_odooVersion_key" ON "OdooSession"("odooVersion");

-- CreateIndex
CREATE UNIQUE INDEX "OdooModel_name_key" ON "OdooModel"("name");

-- AddForeignKey
ALTER TABLE "OdooSession" ADD CONSTRAINT "OdooSession_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OdooModel" ADD CONSTRAINT "OdooModel_odooSessionId_fkey" FOREIGN KEY ("odooSessionId") REFERENCES "OdooSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
