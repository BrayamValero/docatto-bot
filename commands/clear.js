const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Delete up to (100) messages from the current channel")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of messages you want to delete")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    ),
  async execute(interaction) {
    const amount = await interaction.options.get("cantidad").value;
    const messages = await interaction.channel.messages.fetch({
      limit: amount,
    });
    await interaction.channel.bulkDelete(messages);
    await interaction.reply(`${amount} mensaje(s) eliminados...`);
  },
};
