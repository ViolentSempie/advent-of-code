import { Utils } from "./utils";

export interface App {
    run(): Promise<void>;
    part1(): Promise<void>;
    part2(): Promise<void>;
}

export class Application {
    output(output: string): void {
        return Utils.output(output);
    }
}