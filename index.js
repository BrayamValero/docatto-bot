const fs = require("node:fs");
const path = require("node:path");

// Require the necessary discord.js classes
const {
  Client,
  Collection,
  GatewayIntentBits,
  IntentsBitField,
} = require("discord.js");

// Requiring DOT_ENV
const dotenv = require("dotenv");
dotenv.config();

// [Privileged Gateway Intents] => Adding new Intents
const myIntents = new IntentsBitField();

myIntents.add(
  IntentsBitField.Flags.GuildPresences,
  IntentsBitField.Flags.GuildMessages,
  IntentsBitField.Flags.GuildMembers,
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildBans,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.DirectMessages
);

// Creating a new client instance
const client = new Client({ intents: myIntents });

client.commands = new Collection();

// [Events] => Extracting command files from DIR
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

// [Events] => Extracting event files from DIR
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
