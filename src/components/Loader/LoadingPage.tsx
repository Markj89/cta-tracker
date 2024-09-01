/**
 * Loading (Start up) Component
 * @type {Component}
 */
import React from 'react';
import Icon, { ICONS } from './../Icon/Icon';
 
export const LoadingPage = () => (
    <div id="loading-page-container">
        <div className='relative'>
            <div className="relative mx-auto w-full max-w-container px-4 pt-12 sm:px-6 sm:pt-16 lg:flex lg:justify-between lg:px-8 lg:pt-20">
                <div className='max-w-1xl mx-auto pt-10 xl:max-w-none place-content-center'>
                    <div>
                        <Icon icon={ICONS.Train} color={'#E4002B'} className='train-loading' />
                        <div className="bridge"></div>
                    </div>
                    <div className='relative pt-12'>
                        <h1 className="text-white text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-4xl tracking-tight text-center font-interTight">Loading...</h1>
                    </div>
                </div>
                <div className='longfazers'>
                    <span id='longfazer'></span>
                    <span id='longfazer'></span>
                    <span id='longfazer'></span>
                    <span id='longfazer'></span>
                </div>
            </div>
        </div>
    </div>
);