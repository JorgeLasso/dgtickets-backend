-- CreateTable
CREATE TABLE "TicketDemo" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "handleAtModule" TEXT,
    "handleAt" TIMESTAMP(3),
    "done" BOOLEAN NOT NULL,

    CONSTRAINT "TicketDemo_pkey" PRIMARY KEY ("id")
);
