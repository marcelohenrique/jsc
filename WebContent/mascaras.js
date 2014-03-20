/**
 * Mask library
 * 
 * here we have some masks to help us to validate the user input.
 * 
 * creditos originais da idpeia do timeout e do replace: 
 * 
 * http://elcio.com.br/ajax/mascara/
 * 
 * referências do subsistema de conserto do posicionamento do cursor: 
 * 
 * http://parentnode.org/javascript/working-with-the-cursor-position/
 * http://msdn.microsoft.com/en-us/library/ms536623(VS.85).aspx
 * 
 * @licence Public Domain, 
 * @author sombriks at usix technology
 */

/////////////////////////////////////////////////
/**
 * Motor abstrato e comum às mascaras. Criado apenas para prover comodidades de
 * herança.
 * 
 * @param fild
 *            campo que iremos atrelar a essa máscara
 * @param regra
 *            função contendo a grega que modifica o value do campo
 * @param tamanho
 *            (opcional) tamanho fixo do campo
 */
function _AbstractMask(fild, regra, tamanho) {

	// validações em tempo de codificação
	if (!fild)
		throw new Error("infore o campo");

	if (!regra)
		throw new Error("informe a regra");

	// mantendo o estado da mascara mais recente
	if (fild.mascara)
		fild.mascara.desinstalar();

	// devido ao controle da posição do caractere temos que cuidar do foco
	// do campo também, pra não cair em laços eternos de roubo de foco...
	var fused;
	function fusin() {
		fused = true;
	}
	function fusout() {
		fused = false;
	}

	// wrapper que nos permite salvar a posição do cursor.
	function regrawrapper() {

		if (fild.createTextRange) {// TODO fazer pros IE's da vida, rsrs

			// 2 ranges no IE pra achar a posição, :]
			var r1 = document.selection.createRange();
			var r2 = fild.createTextRange();
			var pos = 0;

			if (fused) {
				while (r1.compareEndPoints("StartToStart", r2)) {
					r2.moveStart("character", 1);
					pos++;
				}
			}

			var tamIni = fild.value.length;

			regra.call(this);

			var tamFim = fild.value.length;

			var dif = tamFim - tamIni;
			if (fused) {
				r2 = fild.createTextRange();
				r2.moveStart("character", pos + dif);
				r2.collapse();
				r2.select();
			}

			// console.debug("position: "+pos+" dif: "+dif);

		} else if (fild.offsetHeight > 0 && fild.selectionStart >= 0) {
			var pos = fild.selectionStart;
			var tamIni = fild.value.length;

			regra.call(this);

			var tamFim = fild.value.length;

			var dif = tamFim - tamIni;

			if (fused) {
				fild.selectionStart = pos + dif;
				fild.selectionEnd = pos + dif;
			}
			// console.debug("pos: "+pos+"\ttamIni:
			// "+tamIni+"\ttamFim:"+tamFim);
		} else {
			// die...
			regra.call(this);
		}
	}

	// event handler
	function executar() {
		setTimeout(regrawrapper, 1);
	}
	// publicando o executar
	this.executar = executar;

	if (fild.addEventListener) {
		fild.addEventListener("focus", fusin, true);
		fild.addEventListener("keypress", executar, true);
		fild.addEventListener("blur", fusout, true);// tomara q baste
		fild.addEventListener("blur", executar, true);
	} else if (fild.attachEvent) {
		fild.attachEvent("onfocus", fusin);
		fild.attachEvent("onkeypress", executar);
		fild.attachEvent("onblur", fusout);
		fild.attachEvent("onblur", executar);
	}

	var maxlength;
	if (tamanho) {
		maxlength = document.createAttribute("maxlength");
		maxlength.nodeValue = tamanho;
		fild.setAttributeNode(maxlength);
	}

	// utilitário para removermos a máscara
	this.desinstalar = function() {
		if (fild.removeEventListener) {
			fild.removeEventListener("focus", fusin, true);
			fild.removeEventListener("keypress", executar, true);
			fild.removeEventListener("blur", fusout, true);
			fild.removeEventListener("blur", executar, true);
		} else if (fild.detachEvent) {
			fild.detachEvent("onfocus", fusin);
			fild.detachEvent("onkeypress", executar);
			fild.detachEvent("onblur", fusout);
			fild.detachEvent("onblur", executar);
		}
		if (tamanho) {
			fild.removeAttributeNode(maxlength);
		}
		fild.mascara = null;
	};
	// meio de encontrar essa máscara depois
	fild.mascara = this;
}

