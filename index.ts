#!/usr/bin/env bun

import { Command } from "commander";
import { runWakeUp } from "./tui/wakeup";

const program = new Command();

program
    .name("sudx")
    .description("sudharshan-bot")
    .version("0.0.1")

program
    .command("wakeup")
    .description('Show the banner to user to select the option')
    .action(async() => {
        await runWakeUp()
    })

await program.parseAsync(process.argv)    