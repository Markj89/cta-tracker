import "@testing-library/jest-dom"; 
import "jest-extended";

global.matchMedia = global.matchMedia || (() => ({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

window.HTMLElement.prototype.scrollIntoView = jest.fn();
