import { App, Application } from "../../app";
import { Utils } from "../../utils";

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
        const data = await Utils.getInput(2021, 1);
        return data.split(/\r?\n/).map(item => parseInt(item));
    }
}