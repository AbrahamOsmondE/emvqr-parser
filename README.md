## About
JavaScript library for parsing EMV [QR Codes for Payment Systems Merchant-Presented Mode](https://www.emvco.com/specifications/emv-qr-code-specification-for-payment-systems-emv-qrcps-merchant-presented-mode/)

For development, you can test your change by creating a pull request. Go to prepublish_package of the checks section, then on the Publish Package step, you will get something like this at the bottom: @abrahamosmonde/emvqr-parser@1.0.3-c792fd6

You can then install `@abrahamosmonde/emvqr-parser` with version `1.0.3-c792fd6` to test the changes you made as a package

Don't forget to update the version everytime you plan on merging a pull-request to main

## Installation
```
npm install emvqr-parser
```

## How to use
```javascript
import {decodeQrData} from 'emvqr-parser';

// Example text received from scanning a payment QR
const QR_DATA = '00020101021128620011ph.ppmi.p2m0111GXCHPHM2XXX032121702000005469871609905030005204581453036085802PH5917S and R MBTC 91826006Taguig6104163062650012ph.ppmi.qrph0308SRSU002005212170500000669901340940708GEN0035163049EE7';

console.log(decodeQrData(QR_DATA));

// Results in the following
/**

{
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
**/
```
