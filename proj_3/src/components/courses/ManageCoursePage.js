import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadCourses } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';

function ManageCoursePage({ courses, authors, loadCourses, loadAuthors }) {

    useEffect(() => {
        if (!courses.length) {
            loadCourses()
                .catch((error) => {
                    alert('There was an error geting courses: ' + error)
                });
        }
        if (!authors.length) {
            loadAuthors()
                .catch((error) => {
                    alert('There was an error geting authors: ' + error)
                });
        }
    }, []);

    return (
        <>
            <h2>Manage Course</h2>
        </>
    )
}

ManageCoursePage.propTypes = {
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    authors: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        courses: state.courses,
        authors: state.authors
    };
}

const mapDispatchToProps = {
    loadCourses,
    loadAuthors
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);