export async function readContract(provider, { address, abi, functionName, args = [] }) {
  return await provider.readContract({
    address,
    abi,
    functionName,
    args
  })
}

export async function writeContract(signer, provider, { address, abi, functionName, args = [] }) {
  const { request } = await provider.simulateContract({
    address,
    abi,
    functionName,
    args
  })
  return await signer.writeContract(request)
}
