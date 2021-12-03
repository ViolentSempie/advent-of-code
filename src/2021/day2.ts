import { App, Application } from "../app";
import { Utils } from "../utils";

export class Year2021Day2 extends Application implements App {
    async run(): Promise<void> {
        this.output("Running part 1");
        await this.part1();

        this.output("Running part 2");
        await this.part2();
    }

    async part1(): Promise<void> {
        let horizontal = 0;
        let depth = 0;

        const input = await this.getInput();

        for (const command of input) {
            const value = parseInt(command[1]);

            switch (command[0]) {
                case "forward":
                    horizontal += value;
                    break;

                case "up":
                    depth -= value;
                    break;

                case "down":
                    depth += value;
                    break;
            }
        }

        this.output(`position [yellow]${horizontal}[reset] x [yellow]${depth}[reset] = [green]${horizontal * depth}[reset]`);
    }

    async part2(): Promise<void> {
        let horizontal = 0;
        let aim = 0;
        let depth = 0;

        const input = await this.getInput();

        for (const command of input) {
            const value = parseInt(command[1]);

            switch (command[0]) {
                case "forward":
                    horizontal += value;
                    depth += value * aim;
                    break;

                case "up":
                    aim -= value;
                    break;

                case "down":
                    aim += value;
                    break;
            }
        }

        this.output(`position [yellow]${horizontal}[reset] x [yellow]${depth}[reset] = [green]${horizontal * depth}[reset]`);
    }

    async getInput(): Promise<string[][]> {
        const data = await Utils.getInput(2021, 2);
        return data.split(/\r?\n/).map(item => item.split(" "));
    }
}