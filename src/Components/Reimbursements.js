import React from "react"
import { Table, Button } from "reactstrap"
import { firestore } from "../config"


class Reimbursements extends React.Component {
    constructor() {
        super()
        this.state = {
            allReimbursements: [],
            total: 0
        }
    }
    componentDidMount() {
        firestore.collection("expenses").where("isReimbursement", "==", true).get().then(Snapshot => {
            let temp = []
            Snapshot.forEach(document => {
                temp.push(document.data())
                this.setState({ total: this.state.total + (document.data().price * document.data().quantity) })
            })
            this.setState({ allReimbursements: temp })
        }).catch(err => { })
    }
    render() {
        const resolve = (eachReimbursement) => {
            firestore.collection("expenses").where("name", "==", eachReimbursement.name).get().then(Snapshot => {
                Snapshot.forEach(document => {
                    const id = document.id
                    firestore.collection("expenses").doc(id).delete().then(() => {
                        window.location.reload()
                    }).catch(err => { })
                })
            }).catch(err => { })
        }
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <div>
                    <Table style={{ width: "95%" }} bordered>
                        <thead>
                            <tr>
                                <th>
                                    NAME
                                </th>
                                <th>
                                    LOCATION
                                </th>
                                <th>
                                    PURPOSE
                                </th>
                                <th>
                                    DATE
                                </th>
                                <th>
                                    MODE
                                </th>
                                <th>
                                    AMOUNT Rs.
                                </th>
                                <th>
                                    RESOLVE
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.allReimbursements.map(eachReimbursement => {
                                return (
                                    <tr>
                                        <th>{eachReimbursement.name}</th>
                                        <th>{eachReimbursement.location}</th>
                                        <th>{eachReimbursement.purpose}</th>
                                        <th>{eachReimbursement.date}</th>
                                        <th>{eachReimbursement.mode}</th>
                                        <th>{eachReimbursement.price * eachReimbursement.quantity}</th>
                                        <Button style={{ backgroundColor: "green", margin: "5px" }} onClick={() => resolve(eachReimbursement)} color="success">
                                            RECEIVED
                                        </Button>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default Reimbursements