import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

function ManageCoursePage({ courses, authors, loadCourses, saveCourse, loadAuthors, history, ...props }) {
    const [course, setCourse] = useState(props.course);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!courses.length) {
            loadCourses()
                .catch((error) => {
                    alert('There was an error geting courses: ' + error)
                });
        } else {
            setCourse({ ...props.course });
        }
        if (!authors.length) {
            loadAuthors()
                .catch((error) => {
                    alert('There was an error geting authors: ' + error)
                });
        }
    }, [props.course]);

    function handleChange(event) {
        const { name, value } = event.target;
        setCourse((prevState) => ({
            ...prevState,
            [name]: name === 'authorId' ? parseInt(value, 10) : value
        }));
    }

    function formIsValid() {
        const {title, authorId, category} = course;
        const errors = {};

        if (!title) error.title = 'Title is required!';
        if (!authorId) error.author = 'Author is required!';
        if (!category) error.category = 'Category is required!';

        setErrors({ ...errors });
        return Object.entries(errors).length === 0
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        saveCourse(course)
            .then(() => {
                toast.success('Course saved.');
                history.push('/courses');
            }).catch((error) => {
                setSaving(false);
                setErrors({ onSave: error.message });
            });
    }

    return (
        authors.length === 0 || course.length === 0 ? (
            <Spinner />
        ) : (
            <CourseForm course={course}
                errors={errors}
                authors={authors}
                onChange={handleChange}
                onSave={handleSave}
                saving={saving} />
        )
    )
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    authors: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired
};

function getCourseBySlug(courses, slug) {
    return courses.find((c) => (c.slug === slug)) || null;
}

function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug;
    const course = slug && !!state.courses.length ? getCourseBySlug(state.courses, slug) : newCourse;
    return {
        course,
        courses: state.courses,
        authors: state.authors
    };
}

const mapDispatchToProps = {
    loadCourses,
    loadAuthors,
    saveCourse
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);