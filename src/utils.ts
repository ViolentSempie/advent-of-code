import path from "path";
import fs from "fs";

export class Utils {
    static async getInput(year: number, day: number): Promise<string> {
        return new Promise((resolve, reject) => {
            const filePath = path.join(
                __dirname,
                "..",
                `inputs/${year}/${day}.data`
            );
            fs.readFile(filePath, "utf8", (error, data) => {
                if (error) {
                    return reject(error);
                }

                return resolve(data);
            });
        });
    }
}