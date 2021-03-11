import { FSWatcher } from "chokidar";
import { Compiler } from "./Compiler";
import { ProjectConfig } from "./Options";
import { Supervisor } from "./Supervisor";
interface ReloadBatch {
    paths: string[];
    invalidate: boolean;
}
/** Orchestrates all the other bits to respond to high level commands */
export declare class Project {
    readonly workspaceRoot: string;
    readonly config: ProjectConfig;
    cleanups: (() => void)[];
    currentBatch: ReloadBatch;
    compiler: Compiler;
    supervisor: Supervisor;
    watcher?: FSWatcher;
    constructor(workspaceRoot: string, config: ProjectConfig);
    addShutdownCleanup(cleanup: () => void): void;
    enqueueReload(path: string, requiresInvalidation?: boolean): void;
    debouncedReload: import("lodash").DebouncedFunc<() => void>;
    reloadNow(): Promise<void>;
    invalidateBuildSetAndReload(): Promise<void>;
    shutdown(code?: number): void;
}
export {};