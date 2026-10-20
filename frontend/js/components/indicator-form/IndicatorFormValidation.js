import { 
    convertEmptyStringToNull,
    isNotNull,
    isValidInteger,
    isValidDecimal,
    isValidIntegerRange,
    isValidDecimalRange, 
} from '../../utils/inputFormValidation.js';

export const IndicatorValidationError = Object.freeze({
    YEAR_REQUIRED: 'Year is required.',
    YEAR_INTEGER: 'Year must be a whole number.',
    YEAR_OUT_OF_RANGE: 'Year must be between 1800 and 2150.',
    CO2_INTEGER: 'CO2 emissions must be a whole number.',
    CO2_OUT_OF_RANGE: 'CO2 emissions must be between 0 and ',
    RENEWABLE_ENERGY_DECIMAL: 'Renewable energy must be a number.',
    RENEWABLE_ENERGY_OUT_OF_RANGE: 'Renewable energy must be between 0 and ',
    FOREST_DECIMAL: 'Forest area must be a number.',
    FOREST_OUT_OF_RANGE: 'Forest area must be between 0 and ',
    PM25_INTEGER: 'PM2.5 emissions must be a whole number.',
    PM25_OUT_OF_RANGE: 'PM2.5 emissions must be between 0 and ',
    INDICATOR_REQUIRED: 'At least one indicator value must be provided.',
});

export default function indicatorValidation(data) {
    
    convertEmptyStringToNull(data);

    return isNotNull(data.year) ? null : IndicatorValidationError.YEAR_REQUIRED
        ?? isValidInteger(data.year) ? null : IndicatorValidationError.YEAR_INTEGER
        ?? isValidIntegerRange(data.year, 1800, 2150) ? null : IndicatorValidationError.YEAR_OUT_OF_RANGE
        ?? isValidInteger(data.co2) ? null : IndicatorValidationError.CO2_INTEGER
        ?? isValidIntegerRange(data.co2, 0, 100000) ? null : IndicatorValidationError.CO2_OUT_OF_RANGE
        ?? isValidDecimal(data.renewableEnergy) ? null : IndicatorValidationError.RENEWABLE_ENERGY_DECIMAL
        ?? isValidDecimalRange(data.renewableEnergy, 100) ? null : IndicatorValidationError.RENEWABLE_ENERGY_OUT_OF_RANGE
        ?? isValidDecimal(data.forest) ? null : IndicatorValidationError.FOREST_DECIMAL
        ?? isValidDecimalRange(data.forest, 100) ? null : IndicatorValidationError.FOREST_OUT_OF_RANGE
        ?? isValidInteger(data.pm25) ? null : IndicatorValidationError.PM25_INTEGER
        ?? isValidIntegerRange(data.pm25, 0, 300) ? null : IndicatorValidationError.PM25_OUT_OF_RANGE
        ?? hasAtLeastOneIndicator(data) ? null : IndicatorValidationError.INDICATOR_REQUIRED;
}

export function hasAtLeastOneIndicator(data) {
    const indicatorValues = [data.co2, data.renewableEnergy, data.forest, data.pm25];
    let allFieldsEmpty = true;
    for (const value of indicatorValues) {
        if (value !== null)
            allFieldsEmpty = false;
    }                                
    return allFieldsEmpty ? true : false;
}
