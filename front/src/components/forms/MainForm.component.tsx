import React, {useEffect, useState} from "react";
import BalanceComponent from "./balance/Balance.component";
import ExpenseForm from "./expense/ExpenseForm";
import PersonForm from "./person/PersonForm";
import {Container, Row, Col} from 'react-bootstrap';
import axios from "axios";
import {useParams} from "react-router-dom";

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


interface MainFormProps {
}

const MainForm: React.FC<MainFormProps> = () => {
    const [persons, setPersons] = useState<Person[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [balances, setBalances] = useState<Balance[]>([]);
    const {id} = useParams<{ id: string }>();

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
        // Remove person from database


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
                } = await axios.get(`${apiUrl}/api/getAllInfoFromTrip/${id}`, {headers: headers});
                setPersons(personsResponse);
                setExpenses(expensesResponse);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

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
        </Container>
    );
};

export default MainForm;
export type {Person, Expense, Balance};
