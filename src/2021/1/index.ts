import { App, Application } from "../../app";
import { Utils } from "../../utils";

export class Year2021Day1 extends Application implements App {
    async run(): Promise<void> {
        this.output("Running part 1");
        await this.part1();

        this.output("Running part 2");
        await this.part2();
    }

    async part1(): Promise<void> {
        let lastInput = null;
        let increments = 0;

        const input = await this.getInput();

        for (const data of input) {
            if (lastInput !== null && data > lastInput) {
                increments++;
            }

            lastInput = data;
        }

        this.output(`depth increased [green]${increments}[reset] times`);
    }

    async part2(): Promise<void> {
        const input = await this.getInput();
        const groups = this.getGroups(input);

        let lastInput = null;
        let increments = 0;

        for (const key in groups) {
            const data = groups[key];

            if (lastInput !== null && data > lastInput) {
                increments++;
            }

            lastInput = data;
        }

        this.output(`depth increased [green]${increments}[reset] times`);
    }

    getGroups(input: number[]): number[] {
        const groups: number[] = [];
        let count = 0;
        let groupIndex = 0;

        for (let index = 0; index < input.length; index++) {
            const number = input[index];

            // Create new group if it doesn't exist
            if (typeof groups[groupIndex] === "undefined") {
                groups[groupIndex] = 0;
            }

            // Add the number to the sum of the group
            groups[groupIndex] += number;

            // If we have added 3 numbers, reset, go to next group and go back 2 numbers
            if (++count > 2) {
                groupIndex++;
                count = 0;
                index -= 2;
            }
        }

        return groups;
    }

    async getInput(): Promise<number[]> {
        const data = await Utils.getInput(2021, 1);
        return data.split(/\r?\n/).map(item => parseInt(item));
    }
}