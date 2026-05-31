import { isCancel, text } from "@clack/prompts";
import chalk from "chalk";
import { defaultAgentConfig } from "./types";
import { ActionTracker } from "./actionTracker";
import { ToolExecutor } from "./toolExecutor";

export async function runAgentMode() {
    console.log(chalk.bold('\n Agent \n'))

    const goal = await text({
        message: "What you want your agent to do?",
        placeholder: "Concreate task for your codebase"
    })

    if(isCancel(goal) || !goal.trim()) return;

    const config = defaultAgentConfig()
    const tracker = new ActionTracker()
    const executor = new ToolExecutor(tracker, config)
}