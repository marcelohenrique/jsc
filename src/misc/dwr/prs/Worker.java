package misc.dwr.prs;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ResourceBundle;

import javax.naming.InitialContext;
import javax.sql.DataSource;

/*
 * small toy to ease the job of save data. Javascript is the central piece
 * here
 */
abstract class Worker {

	protected abstract void work() throws Exception;

	private final static ResourceBundle b = ResourceBundle
			.getBundle("ApplicationResources");
	protected Connection con;
	protected PreparedStatement ps;
	protected ResultSet rs;

	public Worker() throws Exception {
		try {
			con = ((DataSource) new InitialContext()//
					.lookup(b.getString("banco-jndi"))).getConnection();
			work();
		} finally {
			if (rs != null)
				rs.close();
			if (ps != null)
				ps.close();
			if (con != null)
				con.close();
		}
	}
}
