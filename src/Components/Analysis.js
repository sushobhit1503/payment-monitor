import React from "react";
import { Badge } from "reactstrap"
import Moment from "react-moment";


class Analysis extends React.Component {
    constructor() {
        super()
        this.state = {
            year: [],
            month: [],
            currentYear: "",

        }
    }
    render() {
        return (
            <div>
                <Badge style={{ padding: "10px", fontSize: "25px", width: "max-content", margin: "20px" }}>
                    YEAR WISE
                </Badge>
                <Badge style={{ padding: "10px", fontSize: "25px", width: "max-content", margin: "20px" }}>
                    MONTH WISE
                </Badge>
                <Badge style={{ padding: "10px", fontSize: "25px", width: "max-content", margin: "20px" }}>
                    DAY WISE
                </Badge>
            </div>
        )
    }
}

export default Analysis