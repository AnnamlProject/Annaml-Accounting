import React, { useMemo } from 'react';
import Header from '../../layout/Header';
import { useData } from '../../../hooks/useData';
import { TransactionType } from '../../../types';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943', '#19A2FF'];

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

const IncomeStatement: React.FC = () => {
    const { transactions } = useData();

    const { expenseByCategory, totalIncome, totalExpenses, netIncome, expensesList } = useMemo(() => {
        const categoryMap: { [key: string]: number } = {};
        let totalIncome = 0;
        let totalExpenses = 0;

        transactions.forEach(t => {
            if (t.type === TransactionType.Expense) {
                if (!categoryMap[t.category]) {
                    categoryMap[t.category] = 0;
                }
                categoryMap[t.category] += t.amount;
                totalExpenses += t.amount;
            } else if (t.type === TransactionType.Income) {
                totalIncome += t.amount;
            }
        });
        
        const expenseByCategory = Object.entries(categoryMap).map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }));
        const expensesList = Object.entries(categoryMap).map(([name, value]) => ({ name, value}));
        const netIncome = totalIncome - totalExpenses;

        return { expenseByCategory, totalIncome, totalExpenses, netIncome, expensesList };
    }, [transactions]);

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <Header title="Income Statement" />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Income Statement</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <p className="font-medium text-slate-700">Total Revenue</p>
                            <p className="font-semibold text-green-600">{formatCurrency(totalIncome)}</p>
                        </div>
                        <hr/>
                        <div>
                            <p className="font-medium text-slate-700 mb-2">Expenses</p>
                            <ul className="space-y-2 pl-4">
                                {expensesList.map(exp => (
                                    <li key={exp.name} className="flex justify-between items-center text-sm">
                                        <span className="text-slate-600">{exp.name}</span>
                                        <span className="text-slate-800">{formatCurrency(exp.value)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <hr/>
                        <div className="flex justify-between items-center font-bold">
                            <p className="text-slate-700">Total Expenses</p>
                            <p className="text-red-600">{formatCurrency(totalExpenses)}</p>
                        </div>
                        <div className={`flex justify-between items-center p-3 rounded-md ${netIncome >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                            <p className="font-bold text-lg text-slate-800">Net Income</p>
                            <p className={`font-bold text-lg ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(netIncome)}</p>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Expense Breakdown</h3>
                    {expenseByCategory.length > 0 ? (
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={expenseByCategory}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                >
                                    {expenseByCategory.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-center text-slate-500 py-16">No expense data available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IncomeStatement;