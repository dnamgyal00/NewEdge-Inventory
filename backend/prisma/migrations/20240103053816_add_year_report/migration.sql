-- CreateTable
CREATE TABLE "YearReport" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "opening_bal" INTEGER NOT NULL DEFAULT 0,
    "closing_bal" INTEGER NOT NULL,
    "stock_in_qty" INTEGER NOT NULL,
    "stock_out_qty" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YearReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "YearReport" ADD CONSTRAINT "YearReport_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
