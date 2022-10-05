import fetch from "node-fetch"

let apiuri = "https://exerra-phishing-check.p.rapidapi.com"

interface Stats {
    links: number
}

interface CheckResponse {
    status: number,
    isScam: boolean,
    domain: string
}

export default class PhishingAPI {
    options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "",
            "X-RapidAPI-Host": apiuri.replace("https://", "")
        }
    }
    constructor(token: string) {
        if (!token) throw new Error("No token provided")
        this.options.headers["X-RapidAPI-Key"] = token
    }

    stats = async (): Promise<Stats> => {
        let stats = (await fetch(`${apiuri}/stats`, this.options)).json()

		return stats as Promise<Stats>
    }

    check = async (url: string): Promise<CheckResponse> => {
        let urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
		let domainRegex = /^(((?!\-))(xn\-\-)?[a-z0-9\-_]{0,61}[a-z0-9]{1,1}\.)*(xn\-\-)?([a-z0-9\-]{1,61}|[a-z0-9\-]{1,30})\.[a-z]{2,}$/


		if (urlRegex.test(url) && !domainRegex.test(url)) return (await fetch(`${apiuri}/?url=${url}`, this.options)).json() as Promise<CheckResponse>
		else if (!urlRegex.test(url) && domainRegex.test(url)) return (await fetch(`${apiuri}/?url=https://${url}`, this.options)).json() as Promise<CheckResponse>
		else {
			throw new Error("No valid URL or domain passed")
		}
    }

    getAll = async (): Promise<string[]> => {
        return await (await fetch(`${apiuri}/all`, this.options)).json() as Promise<string[]>
    }
}