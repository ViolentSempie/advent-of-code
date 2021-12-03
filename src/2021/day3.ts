import { App, Application } from "../app";
import { Utils } from "../utils";

export class Year2021Day3 extends Application implements App {
    async run(): Promise<void> {
        this.output("Running part 1");
        await this.part1();

        this.output("Running part 2");
        await this.part2();
    }

    async part1(): Promise<void> {
        const bytes = await this.getInput();
        const gammaRate = [];
        const epsilonRate = [];

        for (let index = 0; index < bytes[0].length; index++) {
            const bits = bytes.map(item => item[index]);

            const zero = bits.filter(item => item === "0").length;
            const one = bits.filter(item => item === "1").length;

            gammaRate.push(one > zero ? 1 : 0);
            epsilonRate.push(zero > one ? 1 : 0);
        }

        const gammaDecimal = parseInt(gammaRate.join(""), 2);
        const epsilonDecimal = parseInt(epsilonRate.join(""), 2);

        this.output(`gamma rate [yellow]${gammaRate.join("")}[reset] = [green]${gammaDecimal}[reset]`);
        this.output(`gamma rate [yellow]${epsilonRate.join("")}[reset] = [green]${epsilonDecimal}[reset]`);

        this.output(`total power consumption: [green]${gammaDecimal * epsilonDecimal}[reset]`);
    }

    async part2(): Promise<void> {
        let bytes = await this.getInput();
        const oxygen = this.findOxygen(bytes);
        const scrubber = this.findScrubber(bytes);

        this.output(`life support rating: [green]${oxygen * scrubber}[reset]`);
    }

    findOxygen(data: string[]): number {
        let bytes = [...data];
        const byteLength = bytes[0].length;

        for (let index = 0; index < byteLength; index++) {
            const bits = bytes.map(byte => byte[index]);

            const zero = bits.filter(item => item === "0").length;
            const one = bits.filter(item => item === "1").length;

            const filter = one >= zero ? "1" : "0";

            bytes = bytes.filter(byte => byte[index] === filter);

            if (bytes.length === 1) {
                break;
            }
        }

        const oxygenByte = bytes[0];
        return parseInt(oxygenByte, 2);
    }

    findScrubber(data: string[]): number {
        let bytes = [...data];
        const byteLength = bytes[0].length;

        for (let index = 0; index < byteLength; index++) {
            const bits = bytes.map(byte => byte[index]);

            const zero = bits.filter(item => item === "0").length;
            const one = bits.filter(item => item === "1").length;

            const filter = zero <= one ? "0" : "1";

            bytes = bytes.filter(byte => byte[index] === filter);

            if (bytes.length === 1) {
                break;
            }
        }

        const scrubberByte = bytes[0];
        return parseInt(scrubberByte, 2);
    }

    async getInput(): Promise<string[]> {
        const data = await Utils.getInput(2021, 3);
        return data.split(/\r?\n/);
    }
}