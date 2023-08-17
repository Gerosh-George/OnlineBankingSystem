import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {Button, Form, FormGroup, Input, Label, Row, Col, Card, CardBody, CardHeader, CardFooter} from 'reactstrap';

const AccountCreate = () => {
    const navigate = useNavigate();
    const userid = sessionStorage.getItem("UserID");
    const [accType, setAccType] = useState("");
    const tempDate = new Date();
    const openingDate = tempDate.getDate() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getFullYear(); 
    const [branch, setBranch] = useState("");
    const [balance, setBalance] = useState(1000);
    const baseURL = "http://localhost:9080/createAccount/" + userid;

    const accTypeChangeHandler = (event) => {
        setAccType(event.target.value);
    }

    const branchChangeHandler = (event) => {
        setBranch(event.target.value);
    }

    const balanceChangeHandler = (event) => {
        setBalance(event.target.value);
    }

    const submitActionHandler = (event) => {
        event.preventDefault();
        axios.post(baseURL, {
            acctype: accType,
            balance: balance,
            openingDate: openingDate,
            branch: branch
        })
        .then((response) => {
            alert("Account created!");
            navigate("/");
        }).catch(error => {
            alert("error == " + error);
        })
    }

    const cancelHandler =() =>  {
        setAccType("");
        setBalance(1000);
        setBranch("");
    }

    return(
        <div>
            {userid == null && 
                <div className="container">
                    <Row className="row justify-content-center">
                        <Col className="col-md-8">
                            <Card>
                                <CardHeader>
                                    <h2>Hi, you are not logged in!</h2>
                                </CardHeader>
                                <CardFooter>
                                    <Link to="/login"><Button color="primary">Login</Button></Link>
                                    <Link to="/signup"><Button color="warning">Signup</Button></Link>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            }
            {userid != null &&
            <div className="container mt-4 mb-4">
                <Row className="row justify-content-center">
                    <Col className="col-md-8">
                        <Card>
                            <CardHeader>
                                <h2>Create Account</h2>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={submitActionHandler} className="form">  
                                    <FormGroup>
                                        <Label>User ID</Label>
                                        <Input value={userid} disabled></Input>
                                    </FormGroup>                 
                                    <FormGroup>
                                        <Label>Account Type</Label>
                                        <Input type="text" value={accType} onChange={accTypeChangeHandler} placeholder="Enter account type" required></Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Balance</Label>
                                        <Input type="number" value={balance} onChange={balanceChangeHandler} placeholder="Enter balance" required></Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Date of Opening</Label>
                                        <Input type="text" value={openingDate} disabled></Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Branch</Label>
                                        <Input type="text" value={branch} onChange={branchChangeHandler} placeholder="Enter branch" required></Input>
                                    </FormGroup>
                                    <Button type="submit" color="primary">Create Account</Button>
                                    <Button type="submit" color="danger" onClick={() => cancelHandler()}>Cancel</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
            }
        </div>
    );
}

export default AccountCreate;