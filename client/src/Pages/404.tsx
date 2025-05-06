import { CardContainer } from './../components/CardContainer';
import Card from './../components/Card/Card';
import React from 'react';
import clsx from 'clsx';

const NotFound = () => {
    return (
        <div>
            <Card>
                <CardContainer className={clsx("px-6 m-auto")} orientation={'vertical'}>
                    <h1>Not Found</h1>
                    <p>Page not found.</p>
                </CardContainer>
            </Card>
        </div>
    );
};
export default NotFound;