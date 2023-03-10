-- CreateTable
CREATE TABLE "webhook_token" (
    "token" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("token")
);

-- AddForeignKey
ALTER TABLE "webhook_token" ADD FOREIGN KEY ("userId") REFERENCES "users"("phoneHash") ON DELETE CASCADE ON UPDATE CASCADE;
