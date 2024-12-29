import {
    EndpointHandler,
    EndpointAuthType,
    EndpointRequestType
} from 'node-server-engine';
import { Response } from 'express';
import { Course, EnrolledCourse, Audit, User, Batch } from 'db'
import {
    ENROLLEDCOURSE_CREATE_ERROR,
    ENROLLEDCOURSE_UPDATE_ERROR,
    ENROLLEDCOURSE_DELETE_ERROR,
    ENROLLEDCOURSE_GET_ERROR,
    ENROLLEDCOURSE_NOT_FOUND,
    USER_NOT_FOUND,
    BATCH_NOT_FOUND,
    COURSE_NOT_FOUND
} from './enrolledCourses.const'

export const createEnrolledCourseHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { user } = req;
    const { userId, courseId, batchId, enrollmentDate } = req.body;

    try {
        //create a enrolledCourse
        const enrolledCourse = await EnrolledCourse.create({
            userId,
            batchId,
            courseId,
            enrollmentDate
        });

        await Audit.create({
            entityType: 'enrolledCourse',
            entityId: enrolledCourse.id,
            action: 'CREATE',
            newData: enrolledCourse,
            performedBy: user?.id
        });

        res.status(201).json({ message: 'course enroll successfully', enrolledCourse });
    } catch (error) {
        res.status(500).json({ message: ENROLLEDCOURSE_CREATE_ERROR, error })
    }
}

//getenrollledCoursebasedon ID
export const getEnrolledCourseByIdHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { id } = req.params;

    try {

        const enrolledCourse = await EnrolledCourse.findByPk(id, {
            include: [
                {
                    model: User, as: 'trainee',
                    attributes: ['id','firstName', 'lastName']
                },
                {
                    model: Batch, as: 'batch',
                    attributes: ['id','batchName']
                },
                {
                    model: Course, as: 'course',
                    attributes: ['id','courseName']
                }
            ],
        })

        if (!enrolledCourse) {
            res.status(400).json({ message: ENROLLEDCOURSE_NOT_FOUND });
            return;
        }

        res.status(200).json({ enrollstudentsWithcourse: enrolledCourse});
    } catch (error) {
        res.status(500).json({ message: ENROLLEDCOURSE_GET_ERROR, error })
    }
};


//totalEnrolledCourse
export const getAllEnrolledCoursesHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    try {

        const enrolledCourses = await EnrolledCourse.findAll({
            include: [
                {
                    model: User, as: 'trainee',
                    attributes: ['id','firstName', 'lastName']
                },
                {
                    model: Batch, as: 'batch',
                    attributes: ['id','batchName']
                },
                {
                    model: Course, as: 'course',
                    attributes: ['id','courseName']
                }
            ],
        });

        if (!enrolledCourses) {
            res.status(400).json({ message: ENROLLEDCOURSE_NOT_FOUND });
        }
        
        res.status(200).json({ allEnrolledCourse: enrolledCourses});
    } catch (error) {
        res.status(500).json({ message: ENROLLEDCOURSE_GET_ERROR, error })
    }
}


export const updateEnrolledCourseHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { user } = req;
    const { id } = req.params;
    const { userId, courseId, batchId, enrollmentDate } = req.body;

    try {

        const updateEnrolledCourse = await EnrolledCourse.findByPk(id);

        if (!updateEnrolledCourse) {
            res.status(404).json({ message: 'Enrolled course not found' });
            return;
        }

        if (!batchId) {
            res.status(400).json({ message: BATCH_NOT_FOUND });
            return;
        }

        if (!courseId) {
            res.status(400).json({ message: COURSE_NOT_FOUND });
            return;
        }

        if (!userId) {
            res.status(400).json({ message: USER_NOT_FOUND });
            return;
        }

        const previousData = {
            userId: updateEnrolledCourse.userId,
            courseId: updateEnrolledCourse.courseId,
            batchId: updateEnrolledCourse.batchId,
            enrollmentDate: updateEnrolledCourse.enrollmentDate
        }

        updateEnrolledCourse.set({
            userId: userId,
            courseId: courseId,
            batchId: batchId,
            enrollmentDate: enrollmentDate
        });

        await updateEnrolledCourse.save();

        await Audit.create({
            entityType: 'enrolledCourse',
            entityId: updateEnrolledCourse.id,
            action: 'UPDATE',
            OldData: previousData,
            newData: updateEnrolledCourse,
            performedBy: user?.id
        });

        res.status(200).json({ message: 'enrolledCourse updated successfully', updateEnrolledCourse });
    } catch (error) {
        res.status(500).json({ message: ENROLLEDCOURSE_UPDATE_ERROR, error })
    }
}


//delete enrolledcourse
export const deleteEnrolledCourse: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { id } = req.params;
    const { user } = req;

    try {

        const deleteEnrollCourse = await EnrolledCourse.findByPk(id);

        if(!deleteEnrollCourse) {
            res.status(400).json({ message: 'Enrolled Course not found' });
            return;
        }

        await Audit.create({
            entityType: 'enrolledCourse',
            entityId: deleteEnrollCourse.id,
            action: 'DELETE',
            OldData: deleteEnrollCourse,
            performedBy: user?.id
        });

        await deleteEnrollCourse.destroy();

        res.status(200).json({ message: 'Enrolled Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: ENROLLEDCOURSE_DELETE_ERROR, error })
    }
};