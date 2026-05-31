import { select, isCancel } from "@clack/prompts";
import chalk from "chalk";
import figlet from "figlet";
import { runCliMode } from "../modes/cli";

const BANNER_FONT = 'ANSI Shadow';
const SHADOW = chalk.hex('#5b4d9e');
const FACE = chalk.hex('#e8dcf8').bold;

function printBannerWithShadow(ascii: string) {
  const bannerLines = ascii.replace(/\s+$/, '').split('\n');
  const maxLen = Math.max(...bannerLines.map(l => l.length), 0);
  const rowwidth = maxLen + 2;

  for (const line of bannerLines) {
    console.log(SHADOW('  ' + line).padEnd(rowwidth));
  }

  process.stdout.write(`\x1b[${bannerLines.length}A`);
  for (const line of bannerLines) {
    console.log(FACE(line.padEnd(rowwidth)));
  }
  console.log();
}


export async function runWakeUp() {
    let ascii: string;

    try {
        ascii = figlet.textSync("sudx", {font:BANNER_FONT})
    } catch (error) {
        ascii = figlet.textSync("sudx", {font: "Standard"})
    }
    printBannerWithShadow(ascii)

    const mode = await select({
        message: "Select which mode you want to work with?", 
        options: [
            {value: "cli", label: "CLI"}, 
            {value: "telegram", label: "Telegram"},
            {value: "exit", label: "Exist"}
        ]
    });
    if(mode === "exit") {
        console.log(chalk.dim('\n Bye Bye \n'))
    }
    if(mode === "cli") {
        console.log(chalk.dim("Starting cli mode"));
        await runCliMode()
    }

    else if(mode === "telegram") {
        console.log("Starting telegram mode")
    }
}