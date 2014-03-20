package teste.jscomponents;

import java.io.IOException;
import java.io.Writer;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ResourceBundle;

import javax.annotation.Resource;
import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

/**
 * Este servlet serve apenas para injetar
 */
public class BancoLoader extends HttpServlet {
	private static final long serialVersionUID = 1440000000002L;

	@Resource(name = "jdbc/jsc-ds")
	private DataSource ds;

	/**
	 * helper pra refazer o banco
	 * 
	 * @throws Exception
	 */
	private void wipe() throws Exception {
		ResourceBundle esq = ResourceBundle
				.getBundle("teste.jscomponents.esquema_sql");
		ResourceBundle data = ResourceBundle
				.getBundle("teste.jscomponents.data_sql");
		// validar datasource e conexão
		// DataSource ds = (DataSource) new InitialContext()
		// .lookup("java:comp/env/jdbc/jsc-ds");
		Connection con = ds.getConnection();
		// verificar se o esquema existe
		try {
			PreparedStatement p = //
			con.prepareStatement("select count(id) from contatos");
			ResultSet r = p.executeQuery();
			r.next();
			r.close();
			p.close();// vamos achar que está tudo bem
		} catch (SQLException e) {
			// provavelmente não tem banco
			System.out.println("Banco sem esquema. Criando o banco");
			PreparedStatement p;
			String[] keys = new String[] { //
			"contato", "country", "state", "city", "talk", //
			};
			for(String k : keys){
				p = con.prepareStatement(esq.getString(k));
				p.executeUpdate();
				p.close();
			}
			keys = new String[]{//
					"contato", "country", "state", "city", 
			};
			System.out.println("Inserindo dados de exemplo");
			for(String k : keys){
				p = con.prepareStatement(data.getString(k));
				p.executeUpdate();
				p.close();
			}
			System.out.println("feito");
		}
		con.close();
	}

	/**
	 * @see Servlet#init(ServletConfig)
	 */
	public void init(ServletConfig config) throws ServletException {
		try {
			wipe();
		} catch (Exception e) {
			throw new ServletException(e);
		}
	}

	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		try {
			String s = req.getParameter("wipe");
			if (s != null)
				wipe();
			Writer w = resp.getWriter();
			w.write("feito");
			w.flush();
			w.close();
		} catch (Exception e) {
			throw new ServletException(e);
		}
	}
}
