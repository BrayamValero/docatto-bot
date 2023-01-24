const { Events } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.content === "poop") {
      message
        .reply("You're poop!")
        .then(() => console.log(`Replied to message: "${message.content}"`))
        .catch(console.error);
    }
    if (message.content === "iskel") {
      message
        .reply("Te amo mucho, uwu")
        .then(() => console.log(`Replied to message: "${message.content}"`))
        .catch(console.error);
    }
    if (message.content === "miguel") {
      message
        .reply("¿Tu no has pensado?")
        .then(() => console.log(`Replied to message: "${message.content}"`))
        .catch(console.error);
    }
    if (message.content === "9000") {
      message
        .reply("WHAT?! 9000???")
        .then(() => console.log(`Replied to message: "${message.content}"`))
        .catch(console.error);
    }
    if (message.content === "mimin") {
      message
        .reply("Saludos cordiales, ya no eres mi amigo")
        .then(() => console.log(`Replied to message: "${message.content}"`))
        .catch(console.error);
    }
    if (message.content === "pikachu") {
      const getPokemon = async () => {
        let response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${message.content}`
        );
        const data = await response.json();
        return data;
      };

      let pokemon = await getPokemon();

      message.reply(`#${pokemon.order}: ${pokemon.name}`);
    }
  },
};
