import React from 'react'
import ToggleButton from '../Button/ToggleButton';

export default function Bar({ barID, barToggled, handleBarClick }) {

    function barSelected() {
        if (barToggled) {
            return "contained";
        }
        return "";
    }

    return (
        <ToggleButton variant={barSelected()} onClick={handleBarClick}>
            {/* {barID} */}
        </ToggleButton>
    );
}

