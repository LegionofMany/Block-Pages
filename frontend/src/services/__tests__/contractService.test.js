jest.mock('../env', () => ({
  getContractAddress: () => '0x0000000000000000000000000000000000000000',
}));

import { getContract } from '../contractService';
import contractArtifact from '../../smart-contracts/BlockPages.json';

describe('contractService', () => {
  it('returns a contract instance with correct ABI', () => {
    const fakeProvider = {};
    const contract = getContract(fakeProvider);
    expect(contract.interface.fragments.map(f => f.name)).toEqual(
      contractArtifact.abi.map(f => f.name)
    );
  });
});
