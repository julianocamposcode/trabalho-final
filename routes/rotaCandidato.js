import { Router } from "express";
import CandidatoController from "../controller/candidatos-controller.js";

const rotaCandidato = Router()

const candidatoCTRL = new CandidatoController()

rotaCandidato.get('/:codigo', candidatoCTRL.consultar)
rotaCandidato.get('/', candidatoCTRL.consultar)
rotaCandidato.post('/', candidatoCTRL.gravar)
rotaCandidato.put('/', candidatoCTRL.alterar)
rotaCandidato.patch('/', candidatoCTRL.alterar)
rotaCandidato.delete('/', candidatoCTRL.excluir)

export default rotaCandidato;
