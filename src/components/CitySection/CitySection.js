import React from "react";
import CitySelectButton from "../CitySelectButton/CitySelectButton";
import './CitySection.css'

class CitySection extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickCity = this.props.handleClickCity;
    }

    render() {
        return (
            <div className="sections-literal">
                <div className="sections-literal__literal">{this.props.literal}</div>
                {this.props.cityArray.map(function (data, i) {
                    return (
                        <CitySelectButton city={data} handleClickCity={this.handleClickCity} key={i}/>
                    )
                }.bind(this))}
            </div>
        )
    }
}

export default CitySection