import { Router } from "express";
import PartidoController from "../controller/partido-controller.js";

const rotaPartido = Router()

const partidoCTRL = new PartidoController()

rotaPartido.get('/:codigo', partidoCTRL.consultar)
rotaPartido.get('/', partidoCTRL.consultar)
rotaPartido.post('/', partidoCTRL.gravar)
rotaPartido.put('/', partidoCTRL.alterar)
rotaPartido.patch('/', partidoCTRL.alterar)
rotaPartido.delete('/', partidoCTRL.excluir)

export default rotaPartido;
