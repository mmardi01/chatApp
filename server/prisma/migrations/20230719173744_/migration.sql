-- CreateTable
CREATE TABLE "_contacts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_contacts_AB_unique" ON "_contacts"("A", "B");

-- CreateIndex
CREATE INDEX "_contacts_B_index" ON "_contacts"("B");

-- AddForeignKey
ALTER TABLE "_contacts" ADD CONSTRAINT "_contacts_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_contacts" ADD CONSTRAINT "_contacts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
