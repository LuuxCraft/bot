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

import { Colors, EmbedBuilder, MessageCreateOptions } from "discord.js";

const constants = {
    STATUS_GUILD_ID: "819729377650278420",
    STICKY: [{
        channelId: "1381184855768825888",
        timeout: 5 * 1000,
        message: {
            embeds: [
                new EmbedBuilder()
                    .setColor(Colors.Yellow)
                    .setTitle("À propos de ce salon")
                    .setDescription("Ce salon est actuellement utilisé comme test pour la fonction Sticky.\nLe principe consiste à simplement envoyer un message en bas du salon quand une certaine inactivité est détectée dans ledit salon.")
            ]
        } as MessageCreateOptions
    }]
};

export default constants;
