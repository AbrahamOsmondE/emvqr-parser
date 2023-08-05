import { NestedData } from '../core';
import { computeCRC } from '../crc';
import { decodeQrData } from '../emvqr';
import * as constants from '../utils/constants';

describe('EMV QR Test', () => {
  it('should compute the correct checksum', async () => {
    const data = constants.QRPH.substring(0, constants.QRPH.length - 4);
    const checksum = constants.QRPH.substring(constants.QRPH.length - 4).toUpperCase();

    expect(computeCRC(data)).toEqual(checksum);
  });

  it('should detect changes in the QR using checksum', async () => {
    const modifiedData = constants.MODIFIED_QRPH.substring(0, constants.MODIFIED_QRPH.length - 4);
    const checksum = constants.MODIFIED_QRPH.substring(constants.MODIFIED_QRPH.length - 4).toUpperCase();

    expect(computeCRC(modifiedData)).not.toEqual(checksum);
  });

  it('should decodeQrData the QR code correctly', () => {
    expect(decodeQrData(constants.QRPH)).toEqual(constants.PARSED_QRPH);
  });

  it('should contain amount', () => {
    const decodedQrData = decodeQrData(constants.QRPH_WITH_AMOUNT);
    expect(decodedQrData['54']).toBeTruthy();
  });

  it('should throw an error if the checksum validation fails', () => {
    expect(() => decodeQrData(constants.MODIFIED_QRPH)).toThrow('Checksum validation failed.');
    expect(() => decodeQrData('invalid')).toThrow('Checksum validation failed.');
  });

  it('Should be labelled correctly for non custom payment', () => {
    const data = decodeQrData(constants.QRPH_INSTAPAY)
    const additionalData = data[62].data as NestedData
    expect(additionalData['05'].name).toEqual("Reference Label")
    expect(additionalData['07'].name).toEqual("Terminal Label")
    expect(additionalData['08'].name).toEqual("Purpose of Transaction")

  })

  it('Should be labelled correctly for custom payment', () => {
    const data = decodeQrData(constants.QRPH)
    const additionalData = data[62].data as NestedData
    expect(additionalData['00'].name).toEqual("Globally Unique Identifier")
    expect(additionalData['03'].name).toEqual("Additional Data Field")
    expect(additionalData['05'].name).toEqual("Additional Data Field")
    expect(additionalData['07'].name).toEqual("Additional Data Field")
  })
});