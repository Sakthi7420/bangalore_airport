import {
  EndpointAuthType,
  EndpointHandler,
  EndpointRequestType
} from '@gwcdata/node-server-engine';
import { Course } from 'db';
import { CourseCategory } from 'db';
import { User } from 'db';
import { Response } from 'express';

export const getCourseHandler: EndpointHandler<EndpointAuthType> = async (
  req: EndpointRequestType[EndpointAuthType],
  res: Response
): Promise<void> => {
  try {

    const course = await Course.findAll();

    if (course.length === 0) {
      res.status(404).json({ message: 'No course found' });
      return;
  }

  res.status(200).json({ course: course });

  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', data: error});
  }
}


// Create a new course
export const createCourseHandler: EndpointHandler<EndpointAuthType> = async (
  req: EndpointRequestType[EndpointAuthType],
  res: Response
): Promise<void> => {
  const { courseName, courseDesc, courseCategoryId, courseInstructorId } = req.body;
  try {

    const category = await CourseCategory.findByPk(courseCategoryId);

    if(req.user?.role !== 'admin') {
      res.status(403).json({ message: 'You don\'t have Permission' });
      return;
  }
    if (!category) {
      res.status(404).json({ message: 'Course category not found' });
      return;
    }

    const instructor = await User.findByPk(courseInstructorId);
    if (!instructor) {
      res.status(404).json({ message: 'Instructor not found' });
      return;
    }

    // Create the course
    const course = await Course.create({
      courseName,
      courseDesc,
      courseCategoryId,
      courseInstructorId
    });

    res.status(201).json({ message: 'Course created successfully', course });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error });
    return;
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
        { model: User, as: 'instructor' }
      ]
    });

    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    res.status(200).json({ course: course });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course', error });
    return;
  }
};

// Update a course
export const updateCourseHandler: EndpointHandler<EndpointAuthType> = async (
  req: EndpointRequestType[EndpointAuthType],
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { courseName, courseDesc, courseCategoryId, courseInstructorId } = req.body;

  try {
    const course = await Course.findByPk(id);

    if(req.user?.role !== 'admin') {
      res.status(403).json({ message: 'You don\'t have Permission' });
      return;
  }

    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    const category = await CourseCategory.findByPk(courseCategoryId);
    if (!category) {
      res.status(404).json({ message: 'Course category not found' });
      return;
    }

    const instructor = await User.findByPk(courseInstructorId);
    if (!instructor) {
      res.status(404).json({ message: 'Instructor not found' });
      return;
    }

    course.set({ courseName : courseName, 
      courseDesc : courseDesc,
      courseCategoryId : courseCategoryId,
      courseInstructorId :courseInstructorId
     }); 

    await course.save();

    res.status(200).json({ message: 'Course updated successfully', course });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error });
    return;
  }
};

// Delete a course
export const deleteCourseHandler: EndpointHandler<EndpointAuthType> = async (
  req: EndpointRequestType[EndpointAuthType],
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const course = await Course.findByPk(id);

    if(req.user?.role !== 'admin') {
      res.status(403).json({ message: 'You don\'t have Permission' });
      return;
  }

    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }

    await course.destroy();

    res.status(200).json({ message: 'Course deleted successfully' });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error });
    return;
  }
};
