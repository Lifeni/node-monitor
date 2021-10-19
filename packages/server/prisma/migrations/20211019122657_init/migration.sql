-- CreateTable
CREATE TABLE "SystemInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "systemId" INTEGER NOT NULL,
    "osId" INTEGER NOT NULL,
    "cpuId" INTEGER NOT NULL,

    CONSTRAINT "SystemInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "System" (
    "id" SERIAL NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "virtual" BOOLEAN NOT NULL,

    CONSTRAINT "System_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Os" (
    "id" SERIAL NOT NULL,
    "platform" TEXT NOT NULL,
    "distro" TEXT NOT NULL,
    "release" TEXT NOT NULL,
    "arch" TEXT NOT NULL,
    "hostname" TEXT NOT NULL,

    CONSTRAINT "Os_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cpu" (
    "id" SERIAL NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "speed" DOUBLE PRECISION NOT NULL,
    "cores" INTEGER NOT NULL,
    "physicalCores" INTEGER NOT NULL,
    "processors" INTEGER NOT NULL,

    CONSTRAINT "Cpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Network" (
    "id" SERIAL NOT NULL,
    "iface" TEXT NOT NULL,
    "ip4" TEXT NOT NULL,
    "ip6" TEXT NOT NULL,
    "mac" TEXT NOT NULL,
    "systemInfoId" INTEGER,

    CONSTRAINT "Network_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disk" (
    "id" SERIAL NOT NULL,
    "fs" TEXT NOT NULL,
    "size" BIGINT NOT NULL,
    "used" BIGINT NOT NULL,
    "available" BIGINT NOT NULL,
    "use" DOUBLE PRECISION NOT NULL,
    "mount" TEXT NOT NULL,
    "systemInfoId" INTEGER,

    CONSTRAINT "Disk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemLoad" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "load" DOUBLE PRECISION NOT NULL,
    "cpu" DOUBLE PRECISION[],
    "memoryId" INTEGER NOT NULL,

    CONSTRAINT "SystemLoad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Memory" (
    "id" SERIAL NOT NULL,
    "total" BIGINT NOT NULL,
    "free" BIGINT NOT NULL,
    "used" BIGINT NOT NULL,
    "available" BIGINT NOT NULL,
    "swaptotal" BIGINT NOT NULL,
    "swapused" BIGINT NOT NULL,
    "swapfree" BIGINT NOT NULL,
    "buffcache" BIGINT NOT NULL,

    CONSTRAINT "Memory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SystemInfo_name_key" ON "SystemInfo"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SystemInfo_time_key" ON "SystemInfo"("time");

-- CreateIndex
CREATE UNIQUE INDEX "SystemInfo_systemId_key" ON "SystemInfo"("systemId");

-- CreateIndex
CREATE UNIQUE INDEX "SystemInfo_osId_key" ON "SystemInfo"("osId");

-- CreateIndex
CREATE UNIQUE INDEX "SystemInfo_cpuId_key" ON "SystemInfo"("cpuId");

-- CreateIndex
CREATE INDEX "SystemInfo_name_time_idx" ON "SystemInfo"("name", "time");

-- CreateIndex
CREATE UNIQUE INDEX "SystemLoad_time_key" ON "SystemLoad"("time");

-- CreateIndex
CREATE UNIQUE INDEX "SystemLoad_memoryId_key" ON "SystemLoad"("memoryId");

-- CreateIndex
CREATE INDEX "SystemLoad_name_time_idx" ON "SystemLoad"("name", "time");

-- AddForeignKey
ALTER TABLE "SystemInfo" ADD CONSTRAINT "SystemInfo_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemInfo" ADD CONSTRAINT "SystemInfo_osId_fkey" FOREIGN KEY ("osId") REFERENCES "Os"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemInfo" ADD CONSTRAINT "SystemInfo_cpuId_fkey" FOREIGN KEY ("cpuId") REFERENCES "Cpu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Network" ADD CONSTRAINT "Network_systemInfoId_fkey" FOREIGN KEY ("systemInfoId") REFERENCES "SystemInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disk" ADD CONSTRAINT "Disk_systemInfoId_fkey" FOREIGN KEY ("systemInfoId") REFERENCES "SystemInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemLoad" ADD CONSTRAINT "SystemLoad_memoryId_fkey" FOREIGN KEY ("memoryId") REFERENCES "Memory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
