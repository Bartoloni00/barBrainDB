import yup from 'yup'

const ingredientsSchemaCreate = yup.object({
    name: yup.string().required(),
    category: yup.string().required()
})

const ingredientsSchemaUpdate = yup.object({
    name: yup.string(),
    category: yup.string()
})

export {
    ingredientsSchemaCreate,
    ingredientsSchemaUpdate
}