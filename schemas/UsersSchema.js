import yup from 'yup'

const usersSchemaCreate = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
})

const usersSchemaUpdate = yup.object({
    email: yup.string().email(),
    password: yup.string()
})

export {
    usersSchemaCreate,
    usersSchemaUpdate
}