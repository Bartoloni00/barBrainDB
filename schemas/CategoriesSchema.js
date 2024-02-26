import yup from 'yup'

const categorySchemaCreate = yup.object({
    name: yup.string().required(),
    description: yup.string().required()
})

const categorySchemaUpdate = yup.object({
    name: yup.string(),
    description: yup.string()
})

export {
    categorySchemaCreate,
    categorySchemaUpdate
}