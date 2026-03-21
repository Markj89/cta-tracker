import { jest } from '@jest/globals'
import "@testing-library/jest-dom"; 
import "jest-extended/all";
import { TextEncoder } from 'text-encoding';

global.TextEncoder = TextEncoder;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
window.HTMLElement.prototype.scrollIntoView = jest.fn();
