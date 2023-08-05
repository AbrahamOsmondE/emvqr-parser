import {Schema} from '../core';
export const crcTable = [
  0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7, 0x8108, 0x9129, 0xa14a, 0xb16b, 0xc18c, 0xd1ad,
  0xe1ce, 0xf1ef, 0x1231, 0x0210, 0x3273, 0x2252, 0x52b5, 0x4294, 0x72f7, 0x62d6, 0x9339, 0x8318, 0xb37b, 0xa35a,
  0xd3bd, 0xc39c, 0xf3ff, 0xe3de, 0x2462, 0x3443, 0x0420, 0x1401, 0x64e6, 0x74c7, 0x44a4, 0x5485, 0xa56a, 0xb54b,
  0x8528, 0x9509, 0xe5ee, 0xf5cf, 0xc5ac, 0xd58d, 0x3653, 0x2672, 0x1611, 0x0630, 0x76d7, 0x66f6, 0x5695, 0x46b4,
  0xb75b, 0xa77a, 0x9719, 0x8738, 0xf7df, 0xe7fe, 0xd79d, 0xc7bc, 0x48c4, 0x58e5, 0x6886, 0x78a7, 0x0840, 0x1861,
  0x2802, 0x3823, 0xc9cc, 0xd9ed, 0xe98e, 0xf9af, 0x8948, 0x9969, 0xa90a, 0xb92b, 0x5af5, 0x4ad4, 0x7ab7, 0x6a96,
  0x1a71, 0x0a50, 0x3a33, 0x2a12, 0xdbfd, 0xcbdc, 0xfbbf, 0xeb9e, 0x9b79, 0x8b58, 0xbb3b, 0xab1a, 0x6ca6, 0x7c87,
  0x4ce4, 0x5cc5, 0x2c22, 0x3c03, 0x0c60, 0x1c41, 0xedae, 0xfd8f, 0xcdec, 0xddcd, 0xad2a, 0xbd0b, 0x8d68, 0x9d49,
  0x7e97, 0x6eb6, 0x5ed5, 0x4ef4, 0x3e13, 0x2e32, 0x1e51, 0x0e70, 0xff9f, 0xefbe, 0xdfdd, 0xcffc, 0xbf1b, 0xaf3a,
  0x9f59, 0x8f78, 0x9188, 0x81a9, 0xb1ca, 0xa1eb, 0xd10c, 0xc12d, 0xf14e, 0xe16f, 0x1080, 0x00a1, 0x30c2, 0x20e3,
  0x5004, 0x4025, 0x7046, 0x6067, 0x83b9, 0x9398, 0xa3fb, 0xb3da, 0xc33d, 0xd31c, 0xe37f, 0xf35e, 0x02b1, 0x1290,
  0x22f3, 0x32d2, 0x4235, 0x5214, 0x6277, 0x7256, 0xb5ea, 0xa5cb, 0x95a8, 0x8589, 0xf56e, 0xe54f, 0xd52c, 0xc50d,
  0x34e2, 0x24c3, 0x14a0, 0x0481, 0x7466, 0x6447, 0x5424, 0x4405, 0xa7db, 0xb7fa, 0x8799, 0x97b8, 0xe75f, 0xf77e,
  0xc71d, 0xd73c, 0x26d3, 0x36f2, 0x0691, 0x16b0, 0x6657, 0x7676, 0x4615, 0x5634, 0xd94c, 0xc96d, 0xf90e, 0xe92f,
  0x99c8, 0x89e9, 0xb98a, 0xa9ab, 0x5844, 0x4865, 0x7806, 0x6827, 0x18c0, 0x08e1, 0x3882, 0x28a3, 0xcb7d, 0xdb5c,
  0xeb3f, 0xfb1e, 0x8bf9, 0x9bd8, 0xabbb, 0xbb9a, 0x4a75, 0x5a54, 0x6a37, 0x7a16, 0x0af1, 0x1ad0, 0x2ab3, 0x3a92,
  0xfd2e, 0xed0f, 0xdd6c, 0xcd4d, 0xbdaa, 0xad8b, 0x9de8, 0x8dc9, 0x7c26, 0x6c07, 0x5c64, 0x4c45, 0x3ca2, 0x2c83,
  0x1ce0, 0x0cc1, 0xef1f, 0xff3e, 0xcf5d, 0xdf7c, 0xaf9b, 0xbfba, 0x8fd9, 0x9ff8, 0x6e17, 0x7e36, 0x4e55, 0x5e74,
  0x2e93, 0x3eb2, 0x0ed1, 0x1ef0,
];

