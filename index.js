/*
    Created by Exerra on 11/02/2022
*/

const fetch = require("node-fetch");

let apiuri = "https://api.exerra.xyz"
let phishingDomains = []

class PhishingAPI {
	/**
	 *
	 * @description Checks API status
	 */
	constructor() {
		fetch(`${apiuri}/server/status`).catch(e => {
			throw new Error("API is down, try again later")
		})
	}

	/**
	 * @description Checks stats about the Exerra phishing API
	 * @returns {Promise<Object>}
	 */
	async stats() {
		let stats = (await fetch(`${apiuri}/scam/stats`)).json()
		return stats
	}

	/**
	 * @description Checks if an URL or domain is a phishing attempt
	 * @param str - URL or domain
	 * @returns {Promise<Object>}
	 */
	async check(str) {
		let urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
		let domainRegex = /^(((?!\-))(xn\-\-)?[a-z0-9\-_]{0,61}[a-z0-9]{1,1}\.)*(xn\-\-)?([a-z0-9\-]{1,61}|[a-z0-9\-]{1,30})\.[a-z]{2,}$/


		if (urlRegex.test(str) && !domainRegex.test(str)) return (await fetch(`${apiuri}/scam?url=${str}`)).json()
		else if (!urlRegex.test(str) && domainRegex.test(str)) return (await fetch(`${apiuri}/scam?url=https://${str}`)).json()
		else {
			throw new Error("No valid URL or domain passed")
		}
	}
}

module.exports = PhishingAPI
