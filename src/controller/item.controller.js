import connectDb from '../DB/index.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js';
import ApiResponse  from '../utils/ApiResponse.js';


 
 
 
 
   

   
   
   

   
   
const addItem = asyncHandler(async (req, res, next) => {
    try {
        const { name, level, parent } = req.body;

        if (!name || !level) {
            return next(new ApiError(400, "Name and level are required"));
        }

        if (parent) {
            const [rows] = await connectDb.query('SELECT * FROM item WHERE id = ?', [parent]);
            if (!rows.length) {
                return next(new ApiError(404, "Parent item not found"));
            }
        }

        const [result] = await connectDb.query(
            'INSERT INTO item (name, level, parent) VALUES (?, ?, ?)',
            [name, level, parent || null]
        );

        console.log("Query Execution Result:", result); 

        if (!result.affectedRows) {
            return next(new ApiError(500, "Failed to add item"));
        }

        return res.status(201).json(new ApiResponse(201, { id: result.insertId }, "Item added successfully"));
    } catch (error) {
        console.error("Internal Server Error:", error);
        return next(new ApiError(500, "Something went wrong"));
    }
});

   
   
   






   
   
   
   
const updateItem = asyncHandler(async (req, res, next) => {
    const { id } = req.params;  
    const { name, level, parent } = req.body;  

    if (!id) {
        return next(new ApiError(400, "Item ID is required"));
    }

    if (parent) {
        const [rows] = await connectDb.query('SELECT * FROM item WHERE id =?', [parent]);
        if (!rows.length) {
            return next(new ApiError(404, "Parent item not found"));
        }
    }

    
    const [existingItem] = await connectDb.query('SELECT * FROM item WHERE id = ?', [id]);

    if (!existingItem.length) {
        return next(new ApiError(404, "Item not found"));
    }

    
    const [result] = await connectDb.query(
        'UPDATE item SET name = ?, level = ?, parent = ? WHERE id = ?',
        [name || existingItem[0].name, level || existingItem[0].level, parent || existingItem[0].parent, id]
    );

    if (!result.affectedRows) {
        return next(new ApiError(500, "Failed to update item"));
    }

    return res.status(200).json(new ApiResponse(200, { id }, "Item updated successfully"));
});


   
   
   
const getByLevel = asyncHandler(async (req, res, next) => {
    const { level } = req.query
    console.log(level);
    if (!level) {
        return next(new ApiError(400, "Level is required"));
    }
    const [rows] = await connectDb.query('SELECT * FROM item WHERE level =?', [level]);
    if (!rows.length) {
        return res.status(200).json(new ApiResponse(200, [], "No items found at this level"));
    }
    return res.status(200).json(new ApiResponse(200, rows, "Items fetched successfully"));
})
    

const getByParent = asyncHandler(async(req,res,next) => {
    const {parentlevel} = req.query;
    if(!parentlevel){
        return next(new ApiError(400,"Parent level is required"));
    }
    const [rows] = await connectDb.query('SELECT * FROM item WHERE parent = (SELECT id FROM item WHERE name =?)',[parentlevel]);
    if(!rows.length){
        return res.status(200).json(new ApiResponse(200,[],"No childeren found of this parent"));
    }
    return res.status(200).json(new ApiResponse(200,rows,"Items fetched successfully"));
    
})
 
// delete all object with a name

const deleteByName = asyncHandler(async(req,res,next) => {
    const {name} = req.query;
    if(!name){
        return next(new ApiError(400,"Name is required"));
    }
    const [rows] = await connectDb.query('DELETE FROM item WHERE name =?',[name]);
    if(!rows.affectedRows){
        return next(new ApiError(404,"Item not found"));
    }
    return res.status(200).json(new ApiResponse(200,[],"Item deleted successfully"));

})
//delete by id 
const deleteById = asyncHandler(async(req,res,next) => {
    const {id} = req.params;
    if(!id){
        return next(new ApiError(400,"ID is required"));
    }
    const [rows] = await connectDb.query('DELETE FROM item WHERE id =?',[id]);
    if(!rows.affectedRows){
        return next(new ApiError(404,"Item not found"));
    }
    return res.status(200).json(new ApiResponse(200,[],"Item deleted successfully"));

})



export {addItem,updateItem,getByLevel,getByParent,deleteById,deleteByName}