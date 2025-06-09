'use client';
import { WalletButton } from '@/components/solana/solana-provider';
import React, { useEffect, useState } from 'react';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Keypair,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  transfer,
  getMint,
  getAccount,
  Account,
} from '@solana/spl-token';
import { useWalletUi } from '@wallet-ui/react';
import { toast, Toaster } from 'react-hot-toast';
import { useTransactionToast } from '@/components/use-transaction-toast';
import { Buffer } from 'buffer';

if (typeof window !== 'undefined') {
  window.Buffer = window.Buffer || Buffer;
}

const MintToken: React.FC = () => {
  const [mint, setMint] = useState<PublicKey | null>(null);
  const [fromTokenAccount, setFromTokenAccount] = useState<Account | null>(null);
  const [fromWallet, setFromWallet] = useState<Keypair | null>(null); 
  const transactionToast = useTransactionToast();
  useEffect(() => {
    const storedWallet = localStorage.getItem('fromWallet');
    const storedMint = localStorage.getItem('mint');

    if (storedWallet) {
      const secret = Uint8Array.from(JSON.parse(storedWallet));
      const keypair = Keypair.fromSecretKey(secret);
      setFromWallet(keypair);
    } else {
      const newWallet = Keypair.generate();
      setFromWallet(newWallet);
      localStorage.setItem('fromWallet', JSON.stringify(Array.from(newWallet.secretKey)));
    }

    if (storedMint) {
      setMint(new PublicKey(storedMint));
    }
  }, []);
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const { account } = useWalletUi();

  let toWallet = '';
  if (account) {
    toWallet = account.address;
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        <WalletButton />
      </div>
    );
  }



  const createToken = async () => {
    try {
      if (!fromWallet) return;

      const airdropSignature = await connection.requestAirdrop(fromWallet.publicKey, LAMPORTS_PER_SOL);
      await connection.confirmTransaction(airdropSignature, 'confirmed');

      const newMint = await createMint(
        connection,
        fromWallet,
        fromWallet.publicKey,
        null,
        9
      );

      setMint(newMint);
      localStorage.setItem('mint', newMint.toBase58());
      toast.success(`Token Minted: ${newMint.toBase58()}`)
      transactionToast(`Token Minted: ${newMint.toBase58()}`);
      console.log(`Token Minted: ${newMint.toBase58()}`);

      const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        newMint,
        fromWallet.publicKey
      );

      setFromTokenAccount(tokenAccount);
      transactionToast(`From Token Account: ${tokenAccount.address.toBase58()}`);
    toast.success(`From Token Account: ${tokenAccount.address.toBase58()}`);
    console.log(`From Token Account: ${tokenAccount.address.toBase58()}`);

    } catch (err) {
      transactionToast(`Error creating token: ${err.message || err}`);
    toast.error(`Error creating token: ${err}`);
    console.log(`Error creating token: ${ err}`);

    }
  };

  const mintToken = async () => {
    if (!mint || !fromTokenAccount || !fromWallet) {
      return toast.error(' Create token first');
    }

    try {
      const signature = await mintTo(
        connection,
        fromWallet,
        mint,
        fromTokenAccount.address,
        fromWallet.publicKey,
        10_000_000_000
      );
      transactionToast(`Minted! Txn Signature: ${signature}`);
            toast.success(`Minted! Txn Signature: ${signature}`);
            console.log(`Minted! Txn Signature: ${signature}`);

    } catch (err) {
      transactionToast(`Error minting token: ${err}`);
    toast.error(`Error minting token: ${err}`);
    console.log(`Error minting token: ${err}`);

    }
  };

  const checkBalance = async () => {
    if (!mint || !fromTokenAccount) {
      return toast.error('Create token first');
    }

    try {
      const mintInfo = await getMint(connection, mint);
      const accountInfo = await getAccount(connection, fromTokenAccount.address);
      transactionToast(`Supply: ${mintInfo.supply.toString()}\nBalance: ${accountInfo.amount.toString()}`);
    toast.success(`Supply: ${mintInfo.supply.toString()}\nBalance: ${accountInfo.amount.toString()}`);
    console.log(`Supply: ${mintInfo.supply.toString()}\nBalance: ${accountInfo.amount.toString()}`);


    } catch (err) {
      transactionToast(`Error checking balance: ${err}`);
            toast.error(`Error checking balance: ${ err}`);
            console.log(`Error checking balance: ${ err}`);
    }
  };

  const sendToken = async () => {
    if (!mint || !fromTokenAccount || !fromWallet) {
      return toast.error('Create token first');
    }

    try {
      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        new PublicKey(toWallet)
      );

      const signature = await transfer(
        connection,
        fromWallet,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        1_000_000_000
      );
      toast.success(` Sent! Txn Signature: ${signature}`);
      console.log(` Sent! Txn Signature: ${signature}`);

      transactionToast(` Sent! Txn Signature: ${signature}`);
    } catch (err) {
      transactionToast(`Error sending token: ${err}`);
    toast.error(`Error sending token: ${err}`);
    console.log(`Error sending token: ${err}`);
    }
  };

  return (
    <div className="max-h-screen bg-background p-8 mb-48 text-white flex flex-col items-left justify-center space-y-6">
        <Toaster />
      <h2 className="text-2xl mt-0 mb-8 font-bold">Mint & Send Token</h2>
<div className="space-y-2 bg-background p-4 rounded-lg text-sm text-zinc-300 border border-zinc-700">
  <h3 className="text-lg font-semibold text-white">Solana Token Workflow (Devnet)</h3>
  <ul className="list-disc list-inside space-y-1">
    <li><strong>Step 1:</strong> Generate a new wallet (Keypair) to act as the token authority.</li>
    <li><strong>Step 2:</strong> Airdrop 1 SOL from <code>devnet</code> to fund transactions.</li>
    <li><strong>Step 3:</strong> Create a new token mint with 9 decimal places (like SOL).</li>
    <li><strong>Step 4:</strong> Create an Associated Token Account (ATA) for your wallet. <i><b className='text-blue-300'>click on the Create Token account button to do that</b></i></li>
    <li><strong>Step 5:</strong> Mint tokens to the ATA — now you're holding your custom token. <i><b className='text-purple-300'>click on the Mint Token button to do that</b></i></li>
    <li><strong>Step 6:</strong> Check total supply & your token account balance.<i><b className='text-teal-600'> click on the Check Balance to do that</b></i></li>
    <li><strong>Step 7:</strong> Send tokens to any wallet (even your own connected wallet) default set to the wallet you are logged in. <i><b className='text-orange-700'>click on the Send Tokens to do that</b></i></li>
  </ul>
  <p className="text-xs text-zinc-400 italic">Note: This works on <strong>Solana Devnet</strong>, a free test network. SOL used here is not real money.</p>
</div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <button
          onClick={createToken}
          className="px-4 py-2 border-1 cursor-pointer rounded-xl bg-background hover:bg-white-700 text-blue-300 transition-all"
        >
          Create Token Account
        </button>
        <button
          onClick={mintToken}
          className="px-4 py-2 cursor-pointer border-1 rounded-xl bg-background hover:bg-white-700 text-purple-300 transition-all"
        >
          Mint Token
        </button>
        <button
          onClick={checkBalance}
          className="px-4 py-2 border-1 cursor-pointer rounded-xl bg-background hover:bg-white-700 text-teal-600 transition-all"
        >
          Check Balance
        </button>
        <button
          onClick={sendToken}
          className="px-4 py-2 border-1 cursor-pointer rounded-xl bg-background hover:bg-white-700 text-orange-700 text transition-all"
        >
          Send Token
        </button>
      </div>
    </div>
  );
};

export default MintToken;
