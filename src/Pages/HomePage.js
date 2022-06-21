import React from "react"
import { Badge } from "reactstrap"
import { CircularProgressbarWithChildren } from "react-circular-progressbar"
import { firestore } from "../config"

class HomePage extends React.Component {
    constructor() {
        super()
        this.state = {
            totalExpense: 0,
            totalRevenue: 0,
            totalSpendOthers: 0,
            totalReimbursement: 0,
            googlePay: 0,
            cash: 0,
            debitCard: 0,
            creditCard: 0,
            netbanking: 0,
            paytm: 0,
            food: 0,
            lifestyle: 0,
            travel: 0,
            housing: 0,
            tourism: 0,
            stationary: 0,
            gift: 0,
            miscellaneous: 0
        }
    }
    componentDidMount() {
        firestore.collection("expenses").get().then(Snapshot => {
            let money = 0, money1 = 0
            Snapshot.forEach(document => {
                if (document.data().isReimbursement) {
                    money += document.data().price
                }
                else {
                    money1 += (document.data().price * document.data().quantity)
                }
                this.calculate(document.data(), (document.data().price * document.data().quantity))
            })
            this.setState({ totalReimbursement: money, totalExpense: money1 })
            firestore.collection("revenue").get().then(Snapshot => {
                let money2 = 0
                Snapshot.forEach(document => {
                    money2 += document.data().amount
                })
                this.setState({ totalRevenue: money2 })
                firestore.collection("spend-others").get().then(Snapshot => {
                    let money3 = 0
                    Snapshot.forEach(document => {
                        money3 += document.data().amount
                        this.calculate(document.data(), document.data().amount)
                    })
                    this.setState({ totalSpendOthers: money3 })
                }).catch(err => { })
            }).catch(err => { })
        }).catch(err => { })
    }
    calculate = (data, amount) => {
        if (data.mode === "cash")
            this.setState({ cash: this.state.cash + amount })
        else if (data.mode === "gpay")
            this.setState({ googlePay: this.state.googlePay + amount })
        else if (data.mode === "creditcard")
            this.setState({ creditCard: this.state.creditCard + amount })
        else if (data.mode === "debitcard")
            this.setState({ debitCard: this.state.debitCard + amount })
        else if (data.mode === "paytm")
            this.setState({ paytm: this.state.paytm + amount })
        else
            this.setState({ netbanking: this.state.netbanking + amount })
        if (data.category === "food")
            this.setState({ food: this.state.food + amount })
        else if (data.category === "lifestyle")
            this.setState({ lifestyle: this.state.lifestyle + amount })
        else if (data.category === "travel")
            this.setState({ travel: this.state.travel + amount })
        else if (data.category === "housing")
            this.setState({ housing: this.state.housing + amount })
        else if (data.category === "tourism")
            this.setState({ tourism: this.state.tourism + amount })
        else if (data.category === "stationary")
            this.setState({ stationary: this.state.stationary + amount })
        else if (data.category === "gift")
            this.setState({ gift: this.state.gift + amount })
        else if (data.category === "miscellaneous")
            this.setState({ miscellaneous: this.state.miscellaneous + amount })
    }
    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>

