import { useState } from "react";
import {
  PublicKey,
  Keypair,
  Transaction,
  SystemProgram,
  Signer,
} from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { BN, Provider } from "@project-serum/anchor";
import {
  makeStyles,
  Card,
  Button,
  Typography,
  TextField,
  useTheme,
} from "@material-ui/core";
import { ExpandMore, ImportExportRounded } from "@material-ui/icons";
import { useSwapContext, useSwapFair, _useSwapFair } from "../context/Swap";
import {
  useDexContext,
  useOpenOrders,
  useRouteVerbose,
  useMarket,
  FEE_MULTIPLIER,
} from "../context/Dex";
import { useTokenMap } from "../context/TokenList";
import { useMint, useOwnedTokenAccount } from "../context/Token";
import { useCanSwap, useReferral } from "../context/Swap";
import TokenDialog from "./TokenDialog";
import { SettingsButton } from "./Settings";
import { InfoButton, InfoLabel, Swapinfo } from "./Info";
import { SOL_MINT, WRAPPED_SOL_MINT } from "../utils/pubkeys";
import '@solana/wallet-adapter-react-ui/styles.css';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
const useStyles = makeStyles((theme) => ({
  card: {
    width: theme.spacing(50),
    background: "#101921",
    borderRadius: theme.spacing(2),
    boxShadow: "inset 0px 0px 23px 1px rgba(56, 67, 78, 0.63)",
    padding: theme.spacing(2),
    // display:"flex",
    // justifyContent:"center"
  },
  tab: {
    width: "50%",
  },
  settingsButton: {
    backgroundColor: "#14F195",
    color:"#14F195",
    padding: 0,
  },
  swapButton: {
    width: "100%",
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: 16,
    fontWeight: 700,
    padding: theme.spacing(1.5),
  },
  swapToFromButton: {
    display: "block",
    margin: "10px auto 10px auto",
    cursor: "pointer",
    borderRadius:"50%",
    background: "#101921",
    boxShadow: "inset 0px 0px 16px 1px rgba(56, 67, 78, 0.63)",
  },
  amountInput: {
    fontSize: 22,
    fontWeight: 600,
    color:"#ffffff"
  },
  input: {
    textAlign: "left",
    color:"#FFFFFF"
  },
  swapTokenFormContainer: {
    borderRadius: theme.spacing(2),
    boxShadow: "inset 0px 0px 16px 1px rgba(56, 67, 78, 0.63)",
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1),
  },
  swapTokenSelectorContainer: {
    marginLeft: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    width: "50%",
  },
  balanceContainer: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
  },
  maxButton: {
    marginLeft: theme.spacing(1),
    color: "#FFFFFF",
    fontWeight: 700,
    fontSize: "12px",
    cursor: "pointer",
  },
  tokenButton: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginBottom: theme.spacing(1),
    color:"#FFFFFF"
  },
  connectbtn:{
    background:"#14F195",
    width:"100%",
    textAlign:"center",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  }
}));

export default function SwapCard({
  containerStyle,
  contentStyle,
  swapTokenContainerStyle,
}: {
  containerStyle?: any;
  contentStyle?: any;
  swapTokenContainerStyle?: any;
}) {
  const styles = useStyles();
  return (
    <Card className={styles.card} style={containerStyle}>
      <SwapHeader />
      <div style={contentStyle}>
        <SwapFromForm style={swapTokenContainerStyle} />
        <ArrowButton />
        <SwapToForm style={swapTokenContainerStyle} />
        {/* <InfoLabel /> */}
        <Slipagediv />
        <SwapButton />
        <Bottomdiv />
      </div>
    </Card>
  );
}

export function SwapHeader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "16px",
        gap:10
      }}
    >
      {/* <Typography
        style={{
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        SWAP
      </Typography> */}
      <InfoButton />
      <SettingsButton />
    </div>
  );
}

