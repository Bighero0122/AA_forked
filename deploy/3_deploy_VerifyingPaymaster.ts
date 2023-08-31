import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'

const deployVerifyingPaymaster: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const provider = ethers.provider
  const from = await provider.getSigner().getAddress()
  const network = await provider.getNetwork()

  const entrypoint = await hre.deployments.get('EntryPoint')
  const ret = await hre.deployments.deploy(
    'VerifyingPaymaster', {
      from,
      args: [entrypoint.address, from],
      gasLimit: 6e6,
      log: true,
      deterministicDeployment: false
    })
  console.log('==VerifyingPaymaster addr=', ret.address)
}

export default deployVerifyingPaymaster
