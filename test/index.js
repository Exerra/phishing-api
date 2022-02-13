/*
    Created by Exerra on 11/02/2022
*/
import {PhishingAPI} from "../index.js";

let phish = await new PhishingAPI()

console.log(await phish.stats())

console.log(await phish.check("https://disccrd.com"))

let yes = "UK_TEST_OK"
yes = yes.replace(/(.{1,2})_(.{1,99})_(.{1,99})/g, "$2 $3")
console.log(yes)