export function ArrowButton() {
  const styles = useStyles();
  const theme = useTheme();
  const { swapToFromMints } = useSwapContext();
  return (
    <ImportExportRounded
      className={styles.swapToFromButton}
      fontSize="large"
      htmlColor={"#FFFFFF"}
      onClick={swapToFromMints}
    />
  );
}
function Bottomdiv(){
  const theme = useTheme();
  const { fromMint,toAmount, fromAmount,toMint,swapToFromMints,setFromAmount } = useSwapContext();
  // const fromtokenamount = isNaN(fromAmount) ? fromAmount : setFromAmount(0);
  const anticipatedAmount =  _useSwapFair(fromMint,toMint,null);
  return <Swapinfo >
<TokenIcon mint={fromMint} style={{ width: theme.spacing(4),marginLeft:2 }} />
<div style={{
  width:"100%",
  height:"100%",
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
}}>
<Typography style={{
          fontSize: 14,
          fontWeight: 600,
          color:"#FFFFFF",
        }}>{1}</Typography>
<TokenName mint={fromMint} style={{ fontSize: 14, fontWeight: 600, color:"#FFFFFF", paddingRight:0,marginLeft:0 }} />
<Typography style={{
          fontSize: 12,
          fontWeight: 600,
          color:"#FFFFFF",
          marginRight:2
        }}> = </Typography>
        <Typography style={{
          fontSize: 14,
          fontWeight: 600,
          color:"#FFFFFF",
          marginLeft:2
        }}>{1/anticipatedAmount}</Typography>
        <TokenName mint={toMint} style={{ fontSize: 14, fontWeight: 600, color:"#FFFFFF",paddingLeft:0,marginLeft:0 }} />
        </div>
        <ImportExportRounded
      // className={styles.swapToFromButton}
      fontSize="medium"
      htmlColor={"#14F195"}
      style={{
        marginRight:5,
        transform:"rotateZ(90deg)"
      }}
      onClick={swapToFromMints}
    />
  </Swapinfo>
}
function Slipagediv(){
  const {slippage} = useSwapContext();
  return <div
  style={{
    width:"100%",
    height:"20%",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"baseline",
    marginTop:5
  }}
  >
    <Typography
    style={{
      color:"#FFFFFF",
      lineHeight:"24px",
      fontSize:"12px",
      fontWeight:"600px"
    }}
    >Slippage Tolerance</Typography>
{slippage && <Typography  style={{
      color:"#FFFFFF",
      lineHeight:"24px",
      fontSize:"12px",
      fontWeight:"600px"
    }}>{slippage}%</Typography>}
{!slippage && <Typography  style={{
      color:"#FF0000",
      lineHeight:"24px",
      fontSize:"12px",
      fontWeight:"600px"
    }}>Cant be 0</Typography>}
  </div>
}
function SwapFromForm({ style }: { style?: any }) {
  const { fromMint, setFromMint, fromAmount, setFromAmount } = useSwapContext();
  return (<>
    <Typography style={{
          fontSize: 12,
          fontWeight: 600,
          color:"#CACACA",
          paddingLeft:2,
        }}>FROM</Typography>
    <SwapTokenForm
      from
      style={style}
      mint={fromMint}
      setMint={setFromMint}
      amount={fromAmount}
      setAmount={setFromAmount}
    />
    </>
  );
}

function SwapToForm({ style }: { style?: any }) {
  const { toMint, setToMint, toAmount, setToAmount } = useSwapContext();
  return (
    <>
    <Typography style={{
      fontSize: 12,
      fontWeight: 600,
      color:"#CACACA",
      paddingLeft:2,
    }}>TO[ESTIMATE]</Typography>
    <SwapTokenForm
      from={false}
      style={style}
      mint={toMint}
      setMint={setToMint}
      amount={toAmount}
      setAmount={setToAmount}
    />
    </>
  );
}

export function SwapTokenForm({
  from,
  style,
  mint,
  setMint,
  amount,
  setAmount,
}: {
  from: boolean;
  style?: any;
  mint: PublicKey;
  setMint: (m: PublicKey) => void;
  amount: number;
  setAmount: (a: number) => void;
}) {
  const styles = useStyles();

  const [showTokenDialog, setShowTokenDialog] = useState(false);
  const tokenAccount = useOwnedTokenAccount(mint);
  const mintAccount = useMint(mint);

  const balance =
    tokenAccount &&
    mintAccount &&
    tokenAccount.account.amount.toNumber() / 10 ** mintAccount.decimals;

  const formattedAmount =
    mintAccount && amount
      ? amount.toLocaleString("fullwide", {
          maximumFractionDigits: mintAccount.decimals,
          useGrouping: false,
        })
      : amount;

      const setVal = (e:Object)=>{
        // console.log(e.target.value)
        setAmount(parseFloat(e.target.value))
      }
      // console.log(amount)

  return (
    <div className={styles.swapTokenFormContainer} style={style}>
      <TokenDialog
        setMint={setMint}
        open={showTokenDialog}
        onClose={() => setShowTokenDialog(false)}
      />
      <TextField
        type="number"
        value={formattedAmount}
        onChange={setVal}
        InputProps={{
          disableUnderline: true,
          classes: {
            root: styles.amountInput,
            input: styles.input,
          },
        }}
      />
       
      <div className={styles.swapTokenSelectorContainer}>
        <TokenButton mint={mint} onClick={() => setShowTokenDialog(true)} />
        <Typography color="#FFFFFF" className={styles.balanceContainer}>
          {tokenAccount && mintAccount
            ? `Balance: ${balance?.toFixed(mintAccount.decimals)}`
            : `-`}
          {from && !!balance ? (
            <span
              className={styles.maxButton}
              onClick={() => setAmount(balance)}
              style={{color:"#ffffff"}}
            >
              MAX
            </span>
          ) : null}
        </Typography>
      </div>
    
    </div>
  );
}

