import express, { Request, Response } from 'express';
import { AccountService } from '../services/AccountService';


const createAccount = async (req: Request, res: Response) => {
    try {
        await AccountService.createAccount(req.body);
        res.status(201).json({ message: 'Account created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAccount = async (req: Request, res: Response) => {
    try {
        res.json(await AccountService.getAllAccounts());
    } catch (error) {
        res.status(500).json({ error: 'Data not found' });
    }
};

const updateAccount = async (req: Request, res: Response) => {
    try {
        const accountId = parseInt(req.params.id);
        await AccountService.updateAccount(req.body, accountId);
        res.status(201).json({ message: 'Account updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteAccount = async (req: Request, res: Response) => {
    try {
        const accountId = parseInt(req.params.id);
        await AccountService.deleteAccount(accountId)
        return res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Getting issue while deleting an account' });
    }
};


const convertToRomanNumeral = async (req: Request, res: Response) => {
    const number = parseInt(req.params.number);

    if (isNaN(number) || number < 1) {
        res.status(400).json({ error: 'Invalid number. Please provide a positive whole number (N, N >= 1).' });
        return;
    }
    const romanNumeral = await AccountService.convertToRoman(number);

    res.json({ number, romanNumeral });
};


const memoizeFunction = async (req: Request, res: Response) => {
    const memoizedFunction = await AccountService.memoize(await AccountService.someFunction);
    const result1 = memoizedFunction(req.body.first_call); // First call
    const result2 = memoizedFunction(req.body.cached_call); // Cached call
    const result3 = memoizedFunction(req.body.new_call); // New call
    res.json({ result1, result2, result3 });
};


export {
    createAccount, getAccount, updateAccount, deleteAccount, convertToRomanNumeral, memoizeFunction
};
