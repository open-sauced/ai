import { DescriptionConfig, getDefaultDescriptionConfig } from "./descriptionconfig";

export const configurationReducer = (state: DescriptionConfig, action: { type: string, value: any }) => {
    let newState: DescriptionConfig = { ...state };

    switch (action.type) {
        case "SET":
            newState = action.value;
            break;
        case "SET_LENGTH":
            newState.config.length = action.value;
            break;
        case "SET_TEMPERATURE":
            newState.config.temperature = action.value;
            break;
        case "SET_MAX_INPUT_LENGTH":
            newState.config.maxInputLength = action.value;
            break;
        case "SET_LANGUAGE":
            newState.config.language = action.value;
            break;
        case "SET_SOURCE":
            newState.config.source = action.value;
            break;
        case "SET_TONE":
            newState.config.tone = action.value;
            break;
        case "CLEAR":
            newState = getDefaultDescriptionConfig();
            break;
        default:
            return newState;
    }
    return newState;
};
