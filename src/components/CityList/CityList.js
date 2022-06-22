import React from "react";
import CitySection from "../CitySection/CitySection";
import styled from "styled-components";

class CityList extends React.Component {
    constructor(props) {
        super(props);

        this.handleClickCity = this.props.handleClickCity;
    }

    // Переформатирвоание массива
    getLiteralGroups(data) {
        let result = [];
        data.forEach(function (data) {
            if (!checkResult(data.name[0], result)) {
                result.push({
                    literal: data.name[0],
                    cities: [data],
                });
            } else {
                for (let key in result) {
                    if (result[key].literal === data.name[0]) {
                        result[key].cities.push(data);
                    }
                }
            }

            function checkResult(liter, array) {
                for (let key in array) {
                    if (liter === array[key].literal) {
                        return true;
                    }
                }
                return false;
            }
        });

        return result.sort((a, b) => a.literal.localeCompare(b.literal, "ru"));
    }

    render() {
        return (
            <CityListBlock columnCount={this.getLiteralGroups(this.props.data).length === 0}>
                {this.getLiteralGroups(this.props.data).map(
                    function (data, i) {
                        return (
                            <CitySection
                                key={i}
                                literal={data.literal}
                                cityArray={data.cities}
                                handleClickCity={this.handleClickCity}
                            />
                        );
                    }.bind(this)
                )}
            </CityListBlock>
        );
    }
}

export default CityList;

const CityListBlock = styled.div`
  column-count: 1;
  @media (min-width: 768px) {
    column-count: ${(props) => {
    if (props.columnCount) {
        return 1;
    } else {
        return 4;
    }
}};
  }
  @media (min-width: 1440px) {
    column-count: ${(props) => {
    if (props.columnCount) {
        return 1;
    } else {
        return 5;
    }
}};
  }
`;