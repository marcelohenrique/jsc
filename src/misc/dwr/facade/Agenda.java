package misc.dwr.facade;

import java.util.List;

import misc.dwr.bean.Contato;
import misc.dwr.prs.DAO;

/**
 * facades DWR comuns ficam em escopo de script/request e não devem ter
 * atributos de classe, pois estes se perdem.
 */
public class Agenda {

	public List<Contato> getContatos() throws Exception {
		return DAO.INSTANCE.getContatos();
	}

	public void salvarContato(Contato c) throws Exception {
		DAO.INSTANCE.salvarContato(c);
	}

	public void excluiContato(Contato c) throws Exception {
		DAO.INSTANCE.excluiContato(c);
	}
}
