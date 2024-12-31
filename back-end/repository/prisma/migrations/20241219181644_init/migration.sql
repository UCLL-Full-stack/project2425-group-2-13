-- CreateTable
CREATE TABLE "Guide" (
    "id" SERIAL NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "region" TEXT NOT NULL,

    CONSTRAINT "Guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tourist" (
    "id" SERIAL NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "region" TEXT NOT NULL,

    CONSTRAINT "Tourist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tour" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "distance" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "days" INTEGER NOT NULL,
    "guide_id" INTEGER NOT NULL,

    CONSTRAINT "Tour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TourParticipants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Guide_email_key" ON "Guide"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tourist_email_key" ON "Tourist"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_TourParticipants_AB_unique" ON "_TourParticipants"("A", "B");

-- CreateIndex
CREATE INDEX "_TourParticipants_B_index" ON "_TourParticipants"("B");

-- AddForeignKey
ALTER TABLE "Tour" ADD CONSTRAINT "Tour_guide_id_fkey" FOREIGN KEY ("guide_id") REFERENCES "Guide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TourParticipants" ADD CONSTRAINT "_TourParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "Tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TourParticipants" ADD CONSTRAINT "_TourParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "Tourist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
