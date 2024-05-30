import Category from "../models/category.model.js";

export const addCategory = async (request, response) => {
    try {
        const {icon, title} = request.body
        const userId = request.user._id

        const category = await Category.findOne({title})

        if(category) {
            return response.status(400).json({error: "Category already exists"})
        }

        const newCategory = new Category({
            userId,
            icon, 
            title
          });

        if(newCategory) {

            await newCategory.save();

            response.status(200).json({
                _id: newCategory._id,
                userId: newCategory.userId,
                icon: newCategory.icon,
                title: newCategory.title
            })
        } else {
            return response.status(400).json({error: "Invalid category data"})
        }
       
    } catch (error) {
        console.log("Error in addCategory controller", error.message)
        return response.status(500).json({error: "Internal server error"})
    }
}

export const deleteCategory = async (request, response) => {
    try {
        const { id } = request.params;
        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return response.status(404).json({ error: "category not found" });
        }
        
        return response.status(200).json({ message: "category deleted successfully" });

    } catch (error) {
        console.error("Error in deleteCategory controller", error.message);
        return response.status(500).json({ error: "Internal server error" });
    }
};

export const getCategories = async (request, response) => {
    try {
        const { userId } = request.params;

        const categories = await Category.find({ userId });

        if (!categories.length) {
            return response.status(404).json({ error: "User has no categories" });
        }

        return response.status(200).json({ categories });

    } catch (error) {
        console.error("Error in getCategories controller", error.message);
        return response.status(500).json({ error: "Internal server error" });
    }
}