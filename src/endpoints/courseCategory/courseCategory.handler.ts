import {
    EndpointAuthType,
    EndpointHandler,
    EndpointRequestType
} from '@gwcdata/node-server-engine';
import { CourseCategory } from 'db';
import { Response } from 'express';

//Get Categories
export const getCategoriesHandler: EndpointHandler<EndpointAuthType> = async (
    req: EndpointRequestType[EndpointAuthType],
    res: Response
): Promise<void> => {

    try {

        const categories = await CourseCategory.findAll();

        if (categories.length === 0) {
            res.status(404).json({ message: 'No categories found' });
            return;
        }

        res.status(200).json({ categories });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', data: error });
        return;
    }
};


//create category
export const courseCategoryHandler: EndpointHandler<EndpointAuthType> = async (
    req: EndpointRequestType[EndpointAuthType],
    res: Response
): Promise<void> => {

    const { courseCategory, description, courseCategoryImg, } = req.body;

    if (req.user?.roleId !== 1) {
        res.status(403).json({ message: 'You don\'t have Permission to create a new category' });
        return;
    }

    try {
        const newCategory = await CourseCategory.create({
            courseCategory,
            description,
            courseCategoryImg
        });
        res
            .status(201)
            .json({ message: 'Course category created successfully', data: newCategory });
        return;
    }
    catch (error) {
        res
            .status(500)
            .json({ message: 'Error creating course category', data: error });
        return;
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
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', data: error });
        return;
    }
};

//Update a course
export const updateCategoryHandler: EndpointHandler<EndpointAuthType> = async (
    req: EndpointRequestType[EndpointAuthType],
    res: Response
): Promise<void> => {

    const { id } = req.params;
    const { courseCategory, description, courseCategoryImg } = req.body;

    try {

        const category = await CourseCategory.findByPk(id);

        if (req.user?.roleId !== 1) {
            res.status(403).json({ message: 'You don\'t have permission to update this category' });
            return;
        }

        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }

        category.set({
            courseCategory: courseCategory,
            description: description,
            courseCategoryImg: courseCategoryImg
        });

        await category.save();

        res.status(200).json({ message: 'Category updated successfully', category });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
        return;
    }
};


//Delete a category
export const deleteCategoryHandler: EndpointHandler<EndpointAuthType> = async (
    req: EndpointRequestType[EndpointAuthType],
    res: Response
): Promise<void> => {

    const { id } = req.params;

    try {
        const category = await CourseCategory.findByPk(id);

        if (req.user?.roleId !== 1) {
            res.status(403).json({ message: 'You don\'t have Permission to delete this category' });
            return;
        }

        if (!category) {
            res.status(404).json({ message: 'Category not found' });
            return;
        }

        await category.destroy();

        res.status(200).json({ message: 'Category deleted successfully' });
        return;
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
        return;
    }
};