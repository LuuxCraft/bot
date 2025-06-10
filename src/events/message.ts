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

import { Events } from "discord.js";
import { events } from "../@types/event.js";
import constants from "../constants.js";
import { PrismaClient } from "@prisma/client";

const timeouts = {};
const prismaClient = new PrismaClient();

const event: events<Events.MessageCreate> = {
    name: Events.MessageCreate,
    execute: (client, message) => {
        const stickyConstants = constants.STICKY.find(s => s.channelId === message.channelId);
        if (message.author.id === client.user.id) return;
        if (!stickyConstants) return;
        if (timeouts[message.channelId]) clearTimeout(timeouts[message.channelId]);
        timeouts[message.channelId] = setTimeout(async () => {
            const lastMessages = await message.channel.messages.fetch({ limit: 5 });
            if (lastMessages) {
                if (lastMessages.at(lastMessages.size - 2).author.id !== client.user.id) {
                    if (message.channel.isSendable()) {
                        const msg = await message.channel.send(stickyConstants.message)
                        const dbReq = await prismaClient.stickyMessage.findFirst({
                            where: {
                                channelId: message.channelId
                            }
                        });
                        if (dbReq) {
                            await message.channel.messages.delete(dbReq.messageId).catch(err => {
                                console.error(`[Sticky] - Unable to delete the message ${dbReq.messageId} in <#${dbReq.channelId}>: ${err}`)
                            });
                            await prismaClient.stickyMessage.update({
                                where: {
                                    channelId: message.channelId
                                },
                                data: {
                                    channelId: message.channelId,
                                    messageId: msg.id
                                }
                            });
                        }
                        else await prismaClient.stickyMessage.create({
                            data: {
                                channelId: message.channelId,
                                messageId: msg.id
                            }
                        });
                    }
                }
            }
            timeouts[message.channelId] = null;
        }, stickyConstants.timeout)
    }
}

export default event;
