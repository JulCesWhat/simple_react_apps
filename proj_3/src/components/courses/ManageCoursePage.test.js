import React from 'react';
import { mount } from 'enzyme';
import { authors, newCourse, courses } from '../../../tools/mockData';
import { ManageCoursePage } from './ManageCoursePage';
// import { jest } from '@jest/globals';
// import { it } from 'jest-circus';

function render(args) {
    const defaultProps = {
        authors,
        courses,
        history: {},
        saveCourse: jest.fn(),
        loadAuthors: jest.fn(),
        loadCourses: jest.fn(),
        course: newCourse,
        match: {}
    };

    const props = { ...defaultProps, args };
    return mount(<ManageCoursePage {...props} />);
}

it('Sets error when attempting to save an empty title field.', () => {
    const wrapper = render();
    wrapper.find('form').simulate('submit');
    const err = wrapper.find('.alert').first();
    expect(err.text()).toBe('Title is required!');
});