export interface SwapiTypes {
            birth_year: string,
            created: string,
            edited: string,
            eye_color: string,
            films: Array<string>
            gender: string,
            hair_color: string,
            height: string,
            homeworld: string,
            mass: string,
            name: string,
            skincolor: string,
            species: Array<string>,
            starships: Array<string>,
            url: string,
            vehicles: Array<string>
}

export interface FetchError extends Error{
    status: string,
    statusText: string,
    url: string
}
