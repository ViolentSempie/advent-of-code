import { Year2021Day1 } from "./2021/1";
import yargs from "yargs";

const argv: any = yargs
    .option("year", {
        description: "Set the year to run",
        alias: "y",
        type: "number"
    })
    .option("day", {
        description: "Set the day to run",
        alias: "d",
        type: "number"
    })
    .help()
    .alias("help", "h")
    .argv;

const years: any = {
    "2021": {
        "1": Year2021Day1
    }
}

const year = argv.year || 2021;
const day = argv.day || 1;

console.log(`Executing year ${year} day ${day}`);

try {
    const app = new years[year][day]();
    app.run();
} catch (e) {
    console.log(`Couldn't find app for year ${year} day ${day}`);
}