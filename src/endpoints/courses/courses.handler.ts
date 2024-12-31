import {
  EndpointAuthType,
  EndpointHandler,
  EndpointRequestType
} from 'node-server-engine';
import {
  COURSE_NOT_FOUND,
  COURSE_CREATION_ERROR,
  COURSE_UPDATE_ERROR,
  COURSE_DELETION_ERROR,
  COURSE_GET_ERROR,
  CATEGORY_NOT_FOUND
} from './course.const';
import { Course, CourseCategory, Audit } from 'db';
import { Response } from 'express';

export const getCourseHandler: EndpointHandler<EndpointAuthType> = async (
  req: EndpointRequestType[EndpointAuthType],
  res: Response
): Promise<void> => {
  try {

    const course = await Course.findAll({
        include: [
          {
            model: CourseCategory, as: 'category',
            attributes: ['id','courseCategory'] 
          }
          ]
      });

    if (course.length === 0) {
      res.status(404).json({ message: COURSE_NOT_FOUND }); 
      return;
    }

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ message: COURSE_GET_ERROR, error });
  }
}


// Create a new course
export const createCourseHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {

  const { user } = req;
  const { courseName, courseDesc, courseCategoryId } = req.body;
  try {

    const category = await CourseCategory.findByPk(courseCategoryId);

    if (!category) {
      res.status(404).json({ message: CATEGORY_NOT_FOUND});
      return;
    }

    // Create the course
    const newCourse = await Course.create({
      courseName,
      courseDesc,
      courseCategoryId
    });

    await Audit.create({
      entityType: 'Course',
      entityId: newCourse.id,
      action: 'CREATE',
      newData: newCourse,
      performedBy: user?.id
    });

    res.status(201).json({ message: 'Course created successfully', newCourse });
  } catch (error) {
    res.status(500).json({ message: COURSE_CREATION_ERROR, error });
  }
};

// Get a course by ID
export const getCourseByIdHandler: EndpointHandler<EndpointAuthType> = async (
  req: EndpointRequestType[EndpointAuthType],
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const course = await Course.findByPk(id, {
      include: [
        { model: CourseCategory, as: 'category' },
      ]
    });

    if (!course) {
      res.status(404).json({ message: COURSE_NOT_FOUND });
      return;
    }

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ message: COURSE_GET_ERROR, error });
  }
};

// Update a course
export const updateCourseHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {

  const { id } = req.params;
  const { user } = req;
  const { courseName, courseDesc, courseCategoryId } = req.body;

  try {

    const updateCourse = await Course.findByPk(id);

    if (!updateCourse) {
      res.status(404).json({ message: COURSE_NOT_FOUND });
      return;
    }

    const category = await CourseCategory.findByPk(courseCategoryId);
    if (!category) {
      res.status(404).json({ message: CATEGORY_NOT_FOUND });
      return;
    }

    const previousData = {
      courseName: updateCourse.courseName,
      courseDesc: updateCourse.courseDesc,
      courseCategoryId: updateCourse.courseCategoryId
    }
    
    updateCourse.set({
      courseName: courseName,
      courseDesc: courseDesc,
      courseCategoryId: courseCategoryId
    });

    await Audit.create({
      entityType: 'Course',
      entityId: updateCourse.id,
      action: 'UPDATE',
      OldData: previousData,
      newData: updateCourse,
      performedBy: user?.id
    });

    await updateCourse.save();

    res.status(200).json({ message: 'Course updated successfully', updateCourse });
  } catch (error) {
    res.status(500).json({ message: COURSE_UPDATE_ERROR, error });
  }
};

// Delete a course
export const deleteCourseHandler: EndpointHandler<EndpointAuthType.JWT> = async (
  req: EndpointRequestType[EndpointAuthType.JWT],
  res: Response
): Promise<void> => {

  const { id } = req.params;
  const { user } = req;

  try {
    const deleteCourse = await Course.findByPk(id);

    if (!deleteCourse) {
      res.status(404).json({ message: COURSE_NOT_FOUND });
      return;
    }

    await Audit.create({ 
      entityType: 'Course',
      entityId: deleteCourse.id,
      action: 'DELETE',
      oldData: deleteCourse, // Old data before deletion
      performedBy: user?.id
    });

    await deleteCourse.destroy();

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: COURSE_DELETION_ERROR, error });
  }
};