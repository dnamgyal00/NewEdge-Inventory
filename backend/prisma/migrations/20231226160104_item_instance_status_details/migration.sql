-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_category_id_fkey";

-- DropForeignKey
ALTER TABLE "ItemInstance" DROP CONSTRAINT "ItemInstance_item_id_fkey";

-- DropForeignKey
ALTER TABLE "ItemInstance" DROP CONSTRAINT "ItemInstance_stock_in_id_fkey";

-- AlterTable
ALTER TABLE "ItemInstance" ADD COLUMN     "status_details" TEXT;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInstance" ADD CONSTRAINT "ItemInstance_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInstance" ADD CONSTRAINT "ItemInstance_stock_in_id_fkey" FOREIGN KEY ("stock_in_id") REFERENCES "StockIn"("id") ON DELETE CASCADE ON UPDATE CASCADE;
