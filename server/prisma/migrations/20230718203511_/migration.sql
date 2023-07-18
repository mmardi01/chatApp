-- CreateTable
CREATE TABLE "SocketId" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SocketId_id_key" ON "SocketId"("id");

-- AddForeignKey
ALTER TABLE "SocketId" ADD CONSTRAINT "SocketId_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
