import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import '@solana/wallet-adapter-react-ui/styles.css';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Walletctx } from '../contexts/walletctx';
import { useState, useEffect, useMemo } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Button, Grid } from "@material-ui/core/";
import {makeStyles} from "@material-ui/core/styles"
import  {Provider}  from "@project-serum/anchor";
import Wallet from "@project-serum/sol-wallet-adapter";
import swapstyles from './swap.module.css';
import {
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import {
  Signer,
  ConfirmOptions,
  Connection,
  Transaction,
  TransactionSignature,
  PublicKey,
} from "@solana/web3.js";
import {
  TokenListContainer,
  TokenListProvider,
} from "@solana/spl-token-registry";
// import Swap from "@project-serum/swap-ui";
import Swap from './src/index'
import { useMediaQuery } from '@chakra-ui/react'
// import { bs58 } from '@project-serum/anchor/dist/utils/bytes';
// import { Wallet } from './contexts/walletctx';
export default function Swapui(){
    return (
      <Walletctx>
        <SnackbarProvider maxSnack={5} autoHideDuration={8000}>
        <AppInner />
      </SnackbarProvider>
      </Walletctx>
    )
}
const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: "100vh",
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  }));
 
  function AppInner() {
    const [isLargerThan501] = useMediaQuery('(min-width: 501px)')
    const [isTallerThan640] = useMediaQuery('(min-height: 640px)')
    const styles = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [tokenList, setTokenList] = useState<TokenListContainer | null>(null);
    const {connected} = useWallet()
    const {connection} = useConnection();
    // const [provider,setProvider] = useState<Provider | null>(null)
    const opts = {
      preflightCommitment: "processed"
    }
    const wallet = useWallet();
    // async function getProvider() {
      
    //   /* create the provider and return it to the caller */
    //   /* network set to local network for now */
    //   // const network = "https://solana-api.projectserum.com";
    //   // const connection = new Connection(network, opts.preflightCommitment);
      
    //   const provider = new Provider(
    //     connection, wallet, opts.preflightCommitment,
    //   );
    //   return provider;
    // }
    const [provider] = useMemo(() => {
      const opts: ConfirmOptions = {
        preflightCommitment: "recent",
        commitment: "recent",
      };
      const network = "https://solana-api.projectserum.com";
      // const finwallet:Wallet = wallet;
      // const wallet = new Wallet("https://www.sollet.io", network);
      
      const provider = new NotifyingProvider(
        connection,
        wallet,
        opts,
        (tx, err) => {
          if (err) {
            enqueueSnackbar(`Error: ${err.toString()}`, {
              variant: "error",
            });
          } else {
            enqueueSnackbar("Transaction sent", {
              variant: "success",
              action: (
                <Button
                  color="inherit"
                  component="a"
                  target="_blank"
                  rel="noopener"
                  href={`https://explorer.solana.com/tx/${tx}`}
                >
                  View on Solana Explorer
                </Button>
              ),
            });
          }
        }
      );
      return [provider];
    }, [enqueueSnackbar]);
    // useEffect(()=>{
    //   async function setupProvider() {
    //     const prov = await getProvider();
    //     setProvider(prov)
    //   }s
    //   setupProvider()
    // },[connected === true])
    useEffect(() => {
      new TokenListProvider().resolve().then((r)=>{
        let tokenlistresult =  r;
       tokenlistresult.tokenList = [{chainId: 101,
        address:"9EKEh1CHMKmyvBTY6qYZm7kgRJE18tCbaY1ZbpdELbVr",
       decimals:6,
      logoURI:"https://raw.githubusercontent.com/BullSolana/assets/main/Logo.png",
      name:"Bull Solana",
      symbol:"BULLS",
      extensions:{
        serumV3Usdc:"6RwbgK5MMmaA7gnz9vkdmVjJohTChGSeT3N4tGJrM3w2"
      }
      },...r.tokenList]
        setTokenList(v => tokenlistresult)
      });
    }, [setTokenList]);
    console.log(tokenList)
  
    // Connect to the wallet.
    const fromBullsolana = new PublicKey("9EKEh1CHMKmyvBTY6qYZm7kgRJE18tCbaY1ZbpdELbVr")
    const toUsdc = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")
    const referr = new PublicKey("GDQQVvKbdJEX8fxc2DaoPW2WQoxUWHb68HNcxwEE6dae")
const userPukey = connected ? wallet.publicKey.toBase58() : null; 
    return (
      <div className={swapstyles.swapwrapper}>
        <WalletMultiButton className={swapstyles.swapbtn}>
          {!connected ? "Connect" : `${userPukey.slice(0,3)}...${userPukey.slice(-4,-1)}`}
        </WalletMultiButton>
        {tokenList 
        // &&provider 
     && <Swap provider={provider} tokenList={tokenList} referral={referr} containerStyle={{width:`${isLargerThan501 ? '450px':'80%'}`}}/>}
</div>
    );
  }


  interface AnchorWallet {
    signTransaction(tx: Transaction): Promise<Transaction>;
    signAllTransactions(txs: Transaction[]): Promise<Transaction[]>;
    publicKey: PublicKey;
  }
  
  // Custom provider to display notifications whenever a transaction is sent.
  
  // Note that this is an Anchor wallet/network provider--not a React provider,
  // so all transactions will be flowing through here, which allows us to
  // hook in to display all transactions sent from the `Swap` component
  // as notifications in the parent app.
  class NotifyingProvider extends Provider {
    // Function to call whenever the provider sends a transaction;
    private onTransaction: (
      tx: TransactionSignature | undefined,
      err?: Error
    ) => void;
  
    constructor(
      connection: Connection,
      wallet: Wallet,
      opts: ConfirmOptions,
      onTransaction: (tx: TransactionSignature | undefined, err?: Error) => void
    ) {
      const newWallet = wallet as AnchorWallet;
      super(connection, newWallet, opts);
      this.onTransaction = onTransaction;
    }
  
    async send(
      tx: Transaction,
      signers?: Array<Signer | undefined>,
      opts?: ConfirmOptions
    ): Promise<TransactionSignature> {
      try {
        const txSig = await super.send(tx, signers, opts);
        this.onTransaction(txSig);
        return txSig;
      } catch (err) {
        if (err instanceof Error || err === undefined) {
          this.onTransaction(undefined, err);
        }
        return "";
      }
    }
  
    async sendAll(
      txs: Array<{ tx: Transaction; signers: Array<Signer | undefined> }>,
      opts?: ConfirmOptions
    ): Promise<Array<TransactionSignature>> {
      try {
        const txSigs = await super.sendAll(txs, opts);
        txSigs.forEach((sig) => {
          this.onTransaction(sig);
        });
        return txSigs;
      } catch (err) {
        if (err instanceof Error || err === undefined) {
          this.onTransaction(undefined, err);
        }
        return [];
      }
    }
  }