/**
 * máscara de cep
 */
function CepMask(fild) {
	// rule
	function cep() {
		var v = fild.value;
		v = v.replace(/\D/g, "");
		v = v.replace(/^(\d{5})(\d)/, "$1-$2");
		v = v.replace(/(.{9})(.*)/, "$1");
		fild.value = v;
	}

	_AbstractMask.call(this, fild, cep, 9);

	this.value = function() {// returning alu w/o mask
		var v = fild.value;
		v = v.replace(/\D/g, "");
		v = v.replace(/[$0]*/, "");// leading zeros
		return v;
	};
	/*
	 * // helper to make mask sane function endzeros() { var vl = fild.value; //
	 * console.debug("antes: "+vl); if(vl.length > 0){ while (vl.length < 8) vl =
	 * "0" + vl; } fild.value = vl; // console.debug("depois: "+vl); }
	 */
	function validaCEP() {
		if (!fild.disaled && !fild.readOnly) {
			var vl = fild.value;
			if (vl.length == 0)
				return;
			if (vl.length < 9) {
				throw new Error("CEP inválido");
			}
		}
	}
	this.validar = validaCEP;

	return fild;
}

/**
 * máscara para campo de telefone
 */
function TelefoneMask(fild) {

	// rule
	function telefone() {
		var v = fild.value;
		v = v.replace(/\D/g, "");
		v = v.replace(/^(\d\d)(\d)/g, "($1) $2");
		v = v.replace(/(\d{4})(\d)/, "$1-$2");
		fild.value = v;
	}

	_AbstractMask.call(this, fild, telefone, 14);

	/**
	 * este método recupera o DDD apenas,
	 */
	this.getDDD = function() {
		var ddd = 0;
		if ("" != fild.value.replace(" ", "")) {
			// remove os outros numeros
			ddd = fild.value.replace(/(\(\d\d\))(.*)/, "$1");
			ddd = ddd.replace(/\D/g, "");
		}
		return ddd;
	};

	/**
	 * este método devolve os números sem os caracteres especiais da mascara.
	 */
	this.getNumero = function() {
		var numero = 0;
		if ("" != fild.value.replace(" ", "")) {
			numero = fild.value.replace(/\(\d\d\)/, "");// remove o DDD
			numero = numero.replace(/\D/g, "");

		}
		return numero;
	};

	this.value = function() {
		return fild.value;
	};

	return fild;
}

/**
 * This class controls cpf numbers input
 */
function CpfMask(fild) {

	// rule
	function cpf() {
		var v = fild.value;
		v = v.replace(/\D/g, "");
		v = v.replace(/(\d{3})(\d)/, "$1.$2");
		v = v.replace(/(\d{3})(\d)/, "$1.$2");
		v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
		fild.value = v;
	}

	_AbstractMask.call(this, fild, cpf, 14);

	// matemática de validação de cpf's...
	function validarCpf() {
		try {
			var s_aux = fild.value.replace(/\D/g, "");
			if (s_aux.length == 0)
				return;
			else if (s_aux.length > 0 && s_aux.length != 11)
				throw new Error("CPF inválido");
			else if (s_aux == '00000000000' || s_aux == '11111111111'
					|| s_aux == '22222222222' || s_aux == '33333333333'
					|| s_aux == '44444444444' || s_aux == '55555555555'
					|| s_aux == '66666666666' || s_aux == '77777777777'
					|| s_aux == '88888888888' || s_aux == '99999999999')
				throw new Error("CPF inválido");

			var d1 = 0, d2 = 0, digito1 = 0, digito2 = 0, resto = 0, digitoCPF, nDigResult;
			for ( var n_Count = 1; n_Count < s_aux.length - 1; n_Count++) {
				digitoCPF = parseInt(s_aux.substring(n_Count - 1, n_Count));
				d1 = d1 + (11 - n_Count) * digitoCPF;
				d2 = d2 + (12 - n_Count) * digitoCPF;
			}
			resto = (d1 % 11);
			if (resto < 2)
				digito1 = 0;
			else
				digito1 = 11 - resto;
			d2 += 2 * digito1;
			resto = (d2 % 11);
			if (resto < 2)
				digito2 = 0;
			else
				digito2 = 11 - resto;
			var nDigVerific = s_aux.substring(s_aux.length - 2, s_aux.length);
			nDigResult = digito1 + "" + digito2;
			if (nDigVerific != nDigResult)
				throw new Error("CPF inválido");

		} catch (e) {
			alert(e);
			fild.value = "";
		}
	}
	;
	this.validar = validarCpf;

	this.value = function() {
		var numero = 0;
		if ("" != fild.value.replace(" ", "")) {
			numero = fild.value.replace(/\D/g, "");
		}
		return numero;
	};

	return fild;
}

