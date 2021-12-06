import { App, Application } from "../app";
import { Utils } from "../utils";

/**
 * A line class that contains it's coordinates and functionality
 * to calculate the points in the line
 */
class Line {
    x1: number;
    x2: number;
    y1: number;
    y2: number;

    constructor(x1: number, x2: number, y1: number, y2: number) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }

    /**
     * The lowest y coordinate
     */
    get minY(): number {
        return Math.min(this.y1, this.y2);
    }

    /**
     * The highest y coordinate
     */
    get maxY(): number {
        return Math.max(this.y1, this.y2);
    }

    /**
     * The lowest x coordinate
     */
    get minX(): number {
        return Math.min(this.x1, this.x2);
    }

    /**
     * The highest x coordinate
     */
    get maxX(): number {
        return Math.max(this.x1, this.x2);
    }

    /**
     * An attribute that tells if the line is straight or not
     */
    get isStraight(): boolean {
        return this.x1 === this.x2 || this.y1 === this.y2;
    }

    /**
     * Calculate all the points in this line
     * @returns an array of points
     */
    getPoints(): string[] {
        return this.isStraight ? this.getStraightPoints() : this.getDiagonalPoints();
    }

    /**
     * Calculate the points in a straight line
     * @returns an array of points
     */
    getStraightPoints(): string[] {
        const result: string[] = [];

        for (let y = this.minY; y <= this.maxY; y++) {
            for (let x = this.minX; x <= this.maxX; x++) {
                result.push(`${x}.${y}`);
            }
        }

        return result;
    }

    /**
     * Calculate the points in a diagonal line
     * @returns an array of points
     */
    getDiagonalPoints(): string[] {
        const result: string[] = [];

        let x = this.x1;
        let y = this.y1;

        // Move through the diagonal line
        for (let move = 0; move <= this.maxX - this.minX; move++) {
            let moveX = this.x1 > this.x2 ? -move : move;
            let moveY = this.y1 > this.y2 ? -move : move;

            result.push(`${x + moveX}.${y + moveY}`);
        }

        return result;
    }
}

export class Year2021Day5 extends Application implements App {
    /**
     * Rune the app
     */
    async run(): Promise<void> {
        console.log("Running part 1");
        await this.part1();

        console.log("Running part 2");
        await this.part2();
    }

    /**
     * The answer of part 1
     */
    async part1(): Promise<void> {
        const input = await this.getInput();
        const data = input.filter(item => item.x1 === item.x2 || item.y1 === item.y2);

        const overlap: { [key: string]: number} = {};

        for (const line of data) {
            const points = line.getPoints();

            for (const point of points) {
                if (typeof overlap[point] === "undefined") {
                    overlap[point] = 0;
                }

                overlap[point]++;
            }
        }

        const result = Object.values(overlap).filter(item => item >= 2).length;
        this.output(`there were [green]${result}[reset] points with overlap`);
        return;
    }

    /**
     * The answer of part 2
     */
    async part2(): Promise<void> {
        const input = await this.getInput();
        const overlap: { [key: string]: number} = {};

        for (const line of input) {
            const points = line.getPoints();

            for (const point of points) {
                if (typeof overlap[point] === "undefined") {
                    overlap[point] = 0;
                }

                overlap[point]++;
            }
        }

        const result = Object.values(overlap).filter(item => item >= 2).length;
        this.output(`there were [green]${result}[reset] points with overlap`);
        return;
    }

    /**
     * 
     * @param item Line data as string x1,y1 -> x2,y2
     * @returns line object 
     */
    mapInput(item: string): Line {
        const data = item.split("->").map(coordinates => coordinates.trim().split(","));

        return new Line(
            parseInt(data[0][0]),
            parseInt(data[1][0]),
            parseInt(data[0][1]),
            parseInt(data[1][1])
        );
    }

    /**
     * 
     * @returns A promise of an array of lines
     */
    async getInput(): Promise<Line[]> {
        const data = await Utils.getInput(2021, 5);
        const rows = data.split(/\r?\n/);

        const result = rows.filter(item => item !== "").map(this.mapInput.bind(this));

        return result;
    }
}