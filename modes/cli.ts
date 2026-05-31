import chalk from "chalk";
import { select, isCancel } from "@clack/prompts";

export async function runCliMode() {
    while(true) {
        const mode = await select({
            message: "Choose option to work with",
            options: [
                {value: "agent", label: "Agent Mode"},
                {value: "plan", label: "PLan Mode"},
                {value: "ask", label: "Ask Mode"},
                {value: "back", label: "<- Back to main menu"},
            ]
        });
        
        if(mode === "back" || isCancel(mode)) {
            return;
        }
        if(mode === "agent") {
            console.log("agent...")
        }
        if(mode === "ask") {
            console.log("ask...")
        }
        if(mode === "plan") {
            console.log("plan...")
        }
        if(mode !== "agent" && mode !== "ask" && mode !== "plan") {
            console.log(chalk.yellow('\n This mode is not implmented yet \n'))
        } 
    }
}