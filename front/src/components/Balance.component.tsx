import * as React from 'react';
import { useState, useEffect } from 'react';

function BalanceList() {
    const [balances, setBalances] = useState([]);

    useEffect(() => {
        fetch('/api/balance')
            .then(response => response.json())
            .then(data => setBalances(data));
    }, []);

    return (
        <div>
            <h2>Balance</h2>
            <table>
                <thead>
                    <tr>
                        <th>Person</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {balances.map((balance: any) => (
                        <tr key={balance.id}>
                            <td>{balance.person}</td>
                            <td>{balance.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
