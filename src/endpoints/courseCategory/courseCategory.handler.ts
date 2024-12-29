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


function isValidBase64(base64String: string): boolean {
    // Regular expression to check if the string is a valid base64 image string (with a data URI scheme)
    const base64Regex = /^data:image\/(png|jpeg|jpg|gif);base64,/;
    return base64Regex.test(base64String);
}


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

        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ message: COURSECATEGORY_GET_ERROR, error });
    }
};

export const courseCategoryHandler: EndpointHandler<EndpointAuthType.JWT> = async (
    req: EndpointRequestType[EndpointAuthType.JWT],
    res: Response
): Promise<void> => {
    const { user } = req;
    const { courseCategory, description, courseCategoryImg } = req.body;

    //Validate base64 image format
    if (!isValidBase64(courseCategoryImg)) {
        res.status(400).json({ message: 'Invalid base64 image format.' });
        return;
    }

    try {

        const newCategory = await CourseCategory.create({
            courseCategory,
            description,
            courseCategoryImg, 
        });

        // Log the action in the audit table
        await Audit.create({
            entityType: 'CourseCategory',
            entityId: newCategory.id,
            action: 'CREATE',
            newData: newCategory,
            performedBy: user?.id,
        });

        // Respond with success
        res.status(201).json({ message: 'Course category created successfully', newCategory });
    } catch (error) {
        res.status(500).json({ message: COURSECATEGORY_CREATION_ERROR, error });
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
            res.status(404).json({ message: COURSECATEGORY_NOT_FOUND })
            return;
        }
        res.status(200).json({ category });
    } catch (error) {
        res.status(500).json({ message: COURSECATEGORY_GET_ERROR, error });
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
            res.status(404).json({ message: COURSECATEGORY_NOT_FOUND });
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

        await Audit.create({
            entityType: 'CourseCategory',
            entityId: updateCategory.id,
            action: 'UPDATE',
            OldData: previousData,
            newData: updateCategory,
            performedBy: user?.id
          });

          await updateCategory.save();

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
            res.status(404).json({ message: COURSECATEGORY_NOT_FOUND });
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

