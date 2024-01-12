const INITIAL_STATE: any = {
    countries: []
}


const submitCountryReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case "submitCountryData":
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};

export default submitCountryReducer;