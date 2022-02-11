/*
    Created by Exerra on 11/02/2022
*/
import {PhishingAPI} from "../index.js";

let phish = await new PhishingAPI()

console.log(await phish.stats())

console.log(await phish.check("https://disccrd.com"))