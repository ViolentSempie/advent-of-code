import { App, Application } from "../app";
import { Utils } from "../utils";

interface InputData {
    input: number[];
    boards: number[][][];
}

export class Year2021Day4 extends Application implements App {
    async run(): Promise<void> {
        console.log("Running part 1");
        await this.part1();

        console.log("Running part 2");
        await this.part2();
    }

    async part1(): Promise<void> {
        let { input, boards } = await this.getInput();

        for (const num of input) {
            boards = this.setNumbers(boards, num);
            let winner = this.getWinner(boards);

            if (winner !== -1) {
                this.output(`Final score: [green]${winner * num}[reset]`);
                return;
            }
        }

        return;
    }

    async part2(): Promise<void> {
        let { input, boards } = await this.getInput();

        for (const num of input) {
            boards = this.setNumbers(boards, num);
            boards = this.findFinalWinner(boards, num);

            if (boards.length === 0) {
                return;
            }
        }

        return;
    }

    findFinalWinner(boards: number[][][], num: number): number[][][] {
        let board = this.findWinner(boards);

        while (board !== null) {
            if (boards.length === 1) {
                const winner = this.calculateRemaining(boards[0]);
                this.output(`Final score: [green]${winner * num}[reset]`);
            }

            boards.splice(boards.indexOf(board), 1);
            board = this.findWinner(boards);
        }

        return boards;
    }

    getWinner(boards: number[][][]): number {
        const board = this.findWinner(boards);

        return board !== null ? this.calculateRemaining(board) : -1;
    }

    findWinner(boards: number[][][]): number[][] | null {
        for (const board of boards) {
            // check rows
            for (const row of board) {
                if (row.filter(item => item !== -1).length === 0) {
                    return board;
                }
            }

            // check columns
            for (let index = 0; index < 5; index++) {
                let hasWon = true;

                for (const row of board) {
                    if (row[index] !== -1) {
                        hasWon = false;
                        break;
                    }
                }

                if (hasWon) {
                    return board;
                }
            }
        }

        return null;
    }

    calculateRemaining(board: number[][]): number {
        let result = 0;

        for (const row of board) {
            result += row.filter(item => item !== -1).reduce((previous, item) => previous + item, 0);
        }

        return result;
    }

    setNumbers(boards: number[][][], num: number): number[][][] {
        for (const board of boards) {
            for (let row of board) {
                const index = row.indexOf(num);

                if (index === -1) {
                    continue;
                }

                row[index] = -1;
            }
        }

        return boards;
    }

    async getInput(): Promise<InputData> {
        const data = await Utils.getInput(2021, 4);
        const rows = data.split(/\r?\n/);

        const result: InputData = {
            input: rows[0].split(",").map(item => parseInt(item)),
            boards: []
        };

        const boardRows = rows.splice(2);
        let index = 0;

        for (const boardRow of boardRows) {
            if (boardRow === "") {
                index++;
                continue;
            }

            if (typeof result.boards[index] === "undefined") {
                result.boards[index] = [];
            }

            result.boards[index].push(boardRow.split(" ").filter(item => item !== "").map(item => parseInt(item)));
        }

        return result;
    }
}