import * as courseActions from './courseActions';
import * as types from './actionTypes';
import { courses } from '../../../tools/mockData';
// import { describe } from 'yargs';
// import { it } from 'jest-circus';
// import { expect } from '@jest/globals';

describe('createCourseSuccess', () => {
    it('Should create a CREATE_COURSE_SUCCESS action', () => {
        // arrange
        const course = courses[0];
        const expectedAction = {
            type: types.CREATE_COURSE_SUCCESS,
            course
        };

        // act
        const action = courseActions.createCourseSuccess(course);

        // assert
        expect(action).toEqual(expectedAction);
    });
});