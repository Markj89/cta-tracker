type TabSizes = "small" | "large";

type TabProp = Omit<TabProps, "size">;

export type TabsProps = {
    tabIndex?: number;
    onClick:(index: number) => void;
    tabs: TabProp[];
    variant?: "primary" | "secondary" | "tertiary" | "chips";
    size?: TabSizes;
    tabsOnly?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export type TabProps = {
    label?: React.ReactNode;
    className?: string;
    size: TabSizes;
    icon?: JSX.Element;
}