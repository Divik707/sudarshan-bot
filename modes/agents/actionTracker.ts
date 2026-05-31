import type { ActionLog, ActionStatus} from "./types";

export class ActionTracker {
    private actions:ActionLog[] = []

    log(
        entry: Omit<ActionLog, 'id' | 'timestamp'> & {
            id?: string,
            timestamp?: Date
        }
    ) {
        const action: ActionLog = {
            id: entry.id ?? `action_${this.actions.length}`,
            timestamp: entry.timestamp ?? new Date(),
            type: entry.type,
            path: entry.path,
            details: { ...entry.details },
            status: entry.status,
            userApproval: entry.userApproval,
        };
        this.actions.push(action)
    }

    getAction() {
        return this.actions
    }
    
    pendingMutation(): ActionLog[] {
        return this.actions.filter(x => x.status === "pending")
    }

    updateStatus(id: string, status: ActionStatus, userApproval?: boolean): void {
        const a = this.actions.find((x) => x.id === id)
        if(!a) return
        a.status = status
        if(userApproval !== undefined) a.userApproval = userApproval
    }
}