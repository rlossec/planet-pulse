import { 
    convertEmptyStringToNull,
    isNotNull,
    isValidInteger,
    isValidDecimal,
    isValidIntegerRange,
    isValidDecimalRange, 
    getCurrentYear,
} from '../../utils/inputFormValidation.js';
import indicatorMessages from '../../../i18n/en/indicators.js';

export const IndicatorValidationError = Object.freeze({
    YEAR_REQUIRED: indicatorMessages.validation.yearRequired,
    YEAR_INTEGER: indicatorMessages.validation.yearInteger,
    YEAR_OUT_OF_RANGE: indicatorMessages.validation.yearOutOfRange,
    CO2_INTEGER: indicatorMessages.validation.co2Integer,
    CO2_OUT_OF_RANGE: indicatorMessages.validation.co2OutOfRange,
    RENEWABLE_ENERGY_DECIMAL: indicatorMessages.validation.renewableEnergyDecimal,
    RENEWABLE_ENERGY_OUT_OF_RANGE: indicatorMessages.validation.renewableEnergyOutOfRange,
    FOREST_DECIMAL: indicatorMessages.validation.forestDecimal,
    FOREST_OUT_OF_RANGE: indicatorMessages.validation.forestOutOfRange,
    PM25_INTEGER: indicatorMessages.validation.pm25Integer,
    PM25_OUT_OF_RANGE: indicatorMessages.validation.pm25OutOfRange,
    INDICATOR_REQUIRED: indicatorMessages.validation.indicatorRequired,
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