/**
 * esta classe valida o input de cnpj's
 */
function CnpjMask(fild) {

	// rule
	function cnpj() {
		var v = fild.value;
		v = v.replace(/\D/g, "");
		v = v.replace(/^(\d{2})(\d)/, "$1.$2");
		v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
		v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
		v = v.replace(/(\d{4})(\d)/, "$1-$2");
		fild.value = v;
	}

	_AbstractMask.call(this, fild, cnpj, 18);

	function validarCnpj() {
		try {

			// Declaração as variáveis
			var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais, cnpj;
			cnpj = fild.value;
			// Filtrar o campo para verificar se está com máscara
			/*
			 * var filtro = /\d{2,3}.\d{3}.\d{3}\/\d{4}-\d{2}/; if
			 * (!filtro.test(cnpj)) throw new Error("CNPJ inválido");
			 */
			// Ultilização expressão regular para retirar o que não for número
			cnpj = cnpj.replace(/\D+/g, '');

			if (cnpj.length == 0)
				return;
			else if (cnpj.length > 0 && cnpj.length != 14)
				throw new Error("CNPJ inválido");
			else if (cnpj == '00000000000000' || cnpj == '11111111111111'
					|| cnpj == '22222222222222' || cnpj == '33333333333333'
					|| cnpj == '44444444444444' || cnpj == '55555555555555'
					|| cnpj == '66666666666666' || cnpj == '77777777777777'
					|| cnpj == '88888888888888' || cnpj == '99999999999999')
				throw new Error("CNPJ inválido");

			digitos_iguais = 1;
			for (i = 0; i < cnpj.length - 1; i++)
				if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
					digitos_iguais = 0;
					break;
				}
			if (!digitos_iguais) {
				tamanho = cnpj.length - 2;
				numeros = cnpj.substring(0, tamanho);
				digitos = cnpj.substring(tamanho);
				soma = 0;
				pos = tamanho - 7;
				for (i = tamanho; i >= 1; i--) {
					soma += numeros.charAt(tamanho - i) * pos--;
					if (pos < 2)
						pos = 9;
				}
				resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
				if (resultado != digitos.charAt(0))
					throw new Error("CNPJ inválido");

				tamanho = tamanho + 1;
				numeros = cnpj.substring(0, tamanho);
				soma = 0;
				pos = tamanho - 7;
				for (i = tamanho; i >= 1; i--) {
					soma += numeros.charAt(tamanho - i) * pos--;
					if (pos < 2)
						pos = 9;
				}

				resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
				if (resultado != digitos.charAt(1))
					throw new Error("CNPJ inválido");
			}

		} catch (e) {
			alert(e);
			fild.value = "";
		}
	}
	;

	this.validar = validarCnpj;

	this.value = function() {
		var numero = 0;
		if ("" != fild.value.replace(" ", "")) {
			numero = fild.value.replace(/\D/g, "");
		}
		return numero;
	};

	return fild;
}

/**
 * Esta classe faz com que o campo receba apenas números
 */
