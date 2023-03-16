import React from 'react';

/**
 * Component that displays an error message if the user has not typed in a username
 * when they clicked on the Search button.
 * @param {*} props 
 * @returns 
 */
export function InputAlert(props) {

    // Obtains the searchHasInput state from the App component.
    const searchHasInput = props.searchHasInput;

    // Sets the searchHasInput state in the App component.
    function setSearchHasInput() {
        props.setSearchHasInput(true);
    }

    // If the user has NOT typed in a username when they click Search,
    // we return an error message.
    if(!searchHasInput) {
        return(
            <div className='form-block'>
                <div className="form-label"></div>
                <div className='form-input'>
                    <div className="input-alert">
                        <div>ERROR:<br/>Username cannot be blank</div>
                        <span className="close-x" onClick={setSearchHasInput}>{'\u2715'}</span>
                    </div>
                </div>
            </div>
        );
    }
}