package misc.dwr.prs;

import java.util.LinkedList;
import java.util.List;
import java.util.ResourceBundle;

import misc.dwr.bean.Cidade;
import misc.dwr.bean.Contato;
import misc.dwr.bean.Country;
import misc.dwr.bean.Estado;

public enum DAO {
	INSTANCE;

	private ResourceBundle b = ResourceBundle.getBundle("misc.dwr.prs.DAO");

	public List<Contato> getContatos() throws Exception {
		final List<Contato> list = new LinkedList<Contato>();
		new Worker() {
			protected void work() throws Exception {
				ps = con.prepareStatement(b.getString("slct-contatos"));
				rs = ps.executeQuery();
				while (rs.next())
					list.add(new Contato(//
							rs.getInt(1), //
							rs.getString(2), //
							rs.getString(3), //
							rs.getString(4)));
			}
		};
		return list;
	}

	public void salvarContato(final Contato c) throws Exception {
		new Worker() {
			protected void work() throws Exception {
				boolean isup = c.getId() > 0;
				if (isup)
					ps = con.prepareStatement(b.getString("updt-contatos"));
				else
					ps = con.prepareStatement(b.getString("nsrt-contatos"));
				ps.setString(1, c.getNome());
				ps.setString(2, c.getEndereco());
				ps.setString(3, c.getTelefone());
				if (isup)
					ps.setInt(4, c.getId());
				ps.executeUpdate();
			}
		};
	}

	public void excluiContato(final Contato c) throws Exception {
		new Worker() {
			protected void work() throws Exception {
				ps = con.prepareStatement(b.getString("dele-contatos"));
				ps.setInt(1, c.getId());
				ps.executeUpdate();
			}
		};
	}

	public List<Country> getPaises() throws Exception {
		return getCountriesAutoComplete("");
	}

	public List<Country> getCountriesAutoComplete(final String name)
			throws Exception {
		final List<Country> paises = new LinkedList<Country>();
		new Worker() {
			protected void work() throws Exception {
				ps = con.prepareStatement(b.getString("slct-paises"));
				ps.setString(1, "%"+name+"%");
				rs = ps.executeQuery();
				while (rs.next())
					paises.add(new Country(rs.getInt(1), rs.getString(2)));
			}
		};
		return paises;
	}

	public List<Estado> getState(Country c) throws Exception {
		return getStateAutocomplete("", c);
	}

	public List<Estado> getStateAutocomplete(final String name, final Country c)
			throws Exception {
		final List<Estado> estados = new LinkedList<Estado>();
		new Worker() {
			protected void work() throws Exception {
				ps = con.prepareStatement(b.getString("slct-estados"));
				ps.setInt(1, c.getCode());
				ps.setString(2, "%"+name+"%");
				rs = ps.executeQuery();
				while (rs.next())
					estados.add(new Estado(//
							rs.getInt(1),//
							rs.getInt(2),//
							rs.getString(3)));
			}
		};
		return estados;
	}

	public List<Cidade> getCidades(Estado e) throws Exception {
		return getCitiesAutoComplete("", e);
	}

	public List<Cidade> getCitiesAutoComplete(final String name, final Estado e)
			throws Exception {
		final List<Cidade> cidades = new LinkedList<Cidade>();
		new Worker() {
			protected void work() throws Exception {
				ps = con.prepareStatement(b.getString("slct-cidades"));
				ps.setInt(1, e.getCode());
				ps.setString(2, "%"+name+"%");
				rs = ps.executeQuery();
				while (rs.next())
					cidades.add(new Cidade(//
							rs.getInt(1),//
							rs.getInt(2),//
							rs.getString(3)));
			}
		};
		return cidades;
	}
}
