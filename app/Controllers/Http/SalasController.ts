import Sala from "App/Models/Sala"
import SalaValidator from "App/Validators/SalaValidator"

export default class SalasController {
    index({request}){

        const {nome, tipo} = request.all()

        const sala = Sala.query()
                             .select(['id', 'nome', 'capacidade', 'tipo'])
                             .preload('turmas')
                             
        if(nome){
            sala.where('nome', nome)
        }

        if(tipo){
            sala.where('tipo', tipo)
        }

        return sala
    }
    async store({request}){
        const dados = await request.validate(SalaValidator)
        return Sala.create(dados)
    }
    show({request}){
        const id = request.param('id')
        return Sala.find(id)
    }
    async destroy({request}){
        const id = request.param('id')
        const sala = await Sala.findOrFail(id)
        return sala.delete()
    }
    async update({request}){
        const id = request.param('id')
        const sala = await Sala.findOrFail(id)

        const dados = request.only(['nome', 'capacidade', 'tipo'])
        
        sala.merge(dados).save()

        return dados
    }
}