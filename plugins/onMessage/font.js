import axios from "axios";

const config = {
  name: "font",
  description: "generate styles text",
  usage: "text style",
  cooldown: 3,
  permissions: [0],
  credits: "ArYAN"
};

const available_styles = [
  "bold",
    "italic",
    "monospace",
    "double",
    "wide",
    "circled",
    "inverted",
    "square",
    "squareFilled",
    "parenthesized",
    "script",
    "boldScript",
    "fraktur",
    "boldFraktur",
    "sans",
    "sansBold",
    "sansItalic",
    "sansBoldItalic",
    "underline",
    "strikethrough",
    "subscript",
    "superscript",
    "smallCaps",
    "oldEnglish",
    "blackletter",
    "sparkle",
    "wavy",
    "dots",
    "cross"
];

async function onCall({ message, args }) {
  try {
    const input = args.join(" ");
    const [text, style] = input.split("|").map(item => item.trim());

    if (!text) return message.reply("Please enter text to convert");
    if (!style) return message.reply(`Please specify a style\nAvailable styles: ${available_styles.join(", ")}`);
    if (!available_styles.includes(style)) return message.reply(`Invalid style\nAvailable styles: ${available_styles.join(", ")}`);

    const response = await axios.get(`https://aryan-nix-apis.vercel.app/api/font?style=${styles}&text=${encodeURIComponent(text)}`);
    
    if (!response.data) return message.reply("Failed to generate text");
    
    await message.reply(response.data.result);
    
  } catch (error) {
    console.error(error);
    message.reply("Error occurred while generating text");
  }
}

export default {
  config,
  onCall
};
