const indicatorMessages = {
    title: 'Indicators',
    missingCountryCode: 'Missing country code in the URL (example: ?iso_code_2=FR).',
    countryLabel: 'Country:',
    addData: 'Add data',
    form: {
        year: {
            label: 'Year',
            description: 'Calendar year',
        },
        co2: {
            label: 'CO2 emissions',
            placeholder: 'min: 0',
            description: 'Million tonnes per year',
        },
        renewableEnergy: {
            label: 'Renewable energy',
            placeholder: 'in %',
            description: '% of final consumption',
        },
        forest: {
            label: 'Forest area',
            placeholder: 'in %',
            description: '% of land area',
        },
        pm25: {
            label: 'PM2.5 exposure',
            placeholder: 'min: 0',
            description: 'µg/m³',
        },
        save: 'Save',
        cancel: 'Cancel',
        apiError: {
            network: 'Unable to reach the server. Please try again later.',
            unexpected: 'Unexpected server error. Please try again later.',
        }
    },
    validation: {
        yearRequired: 'Year is required.',
        yearInteger: 'Year must be a whole number.',
        yearOutOfRange: 'Year must be between 1850 and the current year.',
        co2Integer: 'CO2 emissions must be a whole number.',
        co2OutOfRange: 'Minimum CO2 annual emissions is 0.',
        renewableEnergyDecimal: 'Renewable energy must be a number.',
        renewableEnergyOutOfRange: 'Renewable energy must be between 0 and 100.',
        forestDecimal: 'Forest area must be a number.',
        forestOutOfRange: 'Forest area must be between 0 and 100.',
        pm25Integer: 'PM2.5 emissions must be a whole number.',
        pm25OutOfRange: 'Minimum for PM2.5 emissions is 0',
        indicatorRequired: 'At least one indicator value must be provided.',
    },
};

export default indicatorMessages;