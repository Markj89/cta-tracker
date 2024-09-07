import { GroupBase, OptionProps, Props } from 'react-select';
import { AsyncProps } from 'react-select/async';

export interface SearchInputCommonProps {
    optionComponent: (props: React.PropsWithChildren<OptionProps<any, boolean, GroupBase<any>>>) => JSX.Element;
    hasError?: boolean;
    onErrorHandler?: () => void;
    renderAnchors?: boolean;
    ariaLabel?: string;
}

export interface SearchInputProps extends SearchInputCommonProps {
    syncProps?: Props<any>;
    asyncProps?: AsyncProps<any, false, any>;
    variant?: 'default' | 'classic';
}