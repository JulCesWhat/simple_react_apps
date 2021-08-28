import React from 'react';
import Header from './Header';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { expect } from '@jest/globals';

it("Contains 3 NavLinks via shallow", () => {
    const numLinks = shallow(<Header />).find('NavLink').length;
    expect(numLinks).toEqual(3);
});

it("Contains 3 anchors via mount", () => {
    const numAnchors = mount(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    ).find('a').length;
    expect(numAnchors).toEqual(3);
});