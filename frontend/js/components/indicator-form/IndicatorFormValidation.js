import { convertEmptyStringToNull,
    validateRequiredValue,
    validateInteger,
    validateDecimal,
    validateIntegerRange,
    validateIndicatorRange,
    validateAtLeastOneIndicator } from '../../utils/inputFormValidation.js';

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

    return validateRequiredValue(data.year, IndicatorValidationError.YEAR_REQUIRED)
        ?? validateInteger(data.year, IndicatorValidationError.YEAR_INTEGER)
        ?? validateIntegerRange(data.year, 1800, 2150, IndicatorValidationError.YEAR_OUT_OF_RANGE)
        ?? validateInteger(data.co2, IndicatorValidationError.CO2_INTEGER)
        ?? validateIndicatorRange(data.co2, 100000, IndicatorValidationError.CO2_OUT_OF_RANGE)
        ?? validateDecimal(data.renewableEnergy, IndicatorValidationError.RENEWABLE_ENERGY_DECIMAL)
        ?? validateIndicatorRange(data.renewableEnergy, 100, IndicatorValidationError.RENEWABLE_ENERGY_OUT_OF_RANGE)
        ?? validateDecimal(data.forest, IndicatorValidationError.FOREST_DECIMAL)
        ?? validateIndicatorRange(data.forest, 100, IndicatorValidationError.FOREST_OUT_OF_RANGE)
        ?? validateInteger(data.pm25, IndicatorValidationError.PM25_INTEGER)
        ?? validateIndicatorRange(data.pm25, 300, IndicatorValidationError.PM25_OUT_OF_RANGE)
        ?? validateAtLeastOneIndicator(data, IndicatorValidationError.INDICATOR_REQUIRED);
}
