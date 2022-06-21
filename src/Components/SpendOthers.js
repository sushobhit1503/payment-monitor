import React from "react"
import { Card, CardBody, CardTitle, Button, Input, Label } from "reactstrap"
import { firestore } from "../config"

class SpendOthers extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            purpose: "",
            amount: 0,
            mode: "cash",
            date: "",
        }
    }
    render() {
        const onChange = e => {
            const { name, value } = e.target
            this.setState({ [name]: value })
        }
        const onSubmit = () => {
            firestore.collection("spend-others").doc(`${this.state.date}-${this.state.name}`).set({
                name: this.state.name,
                purpose: this.state.purpose,
                amount: parseInt(this.state.amount),
                mode: this.state.mode,
                date: this.state.date,
                category: "gift"
            }).then(() => {
                window.location.reload()
            }).catch(err => { })
        }
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                <Card style={{ width: "300px" }}>
                    <CardBody>
                        <CardTitle style={{ textAlign: "center" }} tag="h4">
                            ADD OTHERS RECORD
                        </CardTitle>
                        <Label>NAME OF THE PERSON: </Label>
                        <Input onChange={onChange} placeholder="Enter the name of the person" name="name" value={this.state.name} style={{ marginBottom: "10px" }} />
                        <Label>PURPOSE:</Label>
                        <Input onChange={onChange} placeholder="Enter the purpose" name="purpose" value={this.state.purpose} style={{ marginBottom: "10px" }} />
                        <Label>AMOUNT: Rs.</Label>
                        <Input onChange={onChange} placeholder="Enter the amount" name="amount" value={this.state.amount} style={{ marginBottom: "10px" }} type="number" />
                        <Label>MODE OF PAYMENT:</Label>
                        <Input onChange={onChange} name="mode" value={this.state.mode} style={{ marginBottom: "10px" }} type="select" >
                            <option value="cash">
                                CASH
                            </option>
                            <option value="gpay">
                                GOOGLE PAY
                            </option>
                            <option value="creditcard">
                                CREDIT CARD
                            </option>
                            <option value="debitcard">
                                DEBIT CARD
                            </option>
                            <option value="paytm">
                                PAYTM
                            </option>
                            <option value="netbanking">
                                NETBANKING
                            </option>
                        </Input>
                        <Label>DATE OF EXPENSE: </Label>
                        <Input onChange={onChange} name="date" value={this.state.date} type="date" />
                        <div style={{ textAlign: "center", marginTop: "10px" }}>
                            <Button onClick={onSubmit} color="success">
                                ADD RECORD
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default SpendOthers