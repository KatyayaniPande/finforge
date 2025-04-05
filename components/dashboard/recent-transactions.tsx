'use client';

const transactions = [
  {
    name: "John Doe",
    email: "john@example.com",
    amount: "+$1,999.00",
  },
  {
    name: "Alice Smith",
    email: "alice@example.com",
    amount: "+$39.00",
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    amount: "+$299.00",
  },
  {
    name: "Emma Wilson",
    email: "emma@example.com",
    amount: "+$99.00",
  },
  {
    name: "Michael Brown",
    email: "michael@example.com",
    amount: "+$599.00",
  },
];

export function RecentTransactions() {
  return (
    <div className="space-y-8">
      {transactions.map((transaction) => (
        <div key={transaction.email} className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-4">
            {transaction.name.charAt(0)}
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.name}</p>
            <p className="text-sm text-muted-foreground">{transaction.email}</p>
          </div>
          <div className="ml-auto font-medium">{transaction.amount}</div>
        </div>
      ))}
    </div>
  );
} 