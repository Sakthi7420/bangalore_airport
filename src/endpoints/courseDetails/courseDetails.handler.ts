import {
    EndpointAuthType,
    EndpointHandler,
    EndpointRequestType
} from '@gwcdata/node-server-engine';
import { CourseCategory, CourseDetail } from 'db';
import { Course } from 'db';
import { Response } from 'express';

//Get all coursedetails
export const getCourseDetailsHandler: EndpointHandler<EndpointAuthType> = async (
    req: EndpointRequestType[EndpointAuthType],
    res: Response
): Promise<void> => {

    try {
        const courseDetails = await CourseDetail.findAll();

        if (courseDetails.length === 0) {
            res.status(404).send({ message: 'No course details found' });
            return;
        }

        res.status(200).json({ courseDetails: courseDetails });
        return;
        
    } catch (error) {
        res.status(500).json({ message: 'internal Server error', data: error });
        return;
    }
};


//create a new coursedetails
export const createCourseDetailsHandler: EndpointHandler<EndpointAuthType> = async (
    req: EndpointRequestType[EndpointAuthType],
    res: Response
): Promise<void> => {

    const { courseId,courseCategoryId, courseLectures, courseQandA, notes, aboutCourse } = req.body;

    try {

        const course = await Course.findByPk(courseId);

        if (req.user?.roleId !== 1) {
            res.status(403).json({ message: 'You don\'t have Permission to create a new course details' });
            return;
        }

        if (!course) {
            res.status(404).send({ message: 'Course not found' });
            return;
        }

        const courseDetails = await CourseDetail.create({
            courseId,
            courseCategoryId,
            courseLectures,
            courseQandA,
            notes,
            aboutCourse
        });

        res.status(200).json({ message: 'Course details created successfully', courseDetails });
        return;
    } catch (error) {
        res.status(500).json({ message: 'internal Server error', data: error });
        return;
    }
};

//Get CourseDetails by ID
export const getCourseDetailsByIdHandler: EndpointHandler<EndpointAuthType> = async (
    req: EndpointRequestType[EndpointAuthType],
    res: Response
): Promise<void> => {

    const { id } = req.params;

    try {

        const courseDetails = await CourseDetail.findByPk(id, {
            include: [
                { model: CourseCategory, as: 'courseCategory' },
                { model: Course, as: 'course' },
            ]
        });

        if (!courseDetails) {
            res.status(404).send({ message: 'Course details not found' });
            return;
        }

        res.status(200).json({  courseDetails: courseDetails });
        return;

    } catch (error) {
        res.status(500).json({ message: 'internal Server error', data: error });
        return;
    }
};


//Update courseDetails
export const updateCourseDetailsHandler: EndpointHandler<EndpointAuthType> = async (
    req: EndpointRequestType[EndpointAuthType],
    res: Response
): Promise<void> => {

    const { id } = req.params;

    const {
        courseId,
        courseCategoryId,
        courseLectures,
        courseQandA,
        notes,
        aboutCourse
    } = req.body;

    try {

        const courseDetails = await CourseDetail.findByPk(id);

        if (req.user?.roleId !== 1) {
            res.status(403).json({ message: 'You don\'t have Permissionn to update course details' });
            return;
        }

        if (!courseDetails) {
            res.status(404).send({ message: 'Course details not found' });
            return;
        }

        if (!courseId) {
            res.status(404).json({ message: 'course id not found' });
            return;
        }

        courseDetails.set({
            courseId: courseId,
            courseCategoryId: courseCategoryId,
            courseLectures: courseLectures,
            courseQandA: courseQandA,
            notes: notes,
            aboutCourse: aboutCourse
        });

        await courseDetails.save();

        res.status(200).json({ message: 'Course details updated successfully', courseDetails });
        return;

    } catch (error) {
        res.status(500).json({ message: 'Error updating courseDetails', error });
        return;
    }
};


//delete courseDetails
export const deleteCourseDetailsHandler: EndpointHandler<EndpointAuthType> = async (
    req: EndpointRequestType[EndpointAuthType],
    res: Response
): Promise<void> => {

    const { id } = req.params;

    try {

        const courseDetails = await CourseDetail.findByPk(id);

        if (req.user?.roleId !== 1) {
            res.status(403).json({ message: 'You don\'t have Permission to delete course details' });
            return;
        }

        if (!courseDetails) {
            res.status(404).json({ message: 'courseDetails not found' });
            return;
        }

        await courseDetails.destroy();

        res.status(200).json({ message: 'Course details deleted successfully' });
        return;

    } catch (error) {
        res.status(500).json({ message: 'Error deleting courseDetails', error });
        return;
    }
};