function TokenButton({
  mint,
  onClick,
}: {
  mint: PublicKey;
  onClick: () => void;
}) {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <div onClick={onClick} className={styles.tokenButton}>
      <ExpandMore />
      <TokenName mint={mint} style={{ fontSize: 14, fontWeight: 700, color:"#FFFFFF" }} />
      <TokenIcon mint={mint} style={{ width: theme.spacing(4) }} />
    </div>
  );
}

export function TokenIcon({ mint, style }: { mint: PublicKey; style: any }) {
  const tokenMap = useTokenMap();
  let tokenInfo = tokenMap.get(mint.toString());
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {tokenInfo?.logoURI ? (
        <img alt="Logo" style={style} src={tokenInfo?.logoURI} />
      ) : (
        <div style={style}></div>
      )}
    </div>
  );
}

function TokenName({ mint, style }: { mint: PublicKey; style: any }) {
  const tokenMap = useTokenMap();
  const theme = useTheme();
  let tokenInfo = tokenMap.get(mint.toString());

  return (
    <Typography
      style={{
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(1),
        ...style,
      }}
    >
      {tokenInfo?.symbol}
    </Typography>
  );
}

export function SwapButton() {
  const styles = useStyles();
  const {
    fromMint,
    toMint,
    fromAmount,
    slippage,
    isClosingNewAccounts,
    isStrict,
  } = useSwapContext();
  const { swapClient } = useDexContext();
  const fromMintInfo = useMint(fromMint);
  const toMintInfo = useMint(toMint);
  const openOrders = useOpenOrders();
  const route = useRouteVerbose(fromMint, toMint);
  const fromMarket = useMarket(
    route && route.markets ? route.markets[0] : undefined
  );
  const toMarket = useMarket(
    route && route.markets ? route.markets[1] : undefined
  );
  const canSwap = useCanSwap();
  const referral = useReferral(fromMarket);
  const fair = useSwapFair();
  let fromWallet = useOwnedTokenAccount(fromMint);
  let toWallet = useOwnedTokenAccount(toMint);
  const quoteMint = fromMarket && fromMarket.quoteMintAddress;
  const quoteMintInfo = useMint(quoteMint);
  const quoteWallet = useOwnedTokenAccount(quoteMint);

  // Click handler.
  const sendSwapTransaction = async () => {
    if (!fromMintInfo || !toMintInfo) {
      throw new Error("Unable to calculate mint decimals");
    }
    if (!fair) {
      throw new Error("Invalid fair");
    }
    if (!quoteMint || !quoteMintInfo) {
      throw new Error("Quote mint not found");
    }

    const amount = new BN(fromAmount * 10 ** fromMintInfo.decimals);
    const isSol = fromMint.equals(SOL_MINT) || toMint.equals(SOL_MINT);
    const wrappedSolAccount = isSol ? Keypair.generate() : undefined;

    // Build the swap.
    let txs = await (async () => {
      if (!fromMarket) {
        throw new Error("Market undefined");
      }

      const minExchangeRate = {
        rate: new BN((10 ** toMintInfo.decimals * FEE_MULTIPLIER) / fair)
          .muln(100 - slippage)
          .divn(100),
        fromDecimals: fromMintInfo.decimals,
        quoteDecimals: quoteMintInfo.decimals,
        strict: isStrict,
      };
      const fromOpenOrders = fromMarket
        ? openOrders.get(fromMarket?.address.toString())
        : undefined;
      const toOpenOrders = toMarket
        ? openOrders.get(toMarket?.address.toString())
        : undefined;
      const fromWalletAddr = fromMint.equals(SOL_MINT)
        ? wrappedSolAccount!.publicKey
        : fromWallet
        ? fromWallet.publicKey
        : undefined;
      const toWalletAddr = toMint.equals(SOL_MINT)
        ? wrappedSolAccount!.publicKey
        : toWallet
        ? toWallet.publicKey
        : undefined;

      return await swapClient.swapTxs({
        fromMint,
        toMint,
        quoteMint,
        amount,
        minExchangeRate,
        referral,
        fromMarket,
        toMarket,
        // Automatically created if undefined.
        fromOpenOrders: fromOpenOrders ? fromOpenOrders[0].address : undefined,
        toOpenOrders: toOpenOrders ? toOpenOrders[0].address : undefined,
        fromWallet: fromWalletAddr,
        toWallet: toWalletAddr,
        quoteWallet: quoteWallet ? quoteWallet.publicKey : undefined,
        // Auto close newly created open orders accounts.
        close: isClosingNewAccounts,
      });
    })();

    // If swapping SOL, then insert a wrap/unwrap instruction.
    if (isSol) {
      if (txs.length > 1) {
        throw new Error("SOL must be swapped in a single transaction");
      }
      const { tx: wrapTx, signers: wrapSigners } = await wrapSol(
        swapClient.program.provider,
        wrappedSolAccount as Keypair,
        fromMint,
        amount
      );
      const { tx: unwrapTx, signers: unwrapSigners } = unwrapSol(
        swapClient.program.provider,
        wrappedSolAccount as Keypair
      );
      const tx = new Transaction();
      tx.add(wrapTx);
      tx.add(txs[0].tx);
      tx.add(unwrapTx);
      txs[0].tx = tx;
      txs[0].signers.push(...wrapSigners);
      txs[0].signers.push(...unwrapSigners);
    }

    await swapClient.program.provider.sendAll(txs);
  };
  const {connected} = useWallet();
  return (<>
   {connected && <Button
      variant="contained"
      className={styles.swapButton}
      onClick={sendSwapTransaction}
      style={{
        color:"#FFFFFF",
        marginTop:10,
        borderRadius:7.5,
        background:'#14F195'
      }}
      disabled={!canSwap}
    >
      Swap
    </Button>}
    {!connected && <WalletMultiButton 
    className={styles.connectbtn}
    style={{
      width:"5em",
      backgroundColor:"#14F195"
    }}>CONNECT</WalletMultiButton>}
    </>
  );
}

