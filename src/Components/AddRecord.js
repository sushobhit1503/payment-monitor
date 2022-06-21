import React from "react"
import { Card, CardBody, CardTitle, Button, Input, Label } from "reactstrap"
import { firestore } from "../config"

class AddRecord extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            location: "hyderabad",
            purpose: "",
            price: 0,
            quantity: 1,
            mode: "cash",
            date: "",
            category: "food",
            reimbursement: false
        }
    }
    render() {
        const onChange = e => {
            const { name, value } = e.target
            this.setState({ [name]: value })
        }
        const onSubmit = () => {
            firestore.collection("expenses").doc(`${this.state.date}-${this.state.name}`).set({
                name: this.state.name,
                location: this.state.location,
                purpose: this.state.purpose,
                price: parseInt(this.state.price),
                quantity: parseInt(this.state.quantity),
                mode: this.state.mode,
                date: this.state.date,
                isReimbursement: this.state.reimbursement,
                category: this.state.category
            }).then(() => {
                window.location.reload()
            }).catch(err => { })
        }
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                <Card style={{ width: "300px" }}>
                    <CardBody>
                        <CardTitle style={{ textAlign: "center" }} tag="h4">
                            ADD EXPENDITURE RECORD
                        </CardTitle>
                        <Label>NAME OF PRODUCT:</Label>
                        <Input onChange={onChange} placeholder="Enter the name of the product" name="name" value={this.state.name} style={{ marginBottom: "10px" }} />
                        <Label>LOCATION:</Label>
                        <Input onChange={onChange} name="location" value={this.state.location} style={{ marginBottom: "10px" }} type="select" >
                            <option value="hyderabad">
                                HYDERABAD
                            </option>
                            <option value="mumbai">
                                MUMBAI
                            </option>
                            <option value="bangalore">
                                BANGALORE
                            </option>
                        </Input>
                        <Label>NAME OF SHOP:</Label>
                        <Input onChange={onChange} placeholder="Enter the name of the shop" name="purpose" value={this.state.purpose} style={{ marginBottom: "10px" }} />
                        <Label>PRICE: Rs.</Label>
                        <Input onChange={onChange} placeholder="Enter the price" name="price" value={this.state.price} style={{ marginBottom: "10px" }} type="number" />
                        <Label>QUANTITY:</Label>
                        <Input onChange={onChange} placeholder="Enter the quantity" name="quantity" value={this.state.quantity} style={{ marginBottom: "10px" }} type="number" />
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
                                NET BANKING
                            </option>
                        </Input>
                        <Label>CATEGORY OF PAYMENT:</Label>
                        <Input onChange={onChange} name="category" value={this.state.category} style={{ marginBottom: "10px" }} type="select" >
                            <option value="food">
                                FOOD
                            </option>
                            <option value="lifestyle">
                                LIFESTYLE
                            </option>
                            <option value="travel">
                                TRAVEL
                            </option>
                            <option value="housing">
                                HOUSING
                            </option>
                            <option value="tourism">
                                TOURISM
                            </option>
                            <option value="stationary">
                                STATIONARY
                            </option>
                            <option value="gift">
                                GIFT
                            </option>
                            <option value="miscellaneous">
                                MISCELLANEOUS
                            </option>
                        </Input>
                        <Label>DATE OF PAYMENT: </Label>
                        <Input onChange={onChange} name="date" value={this.state.date} type="date" />
                        <div style={{ textAlign: "right" }}>
                            TOTAL: Rs.{this.state.price * this.state.quantity}
                        </div>
                        <div>
                            <Input style={{ marginRight: "10px", marginBottom: "10px" }} onChange={() => this.setState({ reimbursement: !this.state.reimbursement })} checked={this.state.reimbursement} name="reimbursement" type="checkbox" /> Reimbursement ?
                        </div>
                        <div style={{ textAlign: "center" }}>
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

export default AddRecord