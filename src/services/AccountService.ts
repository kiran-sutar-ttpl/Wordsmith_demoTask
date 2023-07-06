import Account from '../models/Account';

export class AccountService {

    public static async getAllAccounts(): Promise<Account[]> {
        return Account.findAll();
    }

    public static async createAccount(accountData: Account): Promise<any> {
        const { name, address, phoneNo, email, accountBalance, isActive } = accountData;
        const account = await Account.create({
            name,
            address,
            phoneNo,
            email,
            accountBalance,
            isActive
        });
        return account;
    }


    public static async updateAccount(accountData: Account, accountId: number): Promise<any> {
        const { name, address, phoneNo, email, accountBalance, isActive } = accountData;
        const account = await Account.findByPk(accountId);
        if (!account) {
            throw new Error(`Account not found`)
        }
        account.name = name ? name : account.name;
        account.address = address ? address : account.address;
        account.phoneNo = phoneNo ? phoneNo : account.phoneNo;
        account.email = email ? email : account.email;
        account.accountBalance = accountBalance ? accountBalance : account.accountBalance;

        return account.save();
    }

    public static async getAccountbyId(accountId: number) {
        return Account.findAll({ where: { id: accountId } });
    }

    public static async deleteAccount(accountId: number) {
        const account = await Account.findByPk(accountId);
        if (!account) {
            throw new Error(`Account not found`)
        }
        return await account.destroy();
    }

    public static convertToRoman = (num: number) => {
        var digits: any = String(+num).split(""),
            key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
                "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
                "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
            roman_num = "",
            i = 3;
        while (i--)
            roman_num = (key[+digits.pop() + (i * 10)] || "") + roman_num;
        return Array(+digits.join("") + 1).join("M") + roman_num;
    };

    public static memoize = (func: (...args: any[]) => any): ((...args: any[]) => any) => {
        const cache = new Map();
        return (...args: any[]): any => {
            const key = JSON.stringify(args);

            if (cache.has(key)) {
                return cache.get(key);
            }
            const result = func(...args);
            cache.set(key, result);
            return result;
        };
    };

    public static someFunction = (n: number) => {
        let result = 0;
        for (let i = 0; i < n; i++) {
            result += i;
        }
        return `Result for ${n}: ${result}`;
    };
}
