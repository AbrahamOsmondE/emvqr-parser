import { computeCRC } from './crc';

export const generateEmvcoQrText = (info: QrPayloadInformation, customFields?: CustomFields) => {
  const payload = {
    '00': '01',
    '01': '11',
    ...parseMerchantAccountInformation(info.merchantAccountInfo),
    52: info.merchantCategoryCode,
    53: info.transactionCurrency,
    ...(info.transactionAmount ? { 54: info.transactionAmount } : {}),
    ...parseConvenienceFeeIndicator(info.convenienceFeeIndicator),
    58: info.countryCode,
    59: info.merchantName,
    60: info.merchantCity,
    ...(info.postalCode ? { 61: info.postalCode } : {}),
    ...(info.additionalDataField ? { 62: info.additionalDataField } : {}),
    ...(customFields)
  };

  const dataText = `${convertPayloadToValidQrText(payload)}6304`; // checksum suffix
  const checksum = computeCRC(dataText);

  return `${dataText}${checksum}`;
};

const convertPayloadToValidQrText = (payload: any): string => {
  const sortedKeys = Object.keys(payload).sort((a, b) => a.localeCompare(b));

  let text = '';

  for (const key of sortedKeys) {
    const value = payload[key];
    if (typeof value === 'string') {
      const length = value.length < 10 ? `0${value.length.toString()}` : value.length.toString();
      text += key + length + value;
    } else {
      const subtext = convertPayloadToValidQrText(value);
      text += key + subtext.length.toString() + subtext;
    }
  }

  return text;
};

const parseMerchantAccountInformation = (payload: MerchantAccountInfo) => {
  let res = {};
  const networkInfo = payload.paymentNetworkInformation;
  switch (payload.globalIdentifier) {
    case GlobalIdentifiers.QRPH:
      res = {
        ...(payload.globalIdentifier ? { '00': payload.globalIdentifier } : {}),
        ...(networkInfo.bankCode ? { '01': networkInfo.bankCode } : {}),
        ...(networkInfo.bankNumber ? { '03': networkInfo.bankNumber } : {}),
        ...(networkInfo.bankBranchCode ? { '05': networkInfo.bankBranchCode } : {}),
      };
      return { 28: res };
    default:
      return { 28: res };
  }
};

/*
A value of "01" shall be used if the mobile application should prompt the
consumer to enter a tip to be paid to the merchant.
- A value of "02" shall be used to indicate inclusion of the data object Value of
Convenience Fee Fixed (ID "56").
- A value of "03" shall be used to indicate inclusion of the data object Value of
Convenience Fee Percentage (ID "57").
*/
const parseConvenienceFeeIndicator = (payload?: ConvenienceFeeIndicator) => {
  switch (payload?.type) {
    case 'optional':
      return { 55: '01' };
    case 'fixed':
      return { 55: '02', 56: payload.value };
    case 'percentage':
      return { 55: '03', 57: payload.value };
    default:
      return {};
  }
};
interface QrPayloadInformation {
  merchantAccountInfo: MerchantAccountInfo;
  merchantCategoryCode: string;
  transactionCurrency: string;
  transactionAmount?: string;
  countryCode: string;
  merchantName: string;
  merchantCity: string;
  postalCode?: string;
  convenienceFeeIndicator?: ConvenienceFeeIndicator;
  additionalDataField?: AdditionalDataField;
}

/* Payment network information varies depending on the global identifier
"02"-"03" Reserved for Visa
"04"-"05" Reserved for Mastercard
"06"-"08" Reserved by EMVCo
"09"-"10" Reserved for Discover
"11"-"12" Reserved for Amex
"13"-"14" Reserved for JCB
"15"-"16" Reserved for UnionPay
"17"-"25" Reserved by EMVCo
"26"-"51" Templates reserved for additional payment networks.
*/
interface MerchantAccountInfo {
  globalIdentifier: string;
  paymentNetworkInformation: QrphP2mInformation;
}

interface ConvenienceFeeIndicator {
  type: 'optional' | 'fixed' | 'percentage';
  value?: string;
}

interface QrphP2mInformation {
  bankCode: string;
  bankNumber: string;
  bankBranchCode: string;
}

type ValidKeys = `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;

/* Additional Data field varies depending on the global identifier
If Additional Data field has a global identifier (00),
it will follow the template of the system that owns the global identifier.

If it does not have global identifier, it will follow the following template, with all field optional:
Bill Number "01"
Mobile Number "02"
Store Label "03"
Loyalty Number "04"
Reference Label "05"
Customer Label "06"
Terminal Label "07"
Purpose of Transaction "08"
Additional Consumer Data Request "09"
RFU for EMVCo "10"-"49"
Payment System specific templates "50"-"99"
*/
type AdditionalDataField = Partial<Record<ValidKeys, string>>;
type CustomFields = Partial<Record<ValidKeys, AdditionalDataField | string>>;
enum GlobalIdentifiers {
  QRPH = 'ph.ppmi.p2m',
}