-- Copyright (C) 2025 GeekCorner
--
--This program is free software: you can redistribute it and/or modify
--it under the terms of the GNU Affero General Public License as published
--by the Free Software Foundation, either version 3 of the License, or
--(at your option) any later version.
--
--This program is distributed in the hope that it will be useful,
--but WITHOUT ANY WARRANTY; without even the implied warranty of
--MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
--GNU Affero General Public License for more details.
--
--You should have received a copy of the GNU Affero General Public License
--along with this program.  If not, see <https://www.gnu.org/licenses/>.

-- CreateTable
CREATE TABLE "StickyMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "channelId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "StickyMessage_channelId_key" ON "StickyMessage"("channelId");

-- CreateIndex
CREATE UNIQUE INDEX "StickyMessage_messageId_key" ON "StickyMessage"("messageId");
