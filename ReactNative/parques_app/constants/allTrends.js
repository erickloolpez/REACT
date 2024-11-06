import { parks } from "./dummy"

export const allTrends = parks.flatMap((park) =>
    park.trend.map((trend) => ({
        ...trend,
        park: park.name,
        logo: park.logo,
        ...park.location
    }))
)