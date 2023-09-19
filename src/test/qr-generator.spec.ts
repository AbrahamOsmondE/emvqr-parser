import { generateEmvcoQrText } from '../qr-generator';

describe('EMV QR Test', () => {
  it('should generate a QR text correctly', async () => {
    expect(generateEmvcoQrText(qrPayload)).toEqual(encodedQr);
  });
});

const qrPayload = {
  merchantAccountInfo: {
    globalIdentifier: 'ph.ppmi.p2m',
    paymentNetworkInformation: {
      bankCode: 'GXCHPHM2XXX',
      bankNumber: '217020000054698716099',
      bankBranchCode: '000',
    },
  },
  merchantCategoryCode: '5814',
  transactionCurrency: '608',
  countryCode: 'PH',
  merchantName: 'S-and-R-MBTC-9182',
  merchantCity: 'Taguig',
  postalCode: '1630',
  additionalDataField: {
    '00': 'ph.ppmi.qrph',
    '03': 'SRSU0020',
    '05': '217050000066990134094',
    '07': 'GEN00351',
  },
};

const encodedQr = '00020101021128620011ph.ppmi.p2m0111GXCHPHM2XXX032121702000005469871609905030005204581453036085802PH5917S-and-R-MBTC-91826006Taguig6104163062650012ph.ppmi.qrph0308SRSU002005212170500000669901340940708GEN003516304BF2B'