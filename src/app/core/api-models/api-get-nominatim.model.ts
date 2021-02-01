export interface ApiGetNominatim {
    place_id: string;
    licence: string;
    osm_type: string;
    osm_id: string;
    boundingbox: string[];
    lat: string;
    lon: string;
    display_name: string;
    class: string;
    type: string;
    importance: number;
}


// {
//     "place_id": "57735665",
//     "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://www.openstreetmap.org/copyright",
//     "osm_type": "node",
//     "osm_id": "4734140088",
//     "boundingbox": [
//         "45.0824343",
//         "45.0825343",
//         "7.6639684",
//         "7.6640684"
//     ],
//     "lat": "45.0824843",
//     "lon": "7.6640184",
//     "display_name": "50, Via Principessa Clotilde, San Donato, Circoscrizione 4, Torino, TO, PIE, 10144, Italia",
//     "class": "place",
//     "type": "house",
//     "importance": 0.411
// }