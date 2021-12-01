import { Year2021Day1 } from "./2021/1";
import { App } from "./app";

const args = process.argv.slice(2);
const years: any = {
    "2021": {
        "1": Year2021Day1
    }
}

const year = args.length === 1 ? "2021" : (args[0] || "2021");
const day = args[1] || args[0] || "1";

console.log(`Executing year ${year} day ${day}`);

try {
    const app = new years[year][day]();
    app.run();
} catch (e) {
    console.log(`Couldn't find app for year ${year} day ${day}`, e);
}