async function wrapSol(
  provider: Provider,
  wrappedSolAccount: Keypair,
  fromMint: PublicKey,
  amount: BN
): Promise<{ tx: Transaction; signers: Array<Signer | undefined> }> {
  const tx = new Transaction();
  const signers = [wrappedSolAccount];
  // Create new, rent exempt account.
  tx.add(
    SystemProgram.createAccount({
      fromPubkey: provider.wallet.publicKey,
      newAccountPubkey: wrappedSolAccount.publicKey,
      lamports: await Token.getMinBalanceRentForExemptAccount(
        provider.connection
      ),
      space: 165,
      programId: TOKEN_PROGRAM_ID,
    })
  );
  // Transfer lamports. These will be converted to an SPL balance by the
  // token program.
  if (fromMint.equals(SOL_MINT)) {
    tx.add(
      SystemProgram.transfer({
        fromPubkey: provider.wallet.publicKey,
        toPubkey: wrappedSolAccount.publicKey,
        lamports: amount.toNumber(),
      })
    );
  }
  // Initialize the account.
  tx.add(
    Token.createInitAccountInstruction(
      TOKEN_PROGRAM_ID,
      WRAPPED_SOL_MINT,
      wrappedSolAccount.publicKey,
      provider.wallet.publicKey
    )
  );
  return { tx, signers };
}

function unwrapSol(
  provider: Provider,
  wrappedSolAccount: Keypair
): { tx: Transaction; signers: Array<Signer | undefined> } {
  const tx = new Transaction();
  tx.add(
    Token.createCloseAccountInstruction(
      TOKEN_PROGRAM_ID,
      wrappedSolAccount.publicKey,
      provider.wallet.publicKey,
      provider.wallet.publicKey,
      []
    )
  );
  return { tx, signers: [] };
}