function NumberMask(fild) {

	// rule
	function soNumeros() {
		fild.value = fild.value.replace(/\D/g, "");
	}

	_AbstractMask.call(this, fild, soNumeros);

	this.value = function() {
		return fild.value;
	};

	return fild;
}

/**
 * Esta classe faz com que o campo receba apenas números
 */
function LetterMask(fild) {

	// rule
	function soLetras() {
		var v = fild.value;
		v = v.replace(/[^a-zA-ZÇçÁáÉéÍíÓóÚúÊêÃãÕõ ]+/g, "");
		fild.value = v.toUpperCase();
	}

	_AbstractMask.call(this, fild, soLetras);

	this.value = function() {
		return fild.value;
	};

	return fild;
}

/*
 * cl4553 p4r4 35cr3v3r 4551m
 */
function LeetMask(fild) {

	// rule
	function leet() {
		var v = fild.value;
		v = v.replace(/o/gi, "0");
		v = v.replace(/i/gi, "1");
		v = v.replace(/z/gi, "2");
		v = v.replace(/e/gi, "3");
		v = v.replace(/a/gi, "4");
		v = v.replace(/s/gi, "5");
		v = v.replace(/t/gi, "7");
		fild.value = v;
	}

	_AbstractMask.call(this, fild, leet);

	this.value = function() {
		return fild.value;
	};

	return fild;
}

/**
 * Mask to currency inputs. produces 1.200,25 from 1200.25
 */
function ValorMask(fild) {

	// rule
	function valor() {
		var v = fild.value;
		// defence against double dots and double comas
		v = v.replace(/\.\./g, ".");
		v = v.replace(/,,/g, ",");
		if (/\d{1,3}\.\d{3}/.test(v) && v.indexOf(",") == -1)
			v = v.replace(/\./, "");
		var v = v.replace(/[^\d,]/, "");
		var v = v.split(",");
		var decimal;
		if (v.length == 2) {
			v[0] = v[0].split("");
			v[1] = v[1].split("");
			while (v[1].length > 2)
				v[0].push(v[1].shift());
			v[0] = v[0].join().replace(/,/g, "");
			v[1] = v[1].join().replace(/,/g, "");
			decimal = "," + v[1];
		}
		v = v[0];
		v = v.replace(/\./g, "");
		if (v.length > 3) {// time to rotate lists
			v = v.split("");
			v = v.reverse();// reverse list
			var vAux = [];
			while (v.length > 0) {
				var v3 = v.splice(0, 3);
				while (v3 && v3.length > 0)
					vAux.push(v3.shift());
				if (v.length > 0)
					vAux.push(".");
			}
			v = vAux;
			v = v.reverse();// normal list
			v = v.join("");
			v = v.replace(/\.\./g, ".");
		}

		if (decimal)
			v = v + decimal;
		if (v.search(/^(0\d+,)/) > -1) {
			v = v.replace(/^(0+)(\d)/g, "$2");
		}
		fild.value = v;
	}

	_AbstractMask.call(this, fild, valor);

	function zerozero() {
		var x = fild.value;
		x = x.replace(/,,/g, ",");
		x = x.replace(/\.\./g, ".");
		// if a valid double
		if (!isNaN(x) && x.match(/\d+\.\d{1,2}$/))
			x = x.replace(/\./, ",");
		// if a valid number but without decimals
		if (x.indexOf(",") == -1 && x != "")
			x += ",00";
		fild.value = x;
	}

	var desinstl = this.desinstalar;

	this.desinstalar = function() {

		if (fild.detachEvent)
			fild.detachEvent("onblur", zerozero);
		else if (fild.removeEventListener)
			fild.removeEventListener("blur", zerozero, true);
		desinstl();
	};

	var execut = this.executar;

	this.executar = function() {
		zerozero();
		execut();
	};

	this.value = function() {
		// forcing syncrhonous input validation
		zerozero();
		execut();
		var v = fild.value;
		if (!isNaN(v) && v != "")// is this a value without mask?
			v = parseFloat(v).toFixed(2);
		v = v.replace(/\./g, "").replace(/,/, ".");
		v = parseFloat(v);
		v = v.toFixed(2);
		if (isNaN(v))// things gone wrong anyway?
			v = 0;
		return v;
	};

	if (fild.attachEvent)
		fild.attachEvent("onblur", zerozero);
	else if (fild.addEventListener)
		fild.addEventListener("blur", zerozero, true);

	return fild;
}

