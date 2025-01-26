/**
 * Search Input Component
 * 
 * @type {Component} SearchInput
 * @param
 * @returns JSX.Element
 */

import React, { useCallback, useRef } from 'react';
import Select from 'react-select';
import { SearchInputProps } from "./SearchInput.type";
import { IndicatorSeparator, LoadingIndicator } from 'react-select/dist/declarations/src/components/indicators';
import SingleValue from 'react-select/dist/declarations/src/components/SingleValue';
import { merge } from 'lodash';
import AsyncSelect, { AsyncProps } from 'react-select/dist/declarations/src/Async';

export const SearchInput = ({
    syncProps,
    asyncProps,
    optionComponent,
    hasError = false,
    onErrorHandler,
    renderAnchors = true,
    ariaLabel = "Search Bar",
    variant = 'default'
}: SearchInputProps) => {
    const hideUIElement = useCallback(() => null, []);

    const commonProps = {
        components: {
            IndicatorSeparator: hideUIElement,
            LoadingIndicator: hideUIElement,
            SingleValue: hideUIElement,
            Option: (optionProps) => renderAnchors? (
                <div>
                    {optionComponent(optionProps)}
                </div>
            ) : (
                <div>
                    {optionComponent({
                        ...optionProps,
                        className: ''
                    })}
                </div>
            ),
        }
    };

    const mergedSyncProps = merge(commonProps, syncProps);
    if (syncProps) {
        return (
            <Select
                {...mergedSyncProps}
                styles={{
                    ...syncProps?.styles,
                    control: () => null,
                    menu: () => null,
                    group: () => null,
                    groupHeading: () => null,
                }}
                aria-label={ariaLabel}
            />
        );
    }

    const mergedAsyncProps: AsyncProps<any, false, any> = merge(
        commonProps,
        asyncProps
    );

    if (asyncProps) {
        return (
            <AsyncSelect 
                {...mergedAsyncProps}
                aria-label={ariaLabel}
                styles={{
                    ...asyncProps?.styles,
                    control: () => ({}),
                    menu: () => ({}),
                    group: () => ({}),
                    groupHeading: () => ({}),
                }}
            />
        );
    }
};