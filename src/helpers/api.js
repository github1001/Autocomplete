import axios from "axios";

export const fetchPlaces = async (input) => {
    const response = await axios({
        method: "GET",
        url: `/maps/api/place/autocomplete/json?input=${input}&radius=500&types=geocode&key=${process.env.REACT_APP_GOOGLE_KEY}`,
    });

    return response.data;
};
