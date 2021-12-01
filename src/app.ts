export interface App {
    run(): Promise<void>;
}

interface colors {
    [index: string]: {
        regex: RegExp,
        value: string
    };
}

export class Application {
    colors: colors = {
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

    output(output: string): void {
        for (const color in this.colors) {
            const data = this.colors[color];
            output = output.replace(data.regex, data.value);
        }

        console.log(output);
    }
}