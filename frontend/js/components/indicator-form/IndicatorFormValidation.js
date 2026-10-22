import { 
    convertEmptyStringToNull,
    isNotNull,
    isValidInteger,
    isValidDecimal,
    isValidIntegerRange,
    isValidDecimalRange, 
    getCurrentYear,
} from '../../utils/inputFormValidation.js';

export const IndicatorValidationError = Object.freeze({
    YEAR_REQUIRED: 'Year is required.',
    YEAR_INTEGER: 'Year must be a whole number.',
    YEAR_OUT_OF_RANGE: 'Year must be between 1850 and the current year.',
    CO2_INTEGER: 'CO2 emissions must be a whole number.',
    CO2_OUT_OF_RANGE: 'Minimum CO2 annual emissions is 0.',
    RENEWABLE_ENERGY_DECIMAL: 'Renewable energy must be a number.',
    RENEWABLE_ENERGY_OUT_OF_RANGE: 'Renewable energy must be between 0 and 100.',
    FOREST_DECIMAL: 'Forest area must be a number.',
    FOREST_OUT_OF_RANGE: 'Forest area must be between 0 and 100.',
    PM25_INTEGER: 'PM2.5 emissions must be a whole number.',
    PM25_OUT_OF_RANGE: 'Minimum for PM2.5 emissions is 0',
    INDICATOR_REQUIRED: 'At least one indicator value must be provided.',
});

export default function indicatorValidation(data) {
    convertEmptyStringToNull(data);

    return (isNotNull(data.year) ? null : IndicatorValidationError.YEAR_REQUIRED)
        ?? (isValidInteger(data.year) ? null : IndicatorValidationError.YEAR_INTEGER)
        ?? (isValidIntegerRange(data.year, 1850, getCurrentYear()) ? null : IndicatorValidationError.YEAR_OUT_OF_RANGE)
        ?? (!isNotNull(data.co2) || isValidInteger(data.co2) ? null : IndicatorValidationError.CO2_INTEGER)
        ?? (!isNotNull(data.co2) || isValidIntegerRange(data.co2, 0, Number.POSITIVE_INFINITY)
            ? null : IndicatorValidationError.CO2_OUT_OF_RANGE)
        ?? (!isNotNull(data.renewableEnergy) || isValidDecimal(data.renewableEnergy)
            ? null : IndicatorValidationError.RENEWABLE_ENERGY_DECIMAL)
        ?? (!isNotNull(data.renewableEnergy) || isValidDecimalRange(data.renewableEnergy, 100)
            ? null : IndicatorValidationError.RENEWABLE_ENERGY_OUT_OF_RANGE)
        ?? (!isNotNull(data.forest) || isValidDecimal(data.forest)
            ? null : IndicatorValidationError.FOREST_DECIMAL)
        ?? (!isNotNull(data.forest) || isValidDecimalRange(data.forest, 100)
            ? null : IndicatorValidationError.FOREST_OUT_OF_RANGE)
        ?? (!isNotNull(data.pm25) || isValidInteger(data.pm25) ? null : IndicatorValidationError.PM25_INTEGER)
        ?? (!isNotNull(data.pm25) || isValidIntegerRange(data.pm25, 0, Number.POSITIVE_INFINITY)
            ? null : IndicatorValidationError.PM25_OUT_OF_RANGE)
        ?? (hasAtLeastOneIndicator(data) ? null : IndicatorValidationError.INDICATOR_REQUIRED);
}

export function hasAtLeastOneIndicator(data) {
    const indicatorValues = [data.co2, data.renewableEnergy, data.forest, data.pm25];
    return indicatorValues.some(isNotNull);
}
