-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "item_count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "brand" TEXT,
ALTER COLUMN "qty_on_hand" SET DEFAULT 0;