                    <Badge color="success" style={{ padding: "10px", fontSize: "20px", margin: "10px" }}>
                        TOTAL REVENUE: Rs. {this.state.totalRevenue}
                    </Badge>
                    <Badge color="success" style={{ padding: "10px", fontSize: "20px", margin: "10px" }}>
                        TOTAL SPENT: Rs. {this.state.totalExpense}
                    </Badge>
                    <Badge color="success" style={{ padding: "10px", fontSize: "20px", margin: "10px" }}>
                        TOTAL OTHERS SPENT: Rs. {this.state.totalSpendOthers}
                    </Badge>
                    <Badge color="success" style={{ padding: "10px", fontSize: "20px", margin: "10px" }}>
                        TOTAL REIMBURSEMENTS: Rs. {this.state.totalReimbursement}
                    </Badge>
                    <Badge color="success" style={{ padding: "10px", fontSize: "20px", margin: "10px" }}>
                        TOTAL EXPENDITURE: Rs. {this.state.totalExpense + this.state.totalSpendOthers}
                    </Badge>
                    <Badge color="danger" style={{ padding: "10px", fontSize: "20px", margin: "10px" }}>
                        TOTAL LEFT: Rs. {this.state.totalRevenue - this.state.totalExpense - this.state.totalReimbursement - this.state.totalSpendOthers}
                    </Badge>
                </div>
                <Badge style={{ padding: "10px", fontSize: "25px", width: "max-content", margin: "20px" }}>
                    PAYMENT MODES
                </Badge>
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                    <div style={{ width: "150px", margin: "10px", textAlign: "center", fontSize: "25px" }}>
                        <CircularProgressbarWithChildren value={1} maxValue={1}>
                            {this.state.cash} <br />
                            CASH
                        </CircularProgressbarWithChildren>
                    </div>
                    <div style={{ width: "150px", margin: "10px", textAlign: "center", fontSize: "25px" }}>
                        <CircularProgressbarWithChildren value={1} maxValue={1}>
                            {this.state.googlePay} <br />
                            GOOGLE PAY
                        </CircularProgressbarWithChildren>
                    </div>
                    <div style={{ width: "150px", margin: "10px", textAlign: "center", fontSize: "25px" }}>
                        <CircularProgressbarWithChildren value={1} maxValue={1}>
                            {this.state.debitCard} <br />
                            DEBIT CARD
                        </CircularProgressbarWithChildren>
                    </div>
                    <div style={{ width: "150px", margin: "10px", textAlign: "center", fontSize: "25px" }}>
                        <CircularProgressbarWithChildren value={1} maxValue={1}>
                            {this.state.creditCard} <br />
                            CREDIT CARD
                        </CircularProgressbarWithChildren>
                    </div>
                    <div style={{ width: "150px", margin: "10px", textAlign: "center", fontSize: "25px" }}>
                        <CircularProgressbarWithChildren value={1} maxValue={1}>
                            {this.state.paytm} <br />
                            PAYTM
                        </CircularProgressbarWithChildren>
                    </div>
                    <div style={{ width: "150px", margin: "10px", textAlign: "center", fontSize: "25px" }}>
                        <CircularProgressbarWithChildren value={1} maxValue={1}>
                            {this.state.netbanking} <br />
                            NETBANKING
                        </CircularProgressbarWithChildren>
                    </div>
                </div>
                <Badge style={{ padding: "10px", fontSize: "25px", width: "max-content", margin: "20px" }}>
                    CATEGORIES
                </Badge>
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                    <div style={{ width: "150px", margin: "10px", textAlign: "center", fontSize: "25px" }}>
                        <CircularProgressbarWithChildren value={1} maxValue={1}>
                            {this.state.food} <br />
                            FOOD
                        </CircularProgressbarWithChildren>
                    </div>
                    <div style={{ width: "150px", margin: "10px", textAlign: "center", fontSize: "25px" }}>
                        <CircularProgressbarWithChildren value={1} maxValue={1}>
                            {this.state.lifestyle} <br />
                            LIFESTYLE
                        </CircularProgressbarWithChildren>
                    </div>
                    <div style={{ width: "150px", margin: "10px", textAlign: "center", fontSize: "25px" }}>
                        <CircularProgressbarWithChildren value={1} maxValue={1}>
                            {this.state.travel} <br />
                            TRAVEL
                        </CircularProgressbarWithChildren>
                    </div>
                    <div style={{ width: "150px", margin: "10px", textAlign: "center", fontSize: "25px" }}>
                        <CircularProgressbarWithChildren value={1} maxValue={1}>
                            {this.state.housing} <br />
                            HOUSING
                        </CircularProgressbarWithChildren>
                    </div>
                    <div style={{ width: "150px", margin: "10px", textAlign: "center", fontSize: "25px" }}>
                        <CircularProgressbarWithChildren value={1} maxValue={1}>
                            {this.state.tourism} <br />
                            TOURISM
                        </CircularProgressbarWithChildren>
                    </div>
                    <div style={{ width: "150px", margin: "10px", textAlign: "center", fontSize: "25px" }}>
                        <CircularProgressbarWithChildren value={1} maxValue={1}>
                            {this.state.stationary} <br />
                            STATIONARY
                        </CircularProgressbarWithChildren>
                    </div>
                    <div style={{ width: "150px", margin: "10px", textAlign: "center", fontSize: "25px" }}>
                        <CircularProgressbarWithChildren value={1} maxValue={1}>
                            {this.state.gift} <br />
                            GIFT
                        </CircularProgressbarWithChildren>
                    </div>
                    <div style={{ width: "150px", margin: "10px", textAlign: "center", fontSize: "25px" }}>
                        <CircularProgressbarWithChildren value={1} maxValue={1}>
                            {this.state.miscellaneous} <br />
                            MISCELLANEOUS
                        </CircularProgressbarWithChildren>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage