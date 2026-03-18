import React, { useState } from 'react';
import SearchInputOptions from './SearchInputOptions';
import clsx from 'clsx';

const SearchInput = ({ suggestions }) => {
    const [filteredSuggestion, setFilteredSuggestions] = useState<any>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [input, setInput] = useState("");
 
    const onChange = (e) => {
        const userInput = e.target.value;

        // Filter our suggestions that don't contain the user's input
        // const unLinked = suggestions.filter(
        //   (suggestion) =>
        //     suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        // );
        const unLinked = suggestions?.filter((suggestion) => suggestion.label.toLowerCase().indexOf(userInput.toLowerCase()) > -1);

        setInput(e.target.value);
        setFilteredSuggestions(unLinked);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    };

    const onClick = (e) => {
        //setFilteredSuggestions([]);
        setInput(e.target.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
    };

    const onKeyDown = (e) => {
        if (e?.onKeyDown === 13) {
        setInput(filteredSuggestion[activeSuggestionIndex]);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
        } else if (e?.onKeyDown === 38) {
            if (activeSuggestionIndex === 0) {
                return;
            }

            setActiveSuggestionIndex(activeSuggestionIndex + 1);
        }
    };
    return (
        <div className="w-full max-w-sm min-w-[200px]">
            <input
                type="search"
                id='search'
                name="query"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={input}
                aria-label='Search Station'
                aria-autocomplete='none'
                autoComplete='off'
                autoCorrect='off'
                role='search'
                spellCheck="false"
                placeholder='Western..., Damen... 35th/Garfield'
                className={"w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-300 hover:border-slate-300 shadow-sm focus:shadow"}
            />
            {showSuggestions && input && <SearchInputOptions filteredSuggestions={filteredSuggestion} index={activeSuggestionIndex} />}
        </div>
    );
}

export default SearchInput;