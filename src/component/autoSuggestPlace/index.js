import React, { useState } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'

const AutoSuggestPlace = ({ input: formInput, TextField }) => {
    const [address, setAddress] = useState('')
    return (
        <PlacesAutocomplete
            onChange={value => { formInput.onChange({ target: { value } }); setAddress(value) }}
            value={address}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <TextField fullWidth
                        {...formInput}
                        {...getInputProps({
                            placeholder: 'Address',
                            className: 'location-search-input',
                        })}
                    />
                    <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer', padding: '10px' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer', padding: '10px' };
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    )
}

export default AutoSuggestPlace