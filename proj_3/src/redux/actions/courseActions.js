import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadCoursesSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
    return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
    return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function deleteCourseOptimistic(course) {
    return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}

export function loadCourses() {
    return (dispatch) => {
        dispatch(beginApiCall());
        return courseApi.getCourses()
            .then((courses) => {
                dispatch(loadCoursesSuccess(courses));
            }).catch((error) => {
                dispatch(apiCallError());
                throw error;
            });
    }
}

export function saveCourse(course) {
    return (dispatch, getState) => {
        dispatch(beginApiCall());
        return courseApi.saveCourse(course)
            .then((savedCourse) => {
                if (course.id) {
                    dispatch(updateCourseSuccess(savedCourse));
                } else {
                    dispatch(createCourseSuccess(savedCourse));
                }
            }).catch((error) => {
                dispatch(apiCallError());
                throw error;
            });
    }
}

export function deleteCourse(course) {
    return (dispatch) => {
        dispatch(deleteCourseOptimistic(course));
        return courseApi.deleteCourse(course.id);
    }
}