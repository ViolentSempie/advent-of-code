import { App, Application } from "../app";
import { Utils } from "../utils";

export class Year2021Day6 extends Application implements App {
    async run(): Promise<void> {
        console.log("Running part 1");
        await this.part1();

        console.log("Running part 2");
        await this.part2();
    }

    async part1(): Promise<void> {
        return await this.calculateFish();
    }

    async part2(): Promise<void> {
        return await this.calculateFish(256);
    }

    async calculateFish(days: number = 80): Promise<void> {
        let input = await this.getInput();
        let data = new Array(9).fill(0);

        for (const fish of input) {
            data[fish]++;
        }

        for (let day = 0; day < days; day++) {
            const fish = data.shift();

            data[8] = fish;
            data[6] += fish;
        }

        const result = data.reduce((previous, next) => previous + next);
        this.output(`There are now ${result} fish in the ocean`);
    }
    
    async getInput(): Promise<number[]> {
        const data = await Utils.getInput(2021, 6);
        return data.split(",").map(item => parseInt(item));
    }
}