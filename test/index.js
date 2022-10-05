/*
    Created by Exerra on 11/02/2022
*/
import PhishingAPI from "../lib/index.js";

const run = async () => {
    let phish = await new PhishingAPI("474741aa82msh27a26d68ff7a9dbp18b4a3jsn9fd3ae2ae34f")

    console.log(await phish.stats())

    console.log(await phish.check("https://disccrd.com"))
}

run()

let yes = "UK_TEST_OK"
yes = yes.replace(/(.{1,2})_(.{1,99})_(.{1,99})/g, "$2 $3")
console.log(yes)