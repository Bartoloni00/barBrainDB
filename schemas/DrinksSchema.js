import yup from 'yup'

const drinksSchemaCreate = yup.object().shape({
    name: yup.string().required(),
    descripcion: yup.string().required(),
    category: yup.string().required(),
    ingredients: yup.array().of(
      yup.object().shape({
        name: yup.string().required(),
        amount: yup.string().required()
      })
    ).required()
  })

const drinksSchemaUpdate = yup.object().shape({
    name: yup.string(),
    descripcion: yup.string(),
    category: yup.string(),
    ingredients: yup.array().of(
      yup.object().shape({
        name: yup.string(),
        amount: yup.string()
      })
    )
  })

export {
    drinksSchemaCreate,
    drinksSchemaUpdate
}