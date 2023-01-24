const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Elimina la cantidad de mensajes que desees")
    .addIntegerOption((option) =>
      option
        .setName("cantidad")
        .setDescription("Cantidad de mensajes a eliminar")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    ),
  async execute(interaction) {
    const amount = await interaction.options.get("cantidad").value;
    console.log(amount);
    const messages = await interaction.channel.messages.fetch({
      limit: amount,
    });
    await interaction.channel.bulkDelete(messages);
    await interaction.reply(`${amount} mensaje(s) eliminados...`);
  },
};
