/**
 * antigo componente de seletores do estilo disponíveis X selecionados. você
 * pode fazer um melhor facilmente.
 * 
 * @param origem
 * @param destino
 * @param botao
 * @return
 */
function SelectGrupos(origem, destino, botao) {
	// puxamos os grupos
	var gruposOrigem = origem.getElementsByTagName("optgroup")
	var gruposDestino = destino.getElementsByTagName("optgroup")

	// em seguida os trs grupos de origem e de destino
	var orientadoresOrigem
	var bolsistasOrigem
	var maquinasOrigem

	var orientadoresDestino
	var bolsistasDestino
	var maquinasDestino

	// sincronizador entre as listas especficas e os nidces dos grupos;
	function reloadListas() {
		orientadoresOrigem = gruposOrigem[0].getElementsByTagName("option")
		bolsistasOrigem = gruposOrigem[1].getElementsByTagName("option")
		maquinasOrigem = gruposOrigem[2].getElementsByTagName("option")

		orientadoresDestino = gruposDestino[0].getElementsByTagName("option")
		bolsistasDestino = gruposDestino[1].getElementsByTagName("option")
		maquinasDestino = gruposDestino[2].getElementsByTagName("option")
	}
	reloadListas()

	/**
	 * utilitrio de reset do formulrio; se algum campo tiver sido movido para o
	 * grupo destino ele ser retornado para o grupo de origem;
	 */
	this.removeTodos = function() {
		var i
		var kra// XXX Todos estes laos podem economizar esse ++i e esse i--;

		for (i = -1; ++i < orientadoresDestino.length;) {
			kra = gruposDestino[0].removeChild(orientadoresDestino[i])
			kra.selected = false
			gruposOrigem[0].appendChild(kra)
			i--// para os casos de mais de um elemento selecionado
		}

		for (i = -1; ++i < bolsistasDestino.length;) {
			kra = gruposDestino[1].removeChild(bolsistasDestino[i])
			kra.selected = false
			gruposOrigem[1].appendChild(kra)
			i--// para os casos de mais de um elemento selecionado
		}

		for (i = -1; ++i < maquinasDestino.length;) {
			kra = gruposDestino[2].removeChild(maquinasDestino[i])
			kra.selected = false
			gruposOrigem[2].appendChild(kra)
			i--// para os casos de mais de um elemento selecionado
		}

		reloadListas()
	}

	// por fim, o evento no boto:
	botao.onclick = function(evt) {
		var i
		var kra

		for (i = -1; ++i < orientadoresOrigem.length;) {
			if (orientadoresOrigem[i].selected) {
				kra = gruposOrigem[0].removeChild(orientadoresOrigem[i])
				kra.selected = false
				gruposDestino[0].appendChild(kra)
				i--// para os casos de mais de um elemento selecionado
			}
		}

		for (i = -1; ++i < bolsistasOrigem.length;) {
			if (bolsistasOrigem[i].selected) {
				kra = gruposOrigem[1].removeChild(bolsistasOrigem[i])
				kra.selected = false
				gruposDestino[1].appendChild(kra)
				i--// para os casos de mais de um elemento selecionado
			}
		}

		for (i = -1; ++i < maquinasOrigem.length;) {
			if (maquinasOrigem[i].selected) {
				kra = gruposOrigem[2].removeChild(maquinasOrigem[i])
				kra.selected = false
				gruposDestino[2].appendChild(kra)
				i--// para os casos de mais de um elemento selecionado
			}
		}

		reloadListas()
	}
}
