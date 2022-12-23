import { Event } from "../../structures/Events";
import { client } from "../..";
import { VoiceChannel } from "discord.js"

export default new Event("voiceStateUpdate", async (oldState, newState) => {
  const queue = client.player.getQueue(oldState.guild.id);
  if (queue || queue?.playing) {
      setTimeout(async () => {
        let botChannel = (oldState?.guild?.channels?.cache?.get(
          queue?.voice?.connection?.joinConfig?.channelId
        ) as VoiceChannel);
        if (botChannel) {
          if (botChannel.id == oldState.channelId)
            if (botChannel?.members?.find((x) => x.id == client?.user?.id)) {
              if (botChannel?.members?.size == 1) {
                await queue?.textChannel
                  ?.send({ content: `I disconnected because there is no one left in my channel. ❌` })
                  .catch((e) => {});
                if (queue || queue?.playing) {
                  return queue?.stop();
                }
              }
            }
        }
      }, 60000);
    }

    if (newState.id === client.user.id) {
      if (oldState.serverMute === false && newState.serverMute === true) {
        if (queue?.textChannel) {
          try {
            await queue?.pause();
          } catch (e) {
            return;
          }
          await queue?.textChannel
            ?.send({ content: `You silenced me while the music was playing. That's why I stopped the music. If you undo the mute, I will continue. 😔` })
            .catch((e) => {});
        }
      }
      if (oldState.serverMute === true && newState.serverMute === false) {
        if (queue?.textChannel) {
          try {
            await queue.resume();
          } catch (e) {
            return;
          }
        }
    }
  }
});
