import React from "react";
import './CitySelectButton.css'

class CitySelectButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickCity = this.props.handleClickCity
    }

    render() {
        return (
            <div className="city-select-button"
                 onClick={() => this.handleClickCity(this.props.city, this.props.city.code)}
                 style={{cursor: 'pointer'}}>
                {this.props.city.name}
            </div>
        )
    }
}

export default CitySelectButton