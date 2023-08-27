import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'

const deploySimpleAccountFactory: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const provider = ethers.provider
  const from = await provider.getSigner().getAddress()
  const network = await provider.getNetwork()

  const entrypoint = await hre.deployments.get('EntryPoint')
  await hre.deployments.deploy(
    'SimpleAccountFactory', {
      from,
      args: [entrypoint.address],
      gasLimit: 6e6,
      log: true,
      deterministicDeployment: true
    })

  await hre.deployments.deploy('TestCounter', {
    from,
    deterministicDeployment: true,
    log: true
  })
}

export default deploySimpleAccountFactory
