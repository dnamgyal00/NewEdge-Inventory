-- CreateTable
CREATE TABLE "MonthReport" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "opening_bal" INTEGER NOT NULL DEFAULT 0,
    "closing_bal" INTEGER NOT NULL,
    "stock_in_qty" INTEGER NOT NULL,
    "stock_out_qty" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MonthReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MonthReport_item_id_year_month_key" ON "MonthReport"("item_id", "year", "month");

-- AddForeignKey
ALTER TABLE "MonthReport" ADD CONSTRAINT "MonthReport_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
