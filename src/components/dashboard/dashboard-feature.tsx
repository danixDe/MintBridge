import { Button } from '@/components/ui/button';
import {  FaEthereum } from 'react-icons/fa';
import { ClusterButton, WalletButton } from '../solana/solana-provider';

export function DashboardFeature() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-center">
      <div className="flex items-center justify-center bg-primary/10 w-20 h-20 rounded-full mb-6 py-4 animate-pulse">
        <FaEthereum className="h-12 w-12 text-primary" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
        Solana Token Manager
      </h1>
      
      <p className="text-xl text-muted-foreground max-w-2xl mb-8">
        Connect your wallet to create, mint, and manage tokens on the Solana devnet
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <WalletButton />
        <ClusterButton />
        <Button variant="outline">Learn More</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-4xl w-full">
        <FeatureCard 
          title="Create Tokens" 
          description="Design and deploy your own tokens on Solana devnet" 
        />
        <FeatureCard 
          title="Mint Tokens" 
          description="Mint tokens to any address with just a few clicks" 
        />
        <FeatureCard 
          title="Manage Wallet" 
          description="View your balance and transaction history" 
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 border-t rounded-xl bg-transparent/50 backdrop-blur-sm transition-all hover:shadow-md hover:border-primary/50">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}