/**
 * mask for brazilian dates (dd/mm/yyyy)
 */
function DataMask(fild) {

	// rule
	function data() {
		var v = fild.value;
		v = v.replace(/\D/g, "");
		if (v.length < 5)
			v = v.replace(/(\d{2})(\d)/, "$1/$2");
		else
			v = v.replace(/(\d{2})(\d{2})(\d)/, "$1/$2/$3");
		v = v.replace(/\/\//, "/");

		fild.value = v;
	}

	/**
	 * helper de validação de datas verificando os anos bissextos e os meses de
	 * 30 e 31 dias.
	 * 
	 * o retorno dessa função é void, pois a validação real se dá pelos throws
	 * com suas mensagens de erro.
	 */
	function validarData() {
		var v = fild.value;
		if (v.length > 0) {
			if (v.length < 10)
				throw new Error("Data inválida");

			// splittando a data
			var dma = v.match(/[0-9]+/g);
			var i;
			if (dma)
				i = dma.length;
			else {
				
				throw new Error("Data inválida");
			}

			// Verificamos se o ano informado está com 4 digitos
			if (dma[2]) {// ano foi informado
				if (dma[2].length == 2) {
					var anoCompleto = "20" + dma[2];
					if (parseInt(dma[2]) >= 50) {
						anoCompleto = "19" + dma[2];
					}
					dma[2] = anoCompleto;
					fild.value = dma[0] + "/" + dma[1] + "/" + dma[2];
				} else if (parseInt(dma[2]) < 1900 || parseInt(dma[2]) > 2100) {
					//will not work forever, ;)
					throw new Error("Ano inválido");
				}
			}

			if (dma[1] <= 0) {
				
				throw new Error("Mês inválido");
			}

			while (i--)
				// tratar o 08 e 09 no mês/ano e datas idiotas como 0666.
				dma[i] = dma[i].replace(/^0+/, "");
			if (dma[0] <= 0) {
				
				throw new Error("Dia inválido");
			}

			if (dma[1]) {// mês foi informado?
				switch (parseInt(dma[1])) {
				case 1:
				case 3:
				case 5:
				case 7:
				case 8:
				case 10:
				case 12:
					if (dma[0] > 31) {
						
						throw new Error("Dia inválido");
					}
					break;
				case 4:
				case 6:
				case 9:
				case 11:
					if (dma[0] > 30) {
						
						throw new Error("Dia inválido");
					}
					break;
				case 2:// bissexto?
					if (dma[2]) {// ano foi informado?
						// 1 - divisível por 400
						if (dma[2] % 400 == 0) {
							if (dma[0] > 29) {
								
								throw new Error("Dia inválido");
							}
							// 2 - divisível por 4 mas não por 100
						} else if (dma[2] % 4 == 0 && dma[2] % 100 != 0) {
							if (dma[0] > 29) {
								
								throw new Error("Dia inválido");
							}
							// 3 - fevereiro normal...
						} else if (dma[0] > 28) {
							
							throw new Error("Dia inválido");
						}
					} else if (dma[0] > 28) {// fallback para teste do 28
						
						throw new Error("Dia inválido");
					}
					break;
				default:
					
					throw new Error("Mês inválido");
				}
			}
		}
	}
	;

	this.validar=validarData;
	
	/**
	 * este método devolve um objeto date do javascript feito a partir dos
	 * valores que consequimos do campo. se o campo não estiver válido esse
	 * método estoura em exceção (ERROR).
	 */
	this.getData = function() {
		var d = new Date();
		var v = fild.value;
		if ("" != v.replace(" ", "")) {
			// splittando a data
			var dma = v.match(/[0-9]+/g);
			var i = dma.length;
			while (i--)
				dma[i] = parseInt(dma[i], 10);
			if (dma[0])
				d.setDate(dma[0]);
			if (dma[1])
				d.setMonth(dma[1] - 1);
			if (dma[2])
				d.setFullYear(dma[2]);
		}
		return d;
	};

	_AbstractMask.call(this, fild, data, 10);

	this.value = function() {
		return fild.value;
	};

	return fild;
}

/**
 * máscara para placas de carro (HUX-1234)
 * 
 */
function PlacaMask(fild) {

	// rule
	function placa() {
		var v = fild.value;
		v = v.replace(/-/g, "");
		var pr = v.match(/-/);// XXX revendo isso
		var v1 = v.substring(0, 3);
		var v2 = v.substring(3, 7);
		v1 = v1.replace(/\d|\W/g, "");
		v1 = v1.toUpperCase();
		v2 = v2.replace(/\D/g, "");
		v = v1;
		if (v2 != "")
			v += "-" + v2;
		fild.value = v;
	}

	_AbstractMask.call(this, fild, placa, 8);

	this.value = function() {
		return fild.value;
	}

	return fild;
}

/**
 * 
 * MASK TO WRITE LIKE THIS
 */
function CaixaAltaMask(fild) {

	// rule
	function caixa() {
		var v = fild.value;
		v = v.toUpperCase();
		fild.value = v;
	}
	_AbstractMask.call(this, fild, caixa);

	this.value = function() {
		return fild.value;
	}

	return fild;
}

/**
 * mask to allow only letters and numbers
 * 
 * @param fild
 */
function AlfaNumericoMask(fild) {
	// rule
	function alfanum() {
		var v = fild.value;
		v = v.replace(/[^\d\w]/g, "");
		fild.value = v;
	}
	_AbstractMask.call(this, fild, alfanum);

	this.value = function() {
		return fild.value;
	};

	return fild;
}

/**
 * mask to allow only letters and numbers
 * 
 * @param fild
 */
function AlfaNumericoComEspacoMask(fild) {
	// rule
	function alfanum() {
		var v = fild.value;
		v = v.replace(/[^\d\w ]/g, "");
		fild.value = v;
	}
	_AbstractMask.call(this, fild, alfanum);

	this.value = function() {
		return fild.value;
	};

	return fild;
}

/**
 * interface do plugin jQuery
 */
if (typeof jQuery != "undefined") {
	(function($) {
		$.fn.maskval = function(p) {
			var vlr;
			this.each(function(i, e) {
				if (!e.mascara)
					throw new Error("there's no installed mask");
				else {
					if (p) {
						e.value = p;
						e.mascara.executar();
					} else {
						vlr = e.mascara.value();
					}
				}
			});
			return vlr;
		};
		$.fn.mascara = function(p) {
			this.each(function(i, e) {
				switch (p) {
				case "desinstalar":
					if (this.mascara)
						this.mascara.desinstalar();
					break;
				case "executar":
					if (this.mascara)
						this.mascara.executar();
					else
						throw new Error("there's no installed mask");
					break;
				case "validar":
					if (this.mascara && this.mascara.validar)
						this.mascara.validar();
				case "cep":
					new CepMask(this);
					break;
				case "telefone":
					new TelefoneMask(this);
					break;
				case "cpf":
					new CpfMask(this);
					break;
				case "cnpj":
					new CnpjMask(this);
					break;
				case "numero":
					new NumberMask(this);
					break;
				case "leet":
					new LeetMask(this);
					break;
				case "valor":
					new ValorMask(this);
					break;
				case "data":
					new DataMask(this);
					break;
				case "placa":
					new PlacaMask(this);
					break;
				case "caixaalta":
					new CaixaAltaMask(this);
					break;
				case "alfanumerico":
					new AlfaNumericoMask(this);
					break;
				case "alfanumericocomespaco":
					new AlfaNumericoComEspacoMask(this);
					break;
				case "letras":
					new LetterMask(this);
					break;
				default:
					throw new Error("the valid masks options are: "//
							+ "'desinstalar','executar','validar','cep'," //
							+ "'telefone','cpf','cnpj','numero',"//
							+ "'leet','valor','data',"//
							+ "'placa','caixaalta'");
				}
				// console.debug(this);
			});
			return this;
		};
	})(jQuery);// pass jQuery as parameter to install the plugin
}
