const { REST, Routes } = require("discord.js");
const { readdirSync } = require("node:fs");

// Requiring DOT_ENV
const { config } = require("dotenv");
config();

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = readdirSync("./commands").filter((file) =>
  file.endsWith(".js")
);

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // DELETE => Global commands, bellow you can find Guild commands if needed
    // Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID)
    rest
      .put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
        body: [],
      })
      .then(() => console.log("Successfully deleted all application commands."))
      .catch(console.error);

    // PUT => Global commands, bellow you can find Guild commands if needed
    // Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID),
    const data = await rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
