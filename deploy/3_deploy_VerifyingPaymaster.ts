import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'
import { BytesLike } from 'ethers';
import * as dotenv from "dotenv"
dotenv.config();

const deployVerifyingPaymaster: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const provider = ethers.provider
  const from = await provider.getSigner().getAddress()
  const network = await provider.getNetwork()
  const paymasterPrivateKey = process.env.PAYMASTER_PRIVATE_KEY as BytesLike
  const verifyingPaymaster = new ethers.Wallet(paymasterPrivateKey, provider)

  const entrypoint = await hre.deployments.get('EntryPoint')
  const ret = await hre.deployments.deploy(
    'VerifyingPaymaster', {
      from: paymasterPrivateKey as string,
      args: [entrypoint.address, verifyingPaymaster.address],
      gasLimit: 6e6,
      log: true,
      deterministicDeployment: false
    })
  console.log('==VerifyingPaymaster addr=', ret.address)
}

export default deployVerifyingPaymaster
