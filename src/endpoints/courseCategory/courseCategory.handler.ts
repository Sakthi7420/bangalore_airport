import {
    EndpointAuthType,
    EndpointHandler,
    EndpointRequestType
} from 'node-server-engine';
import { CourseCategory, Audit } from 'db';
import { Response } from 'express';
import { 
    COURSECATEGORY_NOT_FOUND,
    COURSECATEGORY_CREATION_ERROR,
    COURSECATEGORY_UPDATE_ERROR,
    COURSECATEGORY_DELETION_ERROR,
    COURSECATEGORY_GET_ERROR
} from './courseCategory.const';

//Get Categories
export const getCategoriesHandler: EndpointHandler<EndpointAuthType> = async (
    req: EndpointRequestType[EndpointAuthType],
    res: Response
): Promise<void> => {

    try {

        const categories = await CourseCategory.findAll();

        if (categories.length === 0) {
            res.status(404).json({ message: COURSECATEGORY_NOT_FOUND });
            return;
        }

        res.status(200).json({ category: categories  });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', data: error });
    }
};


//create category
export const courseCategoryHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { user } = req;
    const { courseCategory, description, courseCategoryImg, } = req.body;

    try {
        const newCategory = await CourseCategory.create({
            courseCategory,
            description,
            courseCategoryImg
        });

        await Audit.create({
            entityType: 'CourseCategory',
            entityId: newCategory.id,
            action: 'CREATE',
            newData: newCategory,
            performedBy: user?.id
        });

        res
            .status(201)
            .json({ message: 'Course category created successfully', data: newCategory });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: COURSECATEGORY_CREATION_ERROR, error });
    }
};

// Get category by ID
export const getCategoryByIdHandler: EndpointHandler<EndpointAuthType> = async (
    req: EndpointRequestType[EndpointAuthType],
    res: Response
): Promise<void> => {

    const { id } = req.params;

    try {
        const category = await CourseCategory.findByPk(id);

        if (!category) {
            res.status(404).json({ message: 'CategoryId not found' })
            return;
        }
        res.status(200).json({ category });
    } catch (error) {
        res.status(500).json({ message: COURSECATEGORY_GET_ERROR, data: error });
    }
};

//Update a course
export const updateCategoryHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { id } = req.params;
    const { user } = req;
    const { courseCategory, description, courseCategoryImg } = req.body;
    
    try {

        const updateCategory = await CourseCategory.findByPk(id);

        if (!updateCategory) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }

        const previousData = {
            courseCategory: updateCategory.courseCategory,
            description: updateCategory.description,
            courseCategoryImg: updateCategory.courseCategoryImg   
          }

          updateCategory.set({
            courseCategory: courseCategory,
            description: description,
            courseCategoryImg: courseCategoryImg
        });

        await updateCategory.save();

        await Audit.create({
            entityType: 'CourseCategory',
            entityId: updateCategory.id,
            action: 'UPDATE',
            OldData: previousData,
            newData: updateCategory,
            performedBy: user?.id
          });

        res.status(200).json({ message: 'Category updated successfully', updateCategory });
    } catch (error) {
        res.status(500).json({ message: COURSECATEGORY_UPDATE_ERROR, error });
    }
};


//Delete a category
export const deleteCategoryHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {

    const { id } = req.params;
    const { user } = req;

    try {
        const deleteCategory = await CourseCategory.findByPk(id);

        if (!deleteCategory) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }

        await Audit.create({ 
            entityType: 'CourseCategory',
            entityId: deleteCategory.id,
            action: 'DELETE',
            oldData: deleteCategory, // Old data before deletion
            performedBy: user?.id
          });

        await deleteCategory.destroy();

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: COURSECATEGORY_DELETION_ERROR, error });
    }
};