export const schemaForCustomPayment: Schema = {
  '00': {
    name: 'Payload Format Indicator',
  },
  '01': {
    name: 'Point of Initiation Method',
  },
  '02-51': {
    name: 'Merchant Account Information',
    schema: {
      '00': {
        name: 'Globally Unique Identifier',
      },
      '01-63': {
        name: 'Context Specific Data',
      },
      98: {
        name: 'Globally Unique Identifier',
      },
      99: {
        name: 'Globally Unique Identifier',
      },
    },
  },
  52: {
    name: 'Merchant Category Code',
  },
  53: {
    name: 'Transaction Currency',
  },
  54: {
    name: 'Transaction Amount',
  },
  55: {
    name: 'Tip or Convenience Indicator',
  },
  56: {
    name: 'Value of Convenience Fee Fixed',
  },
  57: {
    name: 'Value of Convenience Fee Percentage',
  },
  58: {
    name: 'Country Code',
  },
  59: {
    name: 'Merchant Name',
  },
  60: {
    name: 'Merchant City',
  },
  61: {
    name: 'Postal Code',
  },
  62: {
    name: 'Additional Data Field Template',
    schema: {
      '00': {
        name: 'Globally Unique Identifier',
      },
      '01-99': {
        name: 'Additional Data Field',
      }
    },
  },
  63: {
    name: 'CRC',
  },
  64: {
    name: 'Merchant Information— Language Template',
    schema: {
      '00': {
        name: 'Language Preference',
      },
      '01': {
        name: 'Merchant Name— Alternate Language',
      },
      '02': {
        name: 'Merchant City— Alternate Language',
      },
    },
  },
  '65-79': {
    name: 'RFU for EMVCo',
  },
  '80-99': {
    name: 'Unreserved Templates',
  },
};

export const schema: Schema = {
  '00': {
    name: 'Payload Format Indicator',
  },
  '01': {
    name: 'Point of Initiation Method',
  },
  '02-51': {
    name: 'Merchant Account Information',
    schema: {
      '00': {
        name: 'Globally Unique Identifier',
      },
      '01-63': {
        name: 'Context Specific Data',
      },
      98: {
        name: 'Globally Unique Identifier',
      },
      99: {
        name: 'Globally Unique Identifier',
      },
    },
  },
  52: {
    name: 'Merchant Category Code',
  },
  53: {
    name: 'Transaction Currency',
  },
  54: {
    name: 'Transaction Amount',
  },
  55: {
    name: 'Tip or Convenience Indicator',
  },
  56: {
    name: 'Value of Convenience Fee Fixed',
  },
  57: {
    name: 'Value of Convenience Fee Percentage',
  },
  58: {
    name: 'Country Code',
  },
  59: {
    name: 'Merchant Name',
  },
  60: {
    name: 'Merchant City',
  },
  61: {
    name: 'Postal Code',
  },
  62: {
    name: 'Additional Data Field Template',
    schema: {
      '01': {
        name: 'Bill Number',
      },
      '02': {
        name: 'Mobile Number'
      },
      '03': {
        name: 'Store Label'
      },
      '04': {
        name: 'Loyalty Number'
      },
      '05': {
        name: 'Reference Label'
      },
      '06': {
        name: 'Customer Label'
      },
      '07': {
        name: 'Terminal Label'
      },
      '08': {
        name: 'Purpose of Transaction'
      },
      '09': {
        name: 'Additional Consumer Data Request'
      },
      '10-49': {
        name: 'RFU for EMVCo'
      },
      '50-99': {
        name: 'Payment System specific templates',
      },
    },
  },
  63: {
    name: 'CRC',
  },
  64: {
    name: 'Merchant Information— Language Template',
    schema: {
      '00': {
        name: 'Language Preference',
      },
      '01': {
        name: 'Merchant Name— Alternate Language',
      },
      '02': {
        name: 'Merchant City— Alternate Language',
      },
    },
  },
  '65-79': {
    name: 'RFU for EMVCo',
  },
  '80-99': {
    name: 'Unreserved Templates',
  },
};

