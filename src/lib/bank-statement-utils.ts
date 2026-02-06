export interface Transaction {
  date: string;
  desc: string;
  ref?: string;
  withdrawal?: string; // e.g. "50.00"
  deposit?: string;    // e.g. "1000.00"
  balance: string;     // Running balance
}

export interface BankStatementData {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  address: string;
  period: string; // "Oct 01 - Oct 31, 1948"
  startBalance: string;
  endBalance: string;
  transactions: Transaction[];
  status?: "ACTIVE" | "FROZEN" | "OVERDRAWN";
}

export function parseBankData(content: string): BankStatementData {
  let json: any = {};
  try {
    json = JSON.parse(content);
  } catch {
    json = { transactions: [] };
  }

  return {
    bankName: json.bankName || "FIRST NATIONAL BANK",
    accountHolder: json.accountHolder || "UNKNOWN",
    accountNumber: json.accountNumber || "000-0000",
    address: json.address || "Unknown Address",
    period: json.period || "Current Cycle",
    startBalance: json.startBalance || "0.00",
    endBalance: json.endBalance || "0.00",
    transactions: Array.isArray(json.transactions) ? json.transactions : [],
    status: json.status || "ACTIVE"
  };
}