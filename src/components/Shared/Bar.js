import React from 'react'
import ToggleButton from '../Shared/ToggleButton';

export default function Bar({ barToggled, handleBarClick }) {

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

