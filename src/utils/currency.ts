export const currencyFormatter = (value: number | undefined) => {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'Eur'
    }).format(value ?? 0);
};

export const currencyParser = (val: string | undefined) => {
    const value = val ?? '0.0';
    const group = new Intl.NumberFormat('fr-FR').format(1111).replace(/1/g, '');
    const decimal = new Intl.NumberFormat('fr-FR').format(1.1).replace(/1/g, '');
    let reversedVal = value.replace(new RegExp(`\\${group}`, 'g'), '');
    reversedVal = reversedVal.replace(new RegExp(`\\${decimal}`, 'g'), '.');
    reversedVal = reversedVal.replace(/[^0-9.]/g, '');
    const digitsAfterDecimalCount = (reversedVal.split('.')[1] || []).length;
    const needsDigitsAppended = digitsAfterDecimalCount > 2;
    let returnValue: number | bigint = parseFloat(reversedVal);

    if (needsDigitsAppended) {
        // eslint-disable-next-line no-restricted-properties
        returnValue *= Math.pow(10, digitsAfterDecimalCount - 2);
    }

    return Number.isNaN(returnValue) ? 0 : returnValue;
};
