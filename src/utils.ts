import path from "path";
import fs from "fs";

interface colors {
    [index: string]: {
        regex: RegExp,
        value: string
    };
}

export class Utils {
    static colors: colors = {
        red: {
            regex: /\[red\]/g,
            value: "\u001b[31m"
        },
        blue: {
            regex: /\[blue\]/g,
            value: "\u001b[34m"
        },
        green: {
            regex: /\[green\]/g,
            value: "\u001b[32m"
        },
        yellow: {
            regex: /\[yellow\]/g,
            value: "\u001b[33m"
        },
        reset: {
            regex: /\[reset\]/g,
            value: "\u001b[0m"
        }
    };

    static output(output: string): void {
        for (const color in this.colors) {
            const data = this.colors[color];
            output = output.replace(data.regex, data.value);
        }

        console.log(output);
    }

    static async getInput(year: number, day: number): Promise<string> {
        return new Promise((resolve, reject) => {
            const filePath = path.join(
                __dirname,
                "..",
                `inputs/${year}/${day}.data`
            );

            fs.readFile(filePath, "utf8", (error, data) => error ? reject(error) : resolve(data));
        });
    }
}