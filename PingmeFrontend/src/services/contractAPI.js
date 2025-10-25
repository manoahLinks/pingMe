const SOMNIA_API_BASE = 'https://somnia.w3us.site/api/v2/smart-contracts';

export const getSomniaContractUrl = (contractAddress) => 
  `${SOMNIA_API_BASE}/${contractAddress}`;

export const parseEventsFromABI = (abi) => {
  if (!abi || !Array.isArray(abi)) return [];
  
  return abi
    .filter(item => item.type === 'event')
    .map(event => ({
      name: event.name,
      signature: createEventSignature(event),
      inputs: event.inputs,
      description: generateEventDescription(event)
    }));
};

const createEventSignature = (event) => {
  const params = event.inputs.map(input => input.type).join(',');
  return `${event.name}(${params})`;
};

const generateEventDescription = (event) => {
  const paramCount = event.inputs.length;
  if (paramCount === 0) {
    return `${event.name} event with no parameters`;
  }
  return `${event.name} event with ${paramCount} parameter${paramCount !== 1 ? 's' : ''}`;
};

export const validateContractAddress = (address) => {
  // Basic Ethereum address validation
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const formatContractInfo = (contractData) => {
  if (!contractData) return null;
  
  return {
    name: contractData.name || 'Unknown Contract',
    isVerified: contractData.is_verified || false,
    compilerVersion: contractData.compiler_version || 'Unknown',
    language: contractData.language || 'solidity',
    abi: contractData.abi || []
  };
};
