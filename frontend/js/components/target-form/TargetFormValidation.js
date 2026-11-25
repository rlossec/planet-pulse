import {
    convertEmptyStringToNull,
    isNotNull,
    isValidInteger,
    isValidDecimal,
    isValidIntegerRange,
    isValidDecimalRange,
    getCurrentYear,
} from '../../utils/inputFormValidation.js';
import targetMessages from '../../../i18n/en/targets.js';

export const TargetValidationError = Object.freeze({
    YEAR_REQUIRED: targetMessages.validation.yearRequired,
    YEAR_INTEGER: targetMessages.validation.yearInteger,
    YEAR_MINIMUM: targetMessages.validation.yearMinimum,
    YEAR_MAXIMUM: targetMessages.validation.yearMaximum,
    CO2_INTEGER: targetMessages.validation.co2Integer,
    CO2_OUT_OF_RANGE: targetMessages.validation.co2OutOfRange,
    RENEWABLE_ENERGY_DECIMAL: targetMessages.validation.renewableEnergyDecimal,
    RENEWABLE_ENERGY_OUT_OF_RANGE: targetMessages.validation.renewableEnergyOutOfRange,
    FOREST_DECIMAL: targetMessages.validation.forestDecimal,
    FOREST_OUT_OF_RANGE: targetMessages.validation.forestOutOfRange,
    PM25_INTEGER: targetMessages.validation.pm25Integer,
    PM25_OUT_OF_RANGE: targetMessages.validation.pm25OutOfRange,
    TARGET_REQUIRED: targetMessages.validation.targetRequired,
});

export default function targetValidation(data) {
    convertEmptyStringToNull(data);

    return (isNotNull(data.year) ? null : TargetValidationError.YEAR_REQUIRED)
        ?? (isValidInteger(data.year) ? null : TargetValidationError.YEAR_INTEGER)
        ?? (Number(data.year) > getCurrentYear() ? null : TargetValidationError.YEAR_MINIMUM)
        ?? (isValidIntegerRange(data.year, getCurrentYear() + 1, 32767)
            ? null : TargetValidationError.YEAR_MAXIMUM)
        ?? (!isNotNull(data.co2) || isValidInteger(data.co2) ? null : TargetValidationError.CO2_INTEGER)
        ?? (!isNotNull(data.co2) || isValidIntegerRange(data.co2, 0, Number.POSITIVE_INFINITY)
            ? null : TargetValidationError.CO2_OUT_OF_RANGE)
        ?? (!isNotNull(data.renewableEnergy) || isValidDecimal(data.renewableEnergy)
            ? null : TargetValidationError.RENEWABLE_ENERGY_DECIMAL)
        ?? (!isNotNull(data.renewableEnergy) || isValidDecimalRange(data.renewableEnergy, 100)
            ? null : TargetValidationError.RENEWABLE_ENERGY_OUT_OF_RANGE)
        ?? (!isNotNull(data.forest) || isValidDecimal(data.forest)
            ? null : TargetValidationError.FOREST_DECIMAL)
        ?? (!isNotNull(data.forest) || isValidDecimalRange(data.forest, 100)
            ? null : TargetValidationError.FOREST_OUT_OF_RANGE)
        ?? (!isNotNull(data.pm25) || isValidInteger(data.pm25) ? null : TargetValidationError.PM25_INTEGER)
        ?? (!isNotNull(data.pm25) || isValidIntegerRange(data.pm25, 0, Number.POSITIVE_INFINITY)
            ? null : TargetValidationError.PM25_OUT_OF_RANGE)
        ?? (hasAtLeastOneTarget(data) ? null : TargetValidationError.TARGET_REQUIRED);
}

export function hasAtLeastOneTarget(data) {
    return [data.co2, data.renewableEnergy, data.forest, data.pm25].some(isNotNull);
}
