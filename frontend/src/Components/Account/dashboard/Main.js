import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ListTransaction from "./ListTransaction/ListTransaction";

const Main = () => {
    const baseURL = "http://localhost:9080";
    const { accno } = useParams();
    const userId = sessionStorage.getItem("userID");
    const [tdata, setTdata] = useState([]);
    const [accData, setAccData] = useState({});
    const [dates, setDates] = useState({
        startDate: "",
        endDate: "",
    });

    useEffect(() => {
        async function fetchAccountData() {
            try {
                const res = await axios.get(
                    `${baseURL}/getAccountDetails/${accno}`
                );
                console.log(res.data);
                setAccData(res.data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchAccountData();
    }, []);
    useEffect(() => {
        async function fetchTransactions() {
            try {
                var res;
                if (dates.startDate === "" || dates.endDate === "")
                    res = await axios.get(
                        `${baseURL}/fetchTransactions/${accno}`
                    );
                else
                    res = await axios.post(
                        `${baseURL}/accountStatement/${accno}`,
                        dates
                    );
                setTdata(res.data.reverse());
            } catch (e) {
                console.log(e);
            }
        }
        fetchTransactions();
    }, [dates]);
    return (
        <Container>
            <Title>
                <h1>Account Details</h1>
            </Title>
            <Wrapper>
                <Text>
                    <Key>
                        <h1>User ID: </h1>
                    </Key>
                    <Value>
                        <h2>{userId}</h2>
                    </Value>
                </Text>
                <Text>
                    <Key>
                        <h1>Account No: </h1>
                    </Key>
                    <Value>
                        <h2>{accData.accno}</h2>
                    </Value>
                </Text>
                <Text>
                    <Key>
                        <h1>Account Type: </h1>
                    </Key>
                    <Value>
                        <h2>{accData.acctype}</h2>
                    </Value>
                </Text>
                <Text>
                    <Key>
                        <h1>Balance: </h1>
                    </Key>
                    <Value>
                        <h2>{accData.balance}</h2>
                    </Value>
                </Text>
                <Text>
                    <Key>
                        <h1>Branch: </h1>
                    </Key>
                    <Value>
                        <h2>{accData.branch}</h2>
                    </Value>
                </Text>
                <Text>
                    <Key>
                        <h1>Date of Opening: </h1>
                    </Key>
                    <Value>
                        <h2>{accData.openingDate}</h2>
                    </Value>
                </Text>
            </Wrapper>
            <ListTransaction
                title="Transactions"
                count={tdata.length}
                data={tdata}
                val={dates}
                setVal={setDates}
                accNo={accData.accno}
            />
        </Container>
    );
};

const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 5rem 7rem;
    min-width: 400px;
    backdrop-filter: blur(35px);
    height: 100%;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    h4 {
        color: #808080;
        font-weight: bold;
        font-size: 13px;
        margin-top: 2rem;

        a {
            color: #ff8d8d;
            cursor: pointer;
            text-decoration: none;
        }
    }
`;

const Wrapper = styled.div`
    /* display: flex; */
    align-items: center;
    padding: 1rem 3rem;
    width: 100%;
    border-bottom: 1px solid rgba(190, 190, 190, 0.22);
    cursor: pointer;
    background-color: ${({ theme }) => theme.primary};
    transition: all ease-in-out 300ms;

    &:hover {
        /* box-shadow: 0px 10px 8px -8px rgba(138, 153, 192, 0.6); */
        background-color: ${({ theme }) => theme.secondary};
    }
`;

const Text = styled.div`
    padding: 0.8rem;
    display: flex;
`;

const Key = styled.div`
    font-size: 0.9rem;
    font-weight: 300;
    width: 35%;
    h1 {
        font-size: 0.9rem;
        font-weight: 500;
        color: ${({ theme }) => theme.textColor};
        margin: 0;
    }
`;
const Value = styled.div`
    h2 {
        font-size: 0.9rem;
        font-weight: 300;
    }
`;

const Title = styled.div`
    padding: 1rem 2rem;
    h1 {
        font-weight: 500;
        color: ${({ theme }) => theme.textColor};
        font-size: 1.3rem;
        display: flex;
        align-items: center;
    }
`;

export default Main;
