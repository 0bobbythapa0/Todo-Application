/*
{
    task:string
}
*/

const zod = require("zod");

const taskSchema = zod.object({
    task: zod.string()
});

const updateSchema = zod.object({
    _id: zod.string(),
    task: zod.string()
})

const deleteSchema = zod.object({
    _id: zod.string()
})

module.exports = {
    taskSchema, updateSchema, deleteSchema
};