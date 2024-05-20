import React, { useEffect, useState } from "react";
import BalanceComponent from "./balance/Balance.component";
import ExpenseForm from "./expense/ExpenseForm";
import PersonForm from "./person/PersonForm";
import { Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { useParams } from "react-router-dom";
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

interface Person {
    name: string;
    night: number;
    trip_id: number;
}

interface Expense {
    amount: number;
    description: string;
    person: string;
}

interface Balance {
    person1: string;
    person2: string;
    amount: number;
}

interface MainFormProps {}

const MainForm: React.FC<MainFormProps> = () => {
    const [persons, setPersons] = useState<Person[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [balances, setBalances] = useState<Balance[]>([]);
    const { id } = useParams<{ id: string }>();

    const updatePersonsList = (newPersons: Person[]) => {
        setPersons(newPersons);
    };

    const updateExpensesList = (newExpenses: Expense[]) => {
        setExpenses(newExpenses);
    };

    const updateBalanceList = (newBalances: Balance[]) => {
        setBalances(newBalances);
    };

    const removePersonFromDb = async (person: Person) => {
        const apiUrl = process.env.REACT_APP_DOMAIN_URL;

        await fetch(`${apiUrl}/api/deletePerson`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });
    };

    const removePerson = (personName: string) => {
        const newPersons = persons.filter(
            (person: Person) => person.name !== personName
        );

        const newExpenses = expenses.filter(
            (expense: Expense) => expense.person !== personName
        );

        setPersons(newPersons);
        setExpenses(newExpenses);
    };

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_DOMAIN_URL;
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
        };

        const fetchData = async () => {
            try {
                const {
                    data: {
                        personsResponse,
                        expensesResponse
                    }
                } = await axios.get(`${apiUrl}/api/getAllInfoFromTrip/${id}`, { headers: headers });
                setPersons(personsResponse);
                setExpenses(expensesResponse);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'persons' | 'expenses') => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target?.result;
                if (data) {
                    const workbook = XLSX.read(data, { type: 'binary' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const csv = XLSX.utils.sheet_to_csv(worksheet);
                    parseCsv(csv, type);
                }
            };
            reader.readAsBinaryString(file);
        }
    };

    const parseCsv = (csv: string, type: 'persons' | 'expenses') => {
        Papa.parse(csv, {
            header: true,
            dynamicTyping: true,
            complete: (results) => {
                if (type === 'persons') {
                    const data = results.data as Person[];
                    setPersons(prevPersons => [...prevPersons, ...data]);
                } else {
                    const data = results.data as Expense[];
                    setExpenses(prevExpenses => [...prevExpenses, ...data]);
                }
            },
            error: (error: any) => {
                console.error('Error parsing CSV file:', error);
            },
        });
    };

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col md={6}>
                    <PersonForm
                        persons={persons}
                        removePerson={removePerson}
                        updatePersonsList={updatePersonsList}
                    />
                </Col>
                <Col md={6}>
                    <ExpenseForm
                        persons={persons}
                        expenses={expenses}
                        updateExpensesList={updateExpensesList}
                    />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={8}>
                    <BalanceComponent
                        persons={persons}
                        expenses={expenses}
                        balances={balances}
                        updateBalanceList={updateBalanceList}
                    />
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={6}>
                    <div>
                        <label>Fichier pour upload les personnes. Format: (name, night, trip_id): </label>
                        <input type="file" accept=".csv,.xls,.xlsx" onChange={(e) => handleFileUpload(e, 'persons')} />
                    </div>
                    <div>
                        <label>Fichier pour upload les dépenses. Format: (amount, description, person): </label>
                        <input type="file" accept=".csv,.xls,.xlsx" onChange={(e) => handleFileUpload(e, 'expenses')}/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default MainForm;
export type { Person, Expense, Balance };