export const QRPH =
  '00020101021128620011ph.ppmi.p2m0111GXCHPHM2XXX032121702000005469871609905030005204581453036085802PH5917S and R MBTC 91826006Taguig6104163062650012ph.ppmi.qrph0308SRSU002005212170500000669901340940708GEN0035163049EE7';
export const MODIFIED_QRPH =
  '00020101021128620011ph.dpmi.p2m0111GXCHPHM2XXX032121702000005469871609905030005204581453036085802PH5917S and R MBTC 91826006Taguig6104163062650012ph.ppmi.qrph0308SRSU002005212170500000669901340940708GEN0035163049EE7';
export const QRPH_WITH_AMOUNT =
  '00020101021228500011ph.ppmi.p2m0111PAPHPHM1XXX0309102140529050331052047299530360854041.005802PH5903Rui6006Manila62440014com.paymaya.qr052228oYUr47CjKVCKh57wfb3s6304C116';
export const QRPH_INSTAPAY =
  '00020101021227630012com.p2pqrpay0111BNORPHMMXXX0208999644030416526727002210086752046016530360854036005802PH5903Xhf6006Makati622905062110000708915312010803***63046399';
export const PAYNOW_QR_WITH_REFERENCE =
  '00020101021226580009SG.PAYNOW010120213201929813CSPP030100414202308011802005204000053037025402205802SG5925SHOPEEPAY PRIVATE LIMITED6009SINGAPORE62270123SPP1844414393533165284563047A0C';
export const PAYNOW_QR =
  '00020101021226570009SG.PAYNOW010120213201929813CSPW030110513SPW658227463052040000530370254031005802SG5925SHOPEEPAY PRIVATE LIMITED6009SINGAPORE630426E1';
export const PARSED_QRPH = {
  28: {
    id: '28',
    name: 'Merchant Account Information',
    len: 62,
    data: {
      '00': {
        id: '00',
        name: 'Globally Unique Identifier',
        len: 11,
        data: 'ph.ppmi.p2m',
      },
      '01': {
        id: '01',
        name: 'Context Specific Data',
        len: 11,
        data: 'GXCHPHM2XXX',
      },
      '03': {
        id: '03',
        name: 'Context Specific Data',
        len: 21,
        data: '217020000054698716099',
      },
      '05': {
        id: '05',
        name: 'Context Specific Data',
        len: 3,
        data: '000',
      },
    },
  },
  52: {
    id: '52',
    name: 'Merchant Category Code',
    len: 4,
    data: '5814',
  },
  53: {
    id: '53',
    name: 'Transaction Currency',
    len: 3,
    data: '608',
  },
  58: {
    id: '58',
    name: 'Country Code',
    len: 2,
    data: 'PH',
  },
  59: {
    id: '59',
    name: 'Merchant Name',
    len: 17,
    data: 'S and R MBTC 9182',
  },
  60: {
    id: '60',
    name: 'Merchant City',
    len: 6,
    data: 'Taguig',
  },
  61: {
    id: '61',
    name: 'Postal Code',
    len: 4,
    data: '1630',
  },
  62: {
    id: '62',
    name: 'Additional Data Field Template',
    len: 65,
    data: {
      '00': {
        id: '00',
        name: 'Globally Unique Identifier',
        len: 12,
        data: 'ph.ppmi.qrph',
      },
      '03': {
        id: '03',
        name: 'Additional Data Field',
        len: 8,
        data: 'SRSU0020',
      },
      '05': {
        id: '05',
        name: 'Additional Data Field',
        len: 21,
        data: '217050000066990134094',
      },
      '07': {
        id: '07',
        name: 'Additional Data Field',
        len: 8,
        data: 'GEN00351',
      },
    },
  },
  63: {
    id: '63',
    name: 'CRC',
    len: 4,
    data: '9EE7',
  },
  '00': {
    id: '00',
    name: 'Payload Format Indicator',
    len: 2,
    data: '01',
  },
  '01': {
    id: '01',
    name: 'Point of Initiation Method',
    len: 2,
    data: '11',
  },
};