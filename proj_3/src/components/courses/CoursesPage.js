import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';

class CoursesPage extends React.Component {
    state = {
        course: {
            title: ''
        }
    }

    componentDidMount() {
        const { courses, authors, actions } = this.props;
        if (!courses.length) {
            actions.loadCourses()
                .catch((error) => {
                    alert('There was an error geting courses: ' + error)
                });
        }
        if (!authors.length) {
            actions.loadAuthors()
                .catch((error) => {
                    alert('There was an error geting authors: ' + error)
                });
        }
    }

    handleChange = (event) => {
        const course = {
            ...this.state.course,
            title: event.target.value
        };
        this.setState({ course });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.actions.createCourse(this.state.course);
    }

    render() {
        return (
            <>
                <h2>Courses</h2>
                <CourseList courses={this.props.courses} />
            </>
        )
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        courses: state.authors.length == 0 ? [] : state.courses.map((c) => ({ ...c, authorName: state.authors.find((a) => (a.id === c.authorId)).name })),
        authors: state.authors
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
            loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);