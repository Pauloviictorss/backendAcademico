import Semestre from "App/Models/Semestre"
import SemestreValidator from "App/Validators/SemestreValidator"

export default class SemestresController {
    index({request}){

        const {nome, dataInicio, dataFim} = request.all()

        const semestre = Semestre.query()
                             .select(['id', 'nome', 'dataInicio', 'dataFim'])
                             .preload('turmas')
                             
        if(nome){
            semestre.where('nome', nome)
        }

        if(dataInicio){
            semestre.where('dataInicio', dataInicio)
        }

        if(dataFim){
            semestre.where('dataFim', dataFim)
        }

        return semestre
    }
    async store({request}){
        const dados = await request.validate(SemestreValidator)
        return Semestre.create(dados)
    }
    show({request}){
        const id = request.param('id')
        return Semestre.find(id)
    }
    async destroy({request}){
        const id = request.param('id')
        const semestre = await Semestre.findOrFail(id)
        return semestre.delete()
    }
    async update({request}){
        const id = request.param('id')
        const semestre = await Semestre.findOrFail(id)

        const dados = request.only(['nome', 'dataInicio', 'dataFim'])
        
        semestre.merge(dados).save()

        return dados
    }
}