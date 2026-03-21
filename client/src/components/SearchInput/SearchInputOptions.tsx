import clsx from 'clsx';
import Icon, { ICONS } from './../Icon/Icon';
import React, { useEffect, useRef, useState } from 'react';
import useArrivalById from './../../hooks/useArrivalById';

export interface OptionProps {
    filteredSuggestions: any[];
    index: number;
}

const SearchInputOptions = ({ filteredSuggestions, index}) => {
    const [isSending, setIsSending] = useState<boolean>(false);
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, []);

    return filteredSuggestions.length ? (
        <div className={clsx("p-1")}>
            <div className={clsx("pt-0")}>
                <div>
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, i) => {
                            let className = "";
                            const { executeHook } = useArrivalById(suggestion?.stopId);

                            // Flag the active suggestion with a class
                            if (i === index) {
                                className = "suggestion-active";
                            }

                            return (
                                <>
                                    <li 
                                        role='link' 
                                        className={clsx("p-2 cursor-pointer hover:bg-(grey)")} 
                                        key={i} 
                                        onClick={() =>  executeHook(suggestion?.stopId)}>
                                        <div className={clsx("flex m-0 gap-[16px] p-2 items-center")}>
                                            <div className={clsx("shrink-0 justify-center self-start")}>
                                                <Icon icon={ICONS.Trains} className={clsx(`train-icon ${suggestion?.color}-train`)} />
                                            </div>
                                            <div>
                                                <span className={clsx("p-0 whitespace-nowrap overflow-clip w-px text-base font-bold")}>
                                                    {suggestion?.label}
                                                </span>
                                            </div>
                                        </div>
                               
                                    </li>
                                </>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    ) : (
        <div className="no-suggestions">
            <span role="img" aria-label="tear emoji">
                😪
            </span>{" "}
            <em>sorry no suggestions</em>
        </div>
    );
}

export default SearchInputOptions;