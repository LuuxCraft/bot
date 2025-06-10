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

import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { events } from "./@types/event.js";

config();

const client = new Client({ intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });

const clientEvents = readdirSync(join(import.meta.dirname, "events")).filter(file => file.endsWith(".js") || file.endsWith(".ts"));

for (const file of clientEvents) {
    const event = await import(join("file://", import.meta.dirname, "events", file)) as { default: events };
    if ("default" in event) {
        const { default: eventData } = event;
        if ("name" in eventData && "execute" in eventData) {
            if (eventData.once) client.once(eventData.name, eventData.execute.bind(null, client));
            else client.on(eventData.name, eventData.execute.bind(null, client));
        }
        else console.error(`[HANDLER] - Missing name or execute property in file ${file}`)
    }
    else console.error(`[HANDLER] - Missing default export in event ${file}`)
}

client.login(process.env.TOKEN);