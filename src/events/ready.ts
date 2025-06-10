/*
    Copyright (C) 2025 GeekCorner

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { ActivityType, Events, PresenceData, PresenceUpdateStatus } from "discord.js";
import { events } from "../@types/event.js";
import constants from "../constants.js";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const event: events<Events.ClientReady> = {
    name: Events.ClientReady,
    execute: async (client) => {
        console.log("Connecté en tant que " + client.user.tag);
        const statuses: PresenceData[] = [{
            status: PresenceUpdateStatus.Online,
            activities: [{
                type: ActivityType.Playing,
                name: "modérer le serveur"
            }]
        }, {
            status: PresenceUpdateStatus.Online,
            activities: [{
                type: ActivityType.Watching,
                name: `${(await client.guilds.fetch(constants.STATUS_GUILD_ID)).memberCount} membres`
            }]
        }];
        function setStatus() {
            client.user.setPresence(statuses[Math.floor(Math.random() * statuses.length)])
        }
        setStatus();
        setInterval(setStatus, 60 * 60 * 1000);

        for (const sticky of constants.STICKY) {
            const channel = await client.channels.fetch(sticky.channelId);
            if (!channel) throw new Error(`[Sticky] - Unable to find <#${sticky.channelId}>`);
            if (!channel.isTextBased() || !channel.isSendable()) throw new Error(`[Sticky] - <#${sticky.channelId}> is not a text channel or I don't have the permission to send in this message`)
            const lastMessage = await channel.messages.fetch({ limit: 1 });
            if (lastMessage.at(0).author.id === client.user.id) return;
            const msg = await channel.send(sticky.message)
            const dbReq = await prismaClient.stickyMessage.findFirst({
                where: {
                    channelId: sticky.channelId
                }
            });
            if (dbReq) {
                await channel.messages.delete(dbReq.messageId).catch(err => {
                    console.error(`[Sticky] - Unable to delete the message ${dbReq.messageId} in <#${dbReq.channelId}>: ${err}`)
                });
                await prismaClient.stickyMessage.update({
                    where: {
                        channelId: sticky.channelId
                    },
                    data: {
                        channelId: sticky.channelId,
                        messageId: msg.id
                    }
                });
            }
            else await prismaClient.stickyMessage.create({
                data: {
                    channelId: sticky.channelId,
                    messageId: msg.id
                }
            });
        }
    }
}

export default event;
