require("dotenv").config();

import yargs from "yargs/yargs";
import { Arguments } from "yargs";
import { hideBin } from "yargs/helpers";

import got from "got";
import fs from "fs";
import path from "path";
import { Utils } from "./utils";

import { Year2021Day1 } from "./2021/day1";
import { Year2021Day2 } from "./2021/day2";
import { Year2021Day3 } from "./2021/day3";
import { Year2021Day4 } from "./2021/day4";
import { Year2021Day5 } from "./2021/day5";

const importData = async (argv: Arguments): Promise<void> => {
    if (typeof process.env.AOC_SESSION === "undefined") {
        return Utils.output(`[red]An AOC session is required[reset]`);
    }

    try {
        const { body } = await got(`https://adventofcode.com/${argv.year}/day/${argv.day}/input`, { headers: { Cookie: `session=${process.env.AOC_SESSION}` } });
    
        const filePath = path.join(
            __dirname,
            "..",
            `inputs/${argv.year}/${argv.day}.data`
        );
    
        fs.writeFileSync(filePath, body);
        Utils.output(`[green]Imported data for ${argv.year} day ${argv.day}[reset]`);
    } catch (e) {
        Utils.output(`[red]Couldn't find data for ${argv.year} day ${argv.day}`);
    }
};

const runApp = (argv: Arguments<{ year: number, day: number }>) => {
    console.log(`Executing year ${argv.year} day ${argv.day}`);

    const years: any = {
        2021: {
            1: Year2021Day1,
            2: Year2021Day2,
            3: Year2021Day3,
            4: Year2021Day4,
            5: Year2021Day5,
        }
    };
    
    try {
        const app = new years[argv.year][argv.day]();
        app.run();
    } catch (e) {
        console.log(`Couldn't find app for year ${argv.year} day ${argv.day}`);
    }
}

yargs(hideBin(process.argv))
    .option("year", {
        description: "Set the year to run",
        alias: "y",
        type: "number",
        default: 2021
    })
    .option("day", {
        description: "Set the day to run",
        alias: "d",
        type: "number",
        default: 5
    })
    .command(
        "run",
        "run the app for [--year] [--day]",
        (yargs) =>  yargs.positional("year", {
            describe: "Year to import data to",
            default: 2021
        }).positional("day", {
            describe: "Day to import data to",
            default: 5
        }),
        runApp
    )
    .command(
        "data", 
        "import data for [--year] [--day]",
        (yargs) =>  yargs.positional("year", {
                describe: "Year to import data to",
                default: 2021
            }).positional("day", {
                describe: "Day to import data to",
                default: 5
            }),
            importData
    )
    .example("yarn start run --year 2021 --day 1", "Run the app for year 2021 day 1")
    .example("yarn data --year 2021 --day 1", "Import data for year 2021 day 1")
    .help()
    .alias("help", "h")
    .parse();