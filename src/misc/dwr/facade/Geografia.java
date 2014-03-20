package misc.dwr.facade;

import java.util.List;

import misc.dwr.bean.Cidade;
import misc.dwr.bean.Country;
import misc.dwr.bean.Estado;
import misc.dwr.prs.DAO;

public class Geografia {

	public List<Country> getPaises() throws Exception {
		return DAO.INSTANCE.getPaises();
	}

	public List<Country> getCountriesAutoComplete(String name) throws Exception {
		return DAO.INSTANCE.getCountriesAutoComplete(name);
	}

	public List<Estado> getEstados(final Country c) throws Exception {
		return DAO.INSTANCE.getState(c);
	}

	public List<Estado> getProvinceAutocomplete(final String name, Country c)
			throws Exception {
		return DAO.INSTANCE.getStateAutocomplete(name, c);
	}

	public List<Cidade> getCidades(Estado e) throws Exception {
		return DAO.INSTANCE.getCidades(e);
	}

	public List<Cidade> getCitiesAutoComplete(final String name, final Estado e)
			throws Exception {
		return DAO.INSTANCE.getCitiesAutoComplete(name, e);
	}
}
