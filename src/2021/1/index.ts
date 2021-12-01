import { App, Application } from "../../app";
import fs from "fs";
import path from "path";

export class Year2021Day1 extends Application implements App {
    async run(): Promise<void> {
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

    async getInput(): Promise<Array<number>> {
        return new Promise((resolve, reject) => {
            const filePath = path.join(__dirname, "../../..", "inputs/2021/day1.data");
            fs.readFile(filePath, "utf8", (error, data) => {
                if (error) {
                    return reject(error);
                }

                return resolve(data.split(/\r?\n/).map(item => parseInt(item)));
            });
        